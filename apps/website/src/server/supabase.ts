import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'
import type { NextFunction, Request, Response } from 'express'

export const supabaseMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // don't run for js, css, etc
  if (req.url.startsWith('/assets') || req.url.startsWith('/@fs')) {
    return next()
  }
  const client = createServerClient(
    process.env.SUPABASE_INTERNAL_API_URL,
    process.env.PUBLIC_ENV__SUPABASE_ANON_ROLE_KEY,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(req.headers.cookie?.replaceAll('sb-localhost', 'sb-kong') || '')
          return cookies
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookie(name?.replace('sb-kong', 'sb-localhost'), value, options)
          )
        }
      }
    }
  )

  if (req.originalUrl.startsWith('/auth/callback')) {
    try {
      const searchParams = new URLSearchParams(req.url.split('?')[1])
      const code = searchParams.get('code') || ''
      const redirect = searchParams.get('next') || '/'
      if (code) {
        const { error } = await client.auth.exchangeCodeForSession(code)
        if (!error) {
          setTimeout(() => {
            res.redirect(redirect)
          }, 100)
        }
      }
    } catch (error) {
      res.redirect('/error')
    }
    return
  }

  // validate the session, remove cookies if invalid
  const session = await client.auth.getSession()
  if (session.data) {
    req.session = session.data.session
  }
  const user = await client.auth.getUser()
  if (user.data) {
    req.user = user.data.user
  }
  //@ts-ignore
  req.supabase = client
  next()
}

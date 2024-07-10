export { addAuthjsMiddleware, authConfig, authMiddleware }

import { ExpressAuth, getSession } from '@auth/express'
import Google from '@auth/express/providers/google'
import express from 'express'
import { Middleware } from 'express-zod-api'
import createHttpError from 'http-errors'
import { z } from 'zod'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db'

const authConfig = {
  trustHost: true,
  providers: [
    Google({
      checks: ['state', 'pkce'],
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope:
            'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid'
        }
      }
    })
  ],
  //@ts-ignore
  adapter: PrismaAdapter(prisma)
}

function addAuthjsMiddleware(app: express.IRouter) {
  app.use('/auth/*', ExpressAuth(authConfig))
}

const authMiddleware = new Middleware({
  input: z.object({}),
  handler: async ({ request }) => {
    const session = await getSession(request, authConfig)
    if (!session?.user?.email || !session.user.name) {
      throw createHttpError(401, 'Invalid session')
    }

    return {
      session: {
        user: {
          email: session.user.email,
          name: session.user.name,
          id: session.user.id
        },
        expires: session.expires
      }
    }
  }
})

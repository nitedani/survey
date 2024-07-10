export { usersApi, fetchApi }

import { basePath } from '#root/constants.js'
import { Configuration, ResponseError, UsersApi } from 'api-client'

const fetchApi = async (url: string, init?: RequestInit) => {
  if (import.meta.env.SSR) {
    const { getRequestContext } = await import('./cls.js')
    const { req } = getRequestContext()
    init ??= {}
    init.headers ??= {}
    const headers = new Headers(init.headers)
    const cookie = req.headers.cookie
    if (cookie) {
      headers.set('cookie', cookie)
    }
    init.headers = headers
  }
  const response = await fetch(`${basePath}${url}`, init)
  if (import.meta.env.SSR) {
    const { getRequestContext } = await import('./cls.js')
    const { res } = getRequestContext()
    if (!res.headersSent) {
      res.header('set-cookie', response.headers.getSetCookie())
    }
  }
  if (!response.ok) {
    throw new ResponseError(response.clone(), await getErrorMessage(response))
  }
  return response
}

const config = new Configuration({
  fetchApi,
  credentials: 'include',
  basePath: ''
})
const getErrorMessage = async (response: Response) => {
  try {
    const json = await response.json()
    const message = json.error.message
    if (message) {
      return String(message)
    }
  } catch (error) {}

  return 'Unknown error'
}

const usersApi = new UsersApi(config)

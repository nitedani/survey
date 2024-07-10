export { fetchApi, usersApi }

import { Configuration, ResponseError, UsersApi } from 'api-client'
const basePath = import.meta.env.SSR ? process.env.INTERNAL_API_URL! : '/api'

const fetchApi = async (url: string, init?: RequestInit) => {
  // if we are on the server
  if (import.meta.env.SSR) {
    // get the express request from async context
    const { getRequestContext } = await import('./cls.js')
    const { req } = getRequestContext()
    init ??= {}
    init.headers ??= {}
    const headers = new Headers(init.headers)
    const cookie = req.headers.cookie
    if (cookie) {
      // and forward the cookie from the browser to the backend
      headers.set('cookie', cookie)
    }
    init.headers = headers
  }

  // make the request to the backend
  const response = await fetch(`${basePath}${url}`, init)

  // if we are on the server
  if (import.meta.env.SSR) {
    // get the express response from async context
    const { getRequestContext } = await import('./cls.js')
    const { res } = getRequestContext()
    if (!res.headersSent) {
      // and forward the cookie from the backend to the browser
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

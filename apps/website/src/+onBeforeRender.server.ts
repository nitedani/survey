import { fetchApi } from '#root/server/client'
import { PageContext } from 'vike/types'

// create a new csrf token on initial page load
// pass it to the client in a cookie and in the html response
export default async function onRenderHtml(pageContext: PageContext) {
  const res = await fetchApi(`/auth/csrf`, {
    method: 'GET',
    credentials: 'include'
  })
  const json = await res.json()
  const csrfToken = json.csrfToken
  return {
    pageContext: {
      csrfToken
    }
  }
}

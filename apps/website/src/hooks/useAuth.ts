export { useAuth }

import { fetchApi, usersApi } from '#root/server/client'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { navigate } from 'vike/client/router'
import { usePageContext } from 'vike-react/usePageContext'

function useAuth() {
  const ctx = usePageContext()
  const queryClient = useQueryClient()
  const providers = useSuspenseQuery({
    queryKey: ['auth-providers'],
    queryFn: () => fetchApi('/auth/providers').then((res) => res.json())
  })

  const meQuery = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: () => usersApi.getV1UsersMe().catch(() => null)
  })

  return {
    me: meQuery.data?.data,
    providers: Object.values(providers.data) as { name: string; id: string }[],
    async handleThirdPartyCallback() {
      const params = new URLSearchParams(window.location.search)
      const joinedParams = params.toString()
      const provider = window.location.pathname.split('/')[3]
      const res = await fetchApi(`/auth/callback/${provider}?${joinedParams}`, {
        method: 'GET',
        credentials: 'include'
      })

      if (res.ok) {
        navigate('/')
        queryClient.invalidateQueries()
      }
    },
    async signOut() {
      const res = await fetchApi(`/auth/signout`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ csrfToken: ctx.csrfToken }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.ok) {
        navigate('/')
        queryClient.invalidateQueries()
      }
    },
    async signinThirdParty(provider: string) {
      const formEl = document.createElement('form')
      formEl.action = `/api/auth/signin/${provider}`
      formEl.method = 'POST'
      formEl.style.display = 'none'
      const inputEl = document.createElement('input')
      inputEl.type = 'hidden'
      inputEl.name = 'csrfToken'
      inputEl.value = ctx.csrfToken
      formEl.appendChild(inputEl)
      document.body.appendChild(formEl)
      formEl.submit()
    }
  }
}

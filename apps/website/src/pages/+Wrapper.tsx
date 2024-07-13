import { useState } from 'react'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { createBrowserClient, createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'
import { usePageContext } from 'vike-react/usePageContext'
import { SupabaseContext } from '#root/hooks/useSupabase'

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const ctx = usePageContext()
  const [supabase] = useState(() =>
    import.meta.env.SSR
      ? ctx.supabase
      : createBrowserClient(
          import.meta.env.PUBLIC_ENV__SUPABASE_API_URL,
          import.meta.env.PUBLIC_ENV__SUPABASE_ANON_ROLE_KEY
        )
  )

  return (
    <NextUIProvider>
      <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
    </NextUIProvider>
  )
}

import { useState } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { usePageContext } from 'vike-react/usePageContext'
import { SupabaseContext } from '#root/hooks/useSupabase'
import browserClient from '#root/supabase/client'
import './index.css'

export default function Wrapper({ children }) {
  const ctx = usePageContext()
  const [supabase] = useState(() => (import.meta.env.SSR ? ctx.supabase : browserClient))

  return (
    <NextUIProvider>
      <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
    </NextUIProvider>
  )
}

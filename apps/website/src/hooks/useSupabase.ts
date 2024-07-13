export { SupabaseContext, useSupabase }

import { Session, SupabaseClient, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { useEffectOnce } from './useEffectOnce'

const SupabaseContext = createContext<SupabaseClient | null>(null)

function useSupabase() {
  const supabase = useContext(SupabaseContext)
  const ctx = usePageContext()
  const [session, setSession] = useState<Session | null>(ctx.session)

  useEffectOnce(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })
  })

  return {
    session,
    supabase,
    login() {
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
    },
    logout() {
      supabase.auth.signOut()
    }
  }
}

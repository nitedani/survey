export { SupabaseContext, useSupabase }

import { createContext, useContext, useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { useEffectOnce } from './useEffectOnce'

const SupabaseContext = createContext(null)

function useSupabase() {
    const supabase = useContext(SupabaseContext)
    const ctx = usePageContext()
    const [session, setSession] = useState(ctx.session)

    useEffectOnce(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session)
        })
    })

    return {
        session,
        supabase,
        login() {
            console.log("login called");
            //TODO: oauth signing
            // supabase.auth.signInWithOAuth({
            //     provider: 'google',
            //     options: {
            //         redirectTo: `${window.location.origin}/auth/callback`
            //     }
            // })
        },
        logout() {
            supabase.auth.signOut()
        }
    }
}

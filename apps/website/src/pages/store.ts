export { useStore }

import { Session, User } from '@supabase/supabase-js'
import { create, serverOnly } from 'vike-react-zustand'

interface Store {
  SUPABASE: {
    SUPABASE_API_URL: string
    SUPABASE_ANON_ROLE_KEY: string
  }
  user?: User
  session?: Session
}

const useStore = create<Store>()((set) => ({
  ...serverOnly(() => ({
    SUPABASE: {
      SUPABASE_API_URL: process.env.SUPABASE_API_URL,
      SUPABASE_ANON_ROLE_KEY: process.env.SUPABASE_ANON_ROLE_KEY
    }
  }))
}))

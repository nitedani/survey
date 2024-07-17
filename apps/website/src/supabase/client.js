import { createBrowserClient } from '@supabase/ssr'

export default createBrowserClient(
    import.meta.env.PUBLIC_ENV__SUPABASE_API_URL,
    import.meta.env.PUBLIC_ENV__SUPABASE_ANON_ROLE_KEY
)
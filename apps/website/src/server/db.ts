export { supabaseAdminClient }

import { createClient } from '@supabase/supabase-js'
const url = process.env.SUPABASE_INTERNAL_API_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabaseAdminClient = createClient(url, supabaseKey)

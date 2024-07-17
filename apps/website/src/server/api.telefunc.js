import { supabaseAdminClient } from '../supabase/server'

export async function getUserBasic() {
    console.log("hello world");
    const { data, error } = await supabaseAdminClient.from('users_basic')
        .select('*')
    if (error) throw new Error(error.message)
    return data
}

export async function addUserBasic(data) {
    await supabaseAdminClient.from('users_basic')
        .insert(data)
}
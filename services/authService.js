import { supabase } from '../config/supabase.js'

export async function register(email, password, extraData) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (error) throw error

  const { error: profileError } = await supabase
    .from('clientes')
    .insert({
      user_id: data.user.id,
      ...extraData
    })

  if (profileError) throw profileError

  return data
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error

  return data
}

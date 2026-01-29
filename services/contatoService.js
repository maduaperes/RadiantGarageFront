import { supabase } from '../config/supabase.js'

export async function createContato(userId, data) {
  const { data: contato, error } = await supabase
    .from('contatos')
    .insert({
      user_id: userId,
      celular: data.celular,
      telefone: data.telefone,
      email: data.email
    })
    .select()
    .single()

  if (error) throw error
  return contato
}

export async function getContatos(userId) {
  const { data, error } = await supabase
    .from('contatos')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

export async function getContatoById(id, userId) {
  const { data, error } = await supabase
    .from('contatos')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateContato(id, userId, data) {
  const { data: contato, error } = await supabase
    .from('contatos')
    .update({
      celular: data.celular,
      telefone: data.telefone,
      email: data.email
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return contato
}

export async function deleteContato(id, userId) {
  const { error } = await supabase
    .from('contatos')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) throw error
  return { success: true }
}

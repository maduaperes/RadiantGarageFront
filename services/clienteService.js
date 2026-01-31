import { supabase } from '../config/supabase.js'

export async function createCliente(userId, payload) {
  const cliente = {
    ...payload,
    id_usuario: userId
  }

  const { data, error } = await supabase
    .from('cliente')
    .insert([cliente])
    .select()
    .single()

  if (error) throw error

  return data
}

export async function getClientes(userId) {
  const { data, error } = await supabase
    .from('cliente')
    .select(`
      *,
      contatos (*)
    `)
    .eq('id_usuario', userId)

  if (error) throw error

  return data
}

export async function getClienteById(id, userId) {
  const { data, error } = await supabase
    .from('cliente')
    .select(`
      *,
      contatos (*)
    `)
    .eq('id', id)
    .eq('id_usuario', userId)
    .single()

  if (error || !data) throw new Error('Cliente não encontrado')

  return data
}

export async function updateCliente(id, userId, payload) {
  const { data, error } = await supabase
    .from('cliente')
    .update(payload)
    .eq('id', id)
    .eq('id_usuario', userId)
    .select()
    .single()

  if (error || !data) throw new Error('Erro ao atualizar cliente')

  return data
}

export async function deleteCliente(id, userId) {
  const { error } = await supabase
    .from('cliente')
    .delete()
    .eq('id', id)
    .eq('id_usuario', userId)

  if (error) throw error

  return { success: true }
}

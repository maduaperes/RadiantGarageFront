import { supabase } from '../config/supabase.js'

export async function createCliente(userId, data) {
  const { data: cliente, error } = await supabase
    .from('clientes')
    .insert({
      user_id: userId,
      nome_cliente: data.nome_cliente,
      id_contato: data.id_contato,
      tema: data.tema
    })
    .select()
    .single()

  if (error) throw error
  return cliente
}

export async function getClientes(userId) {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

export async function getClienteById(id, userId) {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateCliente(id, userId, data) {
  const { data: cliente, error } = await supabase
    .from('clientes')
    .update({
      nome_cliente: data.nome_cliente,
      id_contato: data.id_contato,
      tema: data.tema
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return cliente
}

export async function deleteCliente(id, userId) {
  const { error } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) throw error
  return { success: true }
}

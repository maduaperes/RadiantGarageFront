import { supabase } from '../config/supabase.js'

export async function createCliente(userId, data) {
  const { data: cliente, error } = await supabase
    .from('cliente')
    .insert({
      id_usuario: userId,
      nome_cliente: data.nome_cliente,
      cpf: data.cpf,
      id_contato: data.id_contato ?? null
    })
    .select()
    .single()

  if (error) throw error

  return cliente
}

export async function getClientes(userId) {
  const { data, error } = await supabase
    .from('cliente')
    .select(`
      *,
      contato (*)
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
      contato (*)
    `)
    .eq('id', id)
    .eq('id_usuario', userId)
    .single()

  if (error || !data) throw new Error('Cliente não encontrado')

  return data
}

export async function updateCliente(id, userId, data) {
  const { data: cliente, error } = await supabase
    .from('cliente')
    .update({
      nome_cliente: data.nome_cliente,
      cpf: data.cpf,
      id_contato: data.id_contato
    })
    .eq('id', id)
    .eq('id_usuario', userId)
    .select()
    .single()

  if (error) throw error

  return cliente
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

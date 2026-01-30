import { supabase } from '../config/supabase.js'

export async function createContato(data) {
  const { data: contato, error } = await supabase
    .from('contato')
    .insert({
      celular: data.celular,
      telefone: data.telefone,
      email: data.email
    })
    .select()
    .single()

  if (error) throw error
  return contato
}

export async function getContatos() {
  const { data, error } = await supabase
    .from('contato')
    .select('*')
    .order('id_contato', { ascending: true })

  if (error) throw error
  return data
}

export async function getContatoById(id) {
  const { data, error } = await supabase
    .from('contato')
    .select('*')
    .eq('id_contato', id)
    .single()

  if (error) throw error
  return data
}

export async function updateContato(id, data) {
  const { data: contato, error } = await supabase
    .from('contato')
    .update({
      celular: data.celular,
      telefone: data.telefone,
      email: data.email
    })
    .eq('id_contato', id)
    .select()
    .single()

  if (error) throw error
  return contato
}

export async function deleteContato(id) {
  const { error } = await supabase
    .from('contato')
    .delete()
    .eq('id_contato', id)

  if (error) throw error
  return { success: true }
}

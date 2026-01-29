import { supabase } from '../config/supabase.js'

export async function createEstabelecimento(userId, data) {
  const { data: estabelecimento, error } = await supabase
    .from('estabelecimentos')
    .insert({
      user_id: userId,
      cnpj: data.cnpj,
      nome_estabelecimento: data.nome_estabelecimento,
      descricao: data.descricao,
      id_contato: data.id_contato
    })
    .select()
    .single()

  if (error) throw error
  return estabelecimento
}

export async function getEstabelecimentos(userId) {
  const { data, error } = await supabase
    .from('estabelecimentos')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

export async function getEstabelecimentoById(id, userId) {
  const { data, error } = await supabase
    .from('estabelecimentos')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateEstabelecimento(id, userId, data) {
  const { data: estabelecimento, error } = await supabase
    .from('estabelecimentos')
    .update({
      cnpj: data.cnpj,
      nome_estabelecimento: data.nome_estabelecimento,
      descricao: data.descricao,
      id_contato: data.id_contato
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return estabelecimento
}

export async function deleteEstabelecimento(id, userId) {
  const { error } = await supabase
    .from('estabelecimentos')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) throw error
  return { success: true }
}

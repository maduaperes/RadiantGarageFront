import { supabase } from '../config/supabase.js'

async function getEstabelecimentoDoUsuario(userId) {
  const { data } = await supabase
    .from('estabelecimento')
    .select('id')
    .eq('id_usuario', userId)
    .single()

  return data?.id || null
}


export async function createEndereco(userId, payload) {
  const estabelecimentoId = await getEstabelecimentoDoUsuario(userId)

  const { data, error } = await supabase
    .from('endereco')
    .insert({
      rua: payload.rua,
      cidade: payload.cidade,
      estado: payload.estado,
      numero: payload.numero,
      cep: payload.cep,
      estabelecimento_id: estabelecimentoId
    })
    .select()
    .single()

  if (error) throw error

  return data
}

export async function getEnderecos(userId) {
  const estabelecimentoId = await getEstabelecimentoDoUsuario(userId)

  if (!estabelecimentoId) return []

  const { data, error } = await supabase
    .from('endereco')
    .select('*')
    .eq('estabelecimento_id', estabelecimentoId)

  if (error) throw error

  return data
}


export async function getEnderecoById(id, userId) {
  const estabelecimentoId = await getEstabelecimentoDoUsuario(userId)

  const { data, error } = await supabase
    .from('endereco')
    .select('*')
    .eq('id', id)
    .eq('estabelecimento_id', estabelecimentoId)
    .single()

  if (error || !data) {
    throw new Error('Endereço não encontrado')
  }

  return data
}

export async function updateEndereco(id, userId, payload) {
  const estabelecimentoId = await getEstabelecimentoDoUsuario(userId)

  const { data, error } = await supabase
    .from('endereco')
    .update({
      rua: payload.rua,
      cidade: payload.cidade,
      estado: payload.estado,
      numero: payload.numero,
      cep: payload.cep
    })
    .eq('id', id)
    .eq('estabelecimento_id', estabelecimentoId)
    .select()
    .single()

  if (error) throw error

  return data
}

export async function deleteEndereco(id, userId) {
  const estabelecimentoId = await getEstabelecimentoDoUsuario(userId)

  const { error } = await supabase
    .from('endereco')
    .delete()
    .eq('id', id)
    .eq('estabelecimento_id', estabelecimentoId)

  if (error) throw error

  return { success: true }
}

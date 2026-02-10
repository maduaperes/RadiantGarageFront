import { supabase } from '../config/supabase.js'

export async function createEstabelecimento(userId, payload) {
  const estabelecimento = {
    ...payload,
    id_usuario: userId
  }

  const { data, error } = await supabase
    .from('estabelecimento')
    .insert([estabelecimento])
    .select()
    .single()

  if (error) throw error

  return data
}

export async function getEstabelecimentos(userId) {
  const { data, error } = await supabase
    .from('estabelecimento')
    .select(`
      *,
      contatos (*)
    `)
    .eq('id_usuario', userId)

  if (error) throw error

  return data
}

export async function getByUserId(userId) {
  const { data, error } = await supabase
    .from("estabelecimento")
    .select("*") // ✅ AQUI
    .eq("id_usuario", userId)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Erro ao buscar estabelecimento");
  }

  return data;
}

export async function getEnderecoByEstabelecimentoId(estabelecimentoId) {
  const { data, error } = await supabase
    .from("endereco")
    .select("*")
    .eq("estabelecimento_id", estabelecimentoId)
    .maybeSingle(); // retorna null se não tiver

  if (error) throw error;

  return data;
}

export async function getContatoByUserId(userId) {
  const { data, error } = await supabase
    .from("contato")
    .select("*")
    .eq("id_usuario", userId)
    .maybeSingle()

  if (error) {
    console.error(error)
    return null
  }

  return data
}



export async function getEstabelecimentoById(id, userId) {
  const { data, error } = await supabase
    .from('estabelecimento')
    .select(`
      *,
      contatos (*)
    `)
    .eq('id', id)
    .eq('id_usuario', userId)
    .single()

  if (error || !data) throw new Error('Estabelecimento não encontrado')

  return data
}

export async function updateEstabelecimento(id, userId, payload) {
  const { data, error } = await supabase
    .from('estabelecimento')
    .update(payload)
    .eq('id', id)
    .eq('id_usuario', userId)
    .select()
    .single()

  if (error || !data) throw new Error('Erro ao atualizar estabelecimento')

  return data
}

export async function deleteEstabelecimento(id, userId) {
  const { error } = await supabase
    .from('estabelecimento')
    .delete()
    .eq('id', id)
    .eq('id_usuario', userId)

  if (error) throw error

  return { success: true }
}

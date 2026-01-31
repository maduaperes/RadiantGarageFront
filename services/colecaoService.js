import { supabase } from '../config/supabase.js'

export async function criarColecao(data) {
  const { data: colecao, error } = await supabase
    .from('colecao')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return colecao
}

export async function listarColecoes() {
  const { data, error } = await supabase
    .from('colecao')
    .select(`
      id,
      imagem:imagem_id ( id, patch ),
      estabelecimento:estabelecimento_id ( id )
    `)
    .order('id', { ascending: false })

  if (error) throw error
  return data
}

export async function listarPorEstabelecimento(estabelecimento_id) {
  const { data, error } = await supabase
    .from('colecao')
    .select(`
      id,
      imagem:imagem_id ( id, patch )
    `)
    .eq('estabelecimento_id', estabelecimento_id)

  if (error) throw error
  return data
}

export async function buscarPorId(id) {
  const { data, error } = await supabase
    .from('colecao')
    .select(`
      id,
      imagem:imagem_id ( id, patch ),
      estabelecimento:estabelecimento_id ( id )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function deletarColecao(id) {
  const { error } = await supabase
    .from('colecao')
    .delete()
    .eq('id', id)

  if (error) throw error
}

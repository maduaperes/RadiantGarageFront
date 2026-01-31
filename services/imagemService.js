import { supabase } from '../config/supabase.js'

export async function criarImagem(data) {
  const { data: imagem, error } = await supabase
    .from('imagem')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return imagem
}

export async function listarImagens() {
  const { data, error } = await supabase
    .from('imagem')
    .select('*')
    .order('id', { ascending: false })

  if (error) throw error
  return data
}

export async function buscarImagemPorId(id) {
  const { data, error } = await supabase
    .from('imagem')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function atualizarImagem(id, data) {
  const { data: imagem, error } = await supabase
    .from('imagem')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return imagem
}

export async function deletarImagem(id) {
  const { error } = await supabase
    .from('imagem')
    .delete()
    .eq('id', id)

  if (error) throw error
}

import { supabase } from '../config/supabase.js'

export async function listarCategorias() {
  return await supabase
    .from('categoria')
    .select('*')
    .order('nome')
}

export async function criarCategoria(dados) {
  return await supabase
    .from('categoria')
    .insert(dados)
    .select()
}

export async function atualizarCategoria(id, dados) {
  return await supabase
    .from('categoria')
    .update(dados)
    .eq('id', id)
}

export async function deletarCategoria(id) {
  return await supabase
    .from('categoria')
    .delete()
    .eq('id', id)
}

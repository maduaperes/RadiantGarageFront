import { supabase } from '../config/supabase.js'

export async function listarCategorias() {
  return await supabase
    .from('categorias')
    .select('*')
    .order('nome')
}

export async function criarCategoria(dados) {
  return await supabase
    .from('categorias')
    .insert(dados)
    .select()
}

export async function atualizarCategoria(id, dados) {
  return await supabase
    .from('categorias')
    .update(dados)
    .eq('id', id)
}

export async function deletarCategoria(id) {
  return await supabase
    .from('categorias')
    .delete()
    .eq('id', id)
}

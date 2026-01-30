import { supabase } from '../config/supabase.js'

export async function listarServicos() {
  const { data, error } = await supabase
    .from('servico')
    .select('*')

  if (error) throw error
  return data
}

export async function cadastrarServico(servico) {
  const { data, error } = await supabase
    .from('servico')
    .insert([servico])
    .select()

  if (error) throw error
  return data[0]
}

export async function atualizarServico(id, servico) {
  const { data, error } = await supabase
    .from('servico')
    .update(servico)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export async function deletarServico(id) {
  const { error } = await supabase
    .from('servico')
    .delete()
    .eq('id', id)

  if (error) throw error
  return { success: true }
}

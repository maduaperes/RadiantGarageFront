import { supabase } from '../config/supabase.js'

export async function listarAgendamentos() {
  return await supabase
    .from('agendamento')
    .select(`
      *,
      clientes ( nome ),
      servicos ( nome_servico, custo_servico )
    `)
    .order('data_hora')
}

export async function criarAgendamento(dados) {
  return await supabase
    .from('agendamento')
    .insert(dados)
    .select()
}

export async function atualizarAgendamento(id, dados) {
  return await supabase
    .from('agendamento')
    .update(dados)
    .eq('id', id)
}

export async function deletarAgendamento(id) {
  return await supabase
    .from('agendamento')
    .delete()
    .eq('id', id)
}

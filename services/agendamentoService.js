import { supabase } from '../config/supabase.js'

export async function createAgendamento(userId, data) {
  // Pega o cliente logado pelo userId
  const { data: cliente, error: clienteError } = await supabase
    .from('cliente')
    .select('id')
    .eq('id_usuario', userId)
    .single();

  if (clienteError || !cliente) {
    throw new Error('Cliente não identificado');
  }

  const { data: agendamento, error } = await supabase
    .from('agendamento')
    .insert({
      data_hora: data.data_hora,
      id_cliente: cliente.id,   // pega o cliente logado
      id_servico_fk: data.id_servico_fk,
      pagamento: data.pagamento ?? 'dinheiro',
      observacao: data.observacao ?? null
    })
    .select()
    .single();

  if (error) throw error;

  return agendamento;
}

export async function getAgendamentos(userId) {
  const { data, error } = await supabase
    .from('agendamento')
    .select(`
      *,
      cliente (
        id,
        nome_cliente
      )
    `)
    .eq('cliente.id_usuario', userId)

  if (error) throw error

  return data
}

export async function getAgendamentoById(id, userId) {
  const { data, error } = await supabase
    .from('agendamento')
    .select(`
      *,
      cliente (
        id,
        nome_cliente
      )
    `)
    .eq('id', id)
    .eq('cliente.id_usuario', userId)
    .single()

  if (error || !data) throw new Error('Agendamento não encontrado')

  return data
}

export async function updateAgendamento(id, userId, data) {
  const { data: agendamento, error } = await supabase
    .from('agendamento')
    .update({
      data_hora: data.data_hora,
      pagamento: data.pagamento,
      observacao: data.observacao
    })
    .eq('id', id)
    .eq('cliente.id_usuario', userId)
    .select()
    .single()

  if (error) throw error

  return agendamento
}

export async function deleteAgendamento(id, userId) {
  const { error } = await supabase
    .from('agendamento')
    .delete()
    .eq('id', id)
    .eq('cliente.id_usuario', userId)

  if (error) throw error

  return { success: true }
}

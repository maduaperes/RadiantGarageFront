import { supabase } from '../config/supabase.js'

export async function createAgendamento(userId, data) {
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
      cliente:cliente!agendamento_id_cliente_fkey!inner (
        id,
        nome_cliente,
        id_usuario
      )
    `)
    .eq('cliente.id_usuario', userId);

  if (error) throw error;

  return data;
}


async function getEstabelecimentoDoUsuario(userId) {
  const { data, error } = await supabase
    .from('estabelecimento')
    .select('id')
    .eq('id_usuario', userId)
    .single();

  if (error || !data) {
    throw new Error('Estabelecimento não encontrado para este usuário');
  }

  return data.id;
}
  

export async function getAgendamentosByEstabelecimento(userId) {
  const estabelecimentoId = await getEstabelecimentoDoUsuario(userId);

  const { data, error } = await supabase
    .from("agendamento")
    .select(`
      id,
      data_hora,
      observacao,
      pagamento,
      cliente:cliente (
        nome_cliente
      ),
      servico:servico!inner (
        nome_servico,
        estabelecimento
      )
    `)
    .eq("servico.estabelecimento", estabelecimentoId)
    .order("data_hora", { ascending: false });

  if (error) throw error;

  return data ?? [];
}




export async function getAgendamentosByUser(userId) {

  const { data, error } = await supabase
    .from('agendamento')
    .select(`
      *,
      cliente!inner (
        id,
        nome_cliente,
        id_usuario
      ),
      servico (
        id,
        nome_servico,
        estabelecimento (
          id,
          nome_estabelecimento
        )
      )
    `)
    .eq('cliente.id_usuario', userId)
    .order('data_hora', { ascending: false });

  if (error) throw error;

  return data || [];
}

export async function getAgendamentoById(id) {
  const { data, error } = await supabase
    .from('agendamento')
    .select(`
      id,
      data_hora,
      pagamento,
      observacao,
      cliente:cliente!agendamento_id_cliente_fkey (
        id,
        nome_cliente,
        id_usuario
      ),
      servico:servico!agendamento_id_servico_fk_fkey (
        id,
        nome_servico
      )
    `)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('Agendamento não encontrado');

  return data;
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

import { supabase } from '../config/supabase.js'

// Pega o estabelecimento do usuário (somente para serviços privados)
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

// Criar serviço (usuário logado)
export async function createServico(userId, data) {
  const estabelecimentoId = await getEstabelecimentoDoUsuario(userId);

  const { data: servico, error } = await supabase
    .from('servico')
    .insert({
      nome_servico: data.nome_servico,
      custo_servico: data.custo_servico,
      descricao: data.descricao ?? null,
      id_categoria_fk: data.id_categoria_fk ?? null,
      tempo_estipulado: data.tempo_estipulado,
      estabelecimento: estabelecimentoId
    })
    .select()
    .single();

  if (error) throw error;
  return servico;
}

// Listar todos os serviços (público)
export async function getTodosServicos() {
  const { data, error } = await supabase
    .from('servico')
    .select('*');

  if (error) throw error;
  return data;
}

// Listar serviços do usuário logado
export async function getServicos(userId) {
  const estabelecimentoId = await getEstabelecimentoDoUsuario(userId);

  const { data, error } = await supabase
    .from('servico')
    .select('*')
    .eq('estabelecimento', estabelecimentoId);

  if (error) throw error;
  return data;
}

// Pegar serviço pelo ID do usuário logado
export async function getServicoById(id, userId) {
  const estabelecimentoId = await getEstabelecimentoDoUsuario(userId);

  const { data, error } = await supabase
    .from('servico')
    .select('*')
    .eq('id', id)
    .eq('estabelecimento', estabelecimentoId)
    .single();

  if (error || !data) throw new Error('Serviço não encontrado');
  return data;
}

// Atualizar serviço do usuário logado
export async function updateServico(id, userId, data) {
  const estabelecimentoId = await getEstabelecimentoDoUsuario(userId);

  const { data: servico, error } = await supabase
    .from('servico')
    .update({
      nome_servico: data.nome_servico,
      custo_servico: data.custo_servico,
      descricao: data.descricao,
      id_categoria_fk: data.id_categoria_fk,
      tempo_estipulado: data.tempo_estipulado
    })
    .eq('id', id)
    .eq('estabelecimento', estabelecimentoId)
    .select()
    .single();

  if (error) throw error;
  return servico;
}

// Deletar serviço do usuário logado
export async function deleteServico(id, userId) {
  const estabelecimentoId = await getEstabelecimentoDoUsuario(userId);

  const { error } = await supabase
    .from('servico')
    .delete()
    .eq('id', id)
    .eq('estabelecimento', estabelecimentoId);

  if (error) throw error;
  return { success: true };
}

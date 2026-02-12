import * as servicoService from '../services/servicoService.js'
import { supabase } from '../config/supabase.js';


export async function criarServico(req, res) {
  try {
    const servico = await servicoService.createServico(
      req.user.id,
      req.body
    );

    res.status(201).json(servico);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function listarTodosServicos(req, res) {
  try {
    const servicos = await servicoService.getTodosServicos();
    return res.json(servicos);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


export async function listarServicos(req, res) {
  try {
    const servicos = await servicoService.getServicos(req.user.id)
    return res.json(servicos)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function buscarServicoPublicoContato(req, res) {
  try {
    const { id } = req.params;

    const { data: servico, error: servicoError } = await supabase
      .from('servico')
      .select('*')
      .eq('id', id)
      .single();

    if (servicoError || !servico) throw new Error('Serviço não encontrado');

    const { data: estabelecimento, error: estError } = await supabase
      .from('estabelecimento')
      .select('id, id_contato')
      .eq('id', servico.estabelecimento)
      .single();

    if (estError || !estabelecimento) throw new Error('Estabelecimento não encontrado');

    const { data: contato, error: contatoError } = await supabase
      .from('contato')
      .select('telefone, email')
      .eq('id', estabelecimento.id_contato)
      .single();

    if (contatoError || !contato) throw new Error('Contato do estabelecimento não encontrado');

    return res.json({
      ...servico,
      estabelecimento: {
        id: estabelecimento.id,
        contato
      }
    });

  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}


export async function buscarServico(req, res) {
  try {
    const servico = await servicoService.getServicoById(
      req.params.id,
      req.user.id
    )
    return res.json(servico)
  } catch (err) {
    return res.status(404).json({ error: err.message })
  }
}


export async function buscarServicoPublico(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('servico')
      .select(`
        *,
        estabelecimento (
          id,
          nome_estabelecimento
        )
      `)
      .eq('id', id)
      .single();

    if (error || !data) throw new Error('Serviço não encontrado');

    return res.json(data);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}


export async function atualizarServico(req, res) {
  try {
    const servico = await servicoService.updateServico(
      req.params.id,
      req.user.id,
      req.body
    )
    return res.json(servico)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function deletarServico(req, res) {
  try {
    const result = await servicoService.deleteServico(
      req.params.id,
      req.user.id
    )
    return res.json(result)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }

}

export async function listarMeusServicos(req, res) {
  try {
    const userId = req.user.id;

    const servicos = await servicoService.getServicosByUser(userId);

    return res.json(servicos);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

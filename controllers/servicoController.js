import * as servicoService from '../services/servicoService.js'

export async function cadastrarServico(req, res) {
  const {
    nome_servico,
    custo_servico,
    descricao,
    id_categoria_fk,
    tempo_estipulado
  } = req.body

  if (!nome_servico || !custo_servico || !tempo_estipulado) {
    return res.status(400).json({
      error: 'Campos obrigatórios ausentes'
    })
  }

  try {
    const servico = await servicoService.createServico(
      req.user.id,
      req.body
    )
    return res.status(201).json(servico)
  } catch (err) {
    return res.status(400).json({ error: err.message })
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

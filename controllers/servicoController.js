import * as servicoService from '../services/servicoService.js'

export async function listarServicos(req, res) {
  try {
    const data = await servicoService.listarServicos()
    return res.json(data)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function cadastrarServico(req, res) {
  try {
    const data = await servicoService.cadastrarServico(req.body)
    return res.status(201).json(data)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function atualizarServico(req, res) {
  try {
    const { id } = req.params
    const data = await servicoService.atualizarServico(id, req.body)
    return res.json(data)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function deletarServico(req, res) {
  try {
    const { id } = req.params
    const data = await servicoService.deletarServico(id)
    return res.json(data)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

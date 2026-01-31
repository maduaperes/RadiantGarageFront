import * as estabelecimentoService from '../services/estabelecimentoService.js'

export async function cadastrarEstabelecimento(req, res) {
  try {
    const estabelecimento = await estabelecimentoService.createEstabelecimento(
      req.user.id,
      req.body
    )
    return res.status(201).json(estabelecimento)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function listarEstabelecimentos(req, res) {
  try {
    const estabelecimentos = await estabelecimentoService.getEstabelecimentos(
      req.user.id
    )
    return res.json(estabelecimentos)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function listarEstabelecimentoId(req, res) {
  try {
    const estabelecimento =
      await estabelecimentoService.getEstabelecimentoById(
        req.params.id,
        req.user.id
      )
    return res.json(estabelecimento)
  } catch (err) {
    return res.status(404).json({ error: err.message })
  }
}

export async function atualizarEstabelecimento(req, res) {
  try {
    const estabelecimento =
      await estabelecimentoService.updateEstabelecimento(
        req.params.id,
        req.user.id,
        req.body
      )
    return res.json(estabelecimento)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function deletarEstabelecimento(req, res) {
  try {
    const result = await estabelecimentoService.deleteEstabelecimento(
      req.params.id,
      req.user.id
    )
    return res.json(result)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

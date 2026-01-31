import * as enderecoService from '../services/enderecoService.js'

export async function cadastrarEndereco(req, res) {
  const { rua, cidade, estado, numero, cep } = req.body

  if (!rua || !cidade || !estado || !numero || !cep) {
    return res.status(400).json({
      error: 'Campos obrigatórios ausentes'
    })
  }

  try {
    const endereco = await enderecoService.createEndereco(
      req.user.id,
      req.body
    )
    return res.status(201).json(endereco)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function listarEnderecos(req, res) {
  try {
    const enderecos = await enderecoService.getEnderecos(req.user.id)
    return res.json(enderecos)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function buscarEndereco(req, res) {
  try {
    const endereco = await enderecoService.getEnderecoById(
      req.params.id,
      req.user.id
    )
    return res.json(endereco)
  } catch (err) {
    return res.status(404).json({ error: err.message })
  }
}

export async function atualizarEndereco(req, res) {
  try {
    const endereco = await enderecoService.updateEndereco(
      req.params.id,
      req.user.id,
      req.body
    )
    return res.json(endereco)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function deletarEndereco(req, res) {
  try {
    const result = await enderecoService.deleteEndereco(
      req.params.id,
      req.user.id
    )
    return res.json(result)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

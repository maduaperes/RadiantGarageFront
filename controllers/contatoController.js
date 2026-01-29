import * as contatoService from '../services/contatoService.js'

export async function cadastrarContato(req, res) {
  try {
    const contato = await contatoService.createContato(
      req.user.id,
      req.body
    )
    res.status(201).json(contato)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function listarContato(req, res) {
  try {
    const contatos = await contatoService.getContatos(req.user.id)
    res.json(contatos)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function listarContatoId(req, res) {
  try {
    const contato = await contatoService.getContatoById(
      req.params.id,
      req.user.id
    )
    res.json(contato)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

export async function atualizarContato(req, res) {
  try {
    const contato = await contatoService.updateContato(
      req.params.id,
      req.user.id,
      req.body
    )
    res.json(contato)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function removerContato(req, res) {
  try {
    const result = await contatoService.deleteContato(
      req.params.id,
      req.user.id
    )
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

import * as contatoService from '../services/contatoService.js'

export async function create(req, res) {
  try {
    const contato = await contatoService.createContato(req.body)
    return res.status(201).json(contato)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function getAll(req, res) {
  try {
    const contatos = await contatoService.getContatos()
    return res.json(contatos)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function getById(req, res) {
  try {
    const contato = await contatoService.getContatoById(req.params.id)
    return res.json(contato)
  } catch (err) {
    return res.status(404).json({ error: err.message })
  }
}

export async function update(req, res) {
  try {
    const contato = await contatoService.updateContato(
      req.params.id,
      req.body
    )
    return res.json(contato)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function remove(req, res) {
  try {
    await contatoService.deleteContato(req.params.id)
    return res.json({ success: true })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

import * as clienteService from '../services/clienteService.js'

export async function cadastrarCliente(req, res) {
  try {
    const cliente = await clienteService.createCliente(
      req.user.id,
      req.body
    )
    return res.status(201).json(cliente)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function listarClientes(req, res) {
  try {
    const clientes = await clienteService.getClientes(req.user.id)
    return res.json(clientes)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function listarClienteId(req, res) {
  try {
    const cliente = await clienteService.getClienteById(
      req.params.id,
      req.user.id
    )
    return res.json(cliente)
  } catch (err) {
    return res.status(404).json({ error: err.message })
  }
}

export async function atualizarCliente(req, res) {
  try {
    const cliente = await clienteService.updateCliente(
      req.params.id,
      req.user.id,
      req.body
    )
    return res.json(cliente)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function deletarCliente(req, res) {
  try {
    const result = await clienteService.deleteCliente(
      req.params.id,
      req.user.id
    )
    return res.json(result)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

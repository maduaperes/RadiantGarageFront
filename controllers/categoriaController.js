import * as categoriaService from '../services/categoriaService.js'

export async function listarCategorias(req, res) {
  const { data, error } = await categoriaService.listarCategorias()

  if (error) return res.status(500).json({ error: error.message })

  return res.json(data)
}

export async function cadastrarCategoria(req, res) {
  const { nome } = req.body

  if (!nome) {
    return res.status(400).json({ error: 'Nome é obrigatório' })
  }

  const { data, error } = await categoriaService.criarCategoria({ nome })

  if (error) return res.status(500).json({ error: error.message })

  return res.status(201).json(data[0])
}

export async function atualizarCategoria(req, res) {
  const { id } = req.params

  const { error } = await categoriaService.atualizarCategoria(id, req.body)

  if (error) return res.status(500).json({ error: error.message })

  return res.json({ message: 'Categoria atualizada com sucesso' })
}

export async function deletarCategoria(req, res) {
  const { id } = req.params

  const { error } = await categoriaService.deletarCategoria(id)

  if (error) return res.status(500).json({ error: error.message })

  return res.json({ message: 'Categoria removida com sucesso' })
}

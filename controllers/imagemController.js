import * as ImagemService from '../services/imagemService.js'

export async function criar(req, res) {
  try {
    const imagem = await ImagemService.criarImagem(req.body)
    return res.status(201).json(imagem)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function listar(req, res) {
  try {
    const imagens = await ImagemService.listarImagens()
    return res.json(imagens)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function buscar(req, res) {
  try {
    const imagem = await ImagemService.buscarImagemPorId(req.params.id)
    return res.json(imagem)
  } catch {
    return res.status(404).json({ error: 'Imagem não encontrada' })
  }
}

export async function atualizar(req, res) {
  try {
    const imagem = await ImagemService.atualizarImagem(
      req.params.id,
      req.body
    )
    return res.json(imagem)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function deletar(req, res) {
  try {
    await ImagemService.deletarImagem(req.params.id)
    return res.status(204).send()
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

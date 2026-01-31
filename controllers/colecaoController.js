import * as ColecaoService from '../services/colecaoService.js'

export async function criar(req, res) {
  try {
    const colecao = await ColecaoService.criarColecao(req.body)
    return res.status(201).json(colecao)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function listar(req, res) {
  try {
    const colecoes = await ColecaoService.listarColecoes()
    return res.json(colecoes)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function listarPorEstabelecimento(req, res) {
  try {
    const { estabelecimento_id } = req.params
    const colecoes = await ColecaoService.listarPorEstabelecimento(
      estabelecimento_id
    )
    return res.json(colecoes)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function buscar(req, res) {
  try {
    const colecao = await ColecaoService.buscarPorId(req.params.id)
    return res.json(colecao)
  } catch {
    return res.status(404).json({ error: 'Coleção não encontrada' })
  }
}

export async function deletar(req, res) {
  try {
    await ColecaoService.deletarColecao(req.params.id)
    return res.status(204).send()
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

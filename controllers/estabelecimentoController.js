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

export async function getMyEstabelecimento(req, res) {
  try {
    const estabelecimento = await estabelecimentoService.getByUserId(req.user.id);

    if (!estabelecimento) {
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    }

    // 🔥 RETORNA O OBJETO COMPLETO
    return res.json(estabelecimento);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

export async function getMeuEndereco(req, res) {
  try {
    // primeiro pega o estabelecimento do usuário
    const estabelecimento = await estabelecimentoService.getByUserId(req.user.id);

    if (!estabelecimento) {
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    }

    // agora busca o endereço
    const endereco = await estabelecimentoService.getEnderecoByEstabelecimentoId(
      estabelecimento.id
    );

    return res.json(endereco); // pode ser null
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function getMeuContato(req, res) {
  try {
    const contato =
      await estabelecimentoService.getContatoByUserId(req.user.id)

    return res.json(contato || null)

  } catch (err) {
    console.error(err)
    return res.json(null)
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

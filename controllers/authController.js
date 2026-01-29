import * as authService from '../services/authService.js'

export async function register(req, res) {
  const { email, password, nome, telefone } = req.body

  if (!email || !password || !nome) {
    return res.status(400).json({ error: 'Dados obrigatórios faltando' })
  }

  try {
    const data = await authService.register(email, password, {
      nome,
      telefone
    })

    return res.status(201).json(data)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha obrigatórios' })
  }

  try {
    const data = await authService.login(email, password)
    return res.json(data)
  } catch (err) {
    return res.status(401).json({ error: err.message })
  }
}

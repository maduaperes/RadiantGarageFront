import * as authService from '../services/authService.js'

export async function register(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha obrigatórios' })
  }

  try {
    const data = await authService.register(email, password)
    return res.status(201).json(data)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function login(req, res) {
  try {
    const data = await authService.login(req.body.email, req.body.password)
    return res.json(data)
  } catch (err) {
    console.log("SUPABASE ERROR:", err) 
    return res.status(401).json({ error: err.message })
  }
}


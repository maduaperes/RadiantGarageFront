import { supabase } from '../config/supabase.js'

export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'Token não informado' })
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error) {
    return res.status(401).json({ error: 'Token inválido' })
  }

  req.user = data.user
  next()
}

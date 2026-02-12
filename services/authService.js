import { supabase } from '../config/supabase.js'

export async function register(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) throw error

  return data
}

export async function verificarStatusCadastro(userId) {

  // 🔹 contato
  const { data: contato } = await supabase
    .from('contato')
    .select('id_contato')
    .eq('id_usuario', userId)
    .maybeSingle()

  // 🔹 cliente
  const { data: cliente } = await supabase
    .from('cliente')
    .select('id')
    .eq('id_usuario', userId)
    .maybeSingle()

  // 🔹 estabelecimento
  const { data: estabelecimento } = await supabase
    .from('estabelecimento')
    .select('id')
    .eq('id_usuario', userId)
    .maybeSingle()


  const temContato = !!contato
  const temCliente = !!cliente
  const temEstabelecimento = !!estabelecimento


  if (!temContato) {
    return { finalizado: false, motivo: "SEM_CONTATO" }
  }

  if (!temCliente && !temEstabelecimento) {
    return { finalizado: false, motivo: "SEM_TIPO" }
  }

  return {
    finalizado: true,
    tipo: temCliente ? "cliente" : "estabelecimento"
  }
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  console.log("ERROR:", error) 

  if (error) throw error
  return data
}

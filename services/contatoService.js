import { supabase } from '../config/supabase.js'

export async function createContato({ email, telefone, celular, userId }) {

  const { data, error } = await supabase
    .from('contato')
    .insert({
      email,
      telefone,
      celular,
      id_usuario: userId
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}


export async function getContatos() {
  const { data, error } = await supabase
    .from('contato')
    .select('*')
    .order('id_contato', { ascending: true })

  if (error) throw error
  return data
}

export async function getContatoById(id) {
  const { data, error } = await supabase
    .from('contato')
    .select('*')
    .eq('id_contato', id)
    .single()

  if (error) throw error
  return data
}

export async function updateContato(id, data) {
  const { data: contato, error } = await supabase
    .from('contato')
    .update({
      celular: data.celular,
      telefone: data.telefone,
      email: data.email
    })
    .eq('id_contato', id)
    .select()
    .single()

  if (error) throw error
  return contato
}

export async function deleteContato(id) {
  const { error } = await supabase
    .from('contato')
    .delete()
    .eq('id_contato', id)

  if (error) throw error
  return { success: true }
}

export async function getByUserId(userId) {
  const { data, error } = await supabase
    .from("contato") // 🔥 corrigido para singular
    .select("*")
    .eq("id_usuario", userId)
    .maybeSingle(); // retorna null se não existir

  if (error) throw new Error("Erro ao buscar contato");
  return data;
}


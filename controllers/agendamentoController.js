import * as agendamentoService from '../services/agendamentoService.js'

export async function listarAgendamentos(req, res) {
  const { data, error } = await agendamentoService.listarAgendamentos()

  if (error) return res.status(500).json({ error: error.message })

  return res.json(data)
}

export async function cadastrarAgendamento(req, res) {
  const {
    data_hora,
    id_cliente,
    pagamento,
    id_servico_fk
  } = req.body

  if (!data_hora || !id_servico_fk) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes' })
  }

  const { data, error } = await agendamentoService.criarAgendamento({
    data_hora,
    id_cliente,
    pagamento,
    id_servico_fk
  })

  if (error) return res.status(500).json({ error: error.message })

  return res.status(201).json(data[0])
}

export async function atualizarAgendamento(req, res) {
  const { id } = req.params

  const { error } = await agendamentoService.atualizarAgendamento(id, req.body)

  if (error) return res.status(500).json({ error: error.message })

  return res.json({ message: 'Agendamento atualizado com sucesso' })
}

export async function deletarAgendamento(req, res) {
  const { id } = req.params

  const { error } = await agendamentoService.deletarAgendamento(id)

  if (error) return res.status(500).json({ error: error.message })

  return res.json({ message: 'Agendamento removido com sucesso' })
}

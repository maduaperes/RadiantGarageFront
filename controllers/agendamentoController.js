import * as agendamentoService from '../services/agendamentoService.js'

export async function criarAgendamento(req, res) {
  const { data_hora, id_cliente, id_servico_fk, status, pagamento } = req.body

  if (!data_hora || !id_cliente || !id_servico_fk) {
    return res.status(400).json({
      error: 'Data, cliente e serviço são obrigatórios'
    })
  }

  try {
    const agendamento = await agendamentoService.createAgendamento(
      req.user.id,
      req.body
    )
    return res.status(201).json(agendamento)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function listarAgendamentos(req, res) {
  try {
    const agendamentos = await agendamentoService.getAgendamentos(req.user.id)
    return res.json(agendamentos)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function buscarAgendamento(req, res) {
  try {
    const agendamento = await agendamentoService.getAgendamentoById(
      req.params.id,
      req.user.id
    )
    return res.json(agendamento)
  } catch (err) {
    return res.status(404).json({ error: err.message })
  }
}

export async function atualizarAgendamento(req, res) {
  try {
    const agendamento = await agendamentoService.updateAgendamento(
      req.params.id,
      req.user.id,
      req.body
    )
    return res.json(agendamento)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export async function deletarAgendamento(req, res) {
  try {
    const result = await agendamentoService.deleteAgendamento(
      req.params.id,
      req.user.id
    )
    return res.json(result)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

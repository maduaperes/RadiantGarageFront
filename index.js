import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import 'dotenv/config'

import authRoutes from './routes/authRoutes.js'
import clienteRoutes from './routes/clienteRoutes.js'
import estabelecimentoRoutes from './routes/estabelecimentoRoutes.js'
import contatoRoutes from './routes/contatoRoutes.js'
//import agendamentoRoutes from './routes/agendamentoRoutes.js'
//import servicoRoutes from './routes/servicoRoutes.js'

const app = express()
const porta = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/clientes', clienteRoutes)
app.use('/api/estabelecimentos', estabelecimentoRoutes)
app.use('/api/contatos', contatoRoutes)
//app.use('/api/agendamentos', agendamentoRoutes)
//app.use('/api/servicos', servicoRoutes)

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`)
})

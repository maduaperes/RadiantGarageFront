import { Router } from 'express'
import * as agendamentoController from '../controllers/agendamentoController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', agendamentoController.listarAgendamentos)
router.get('/me', agendamentoController.listarMeusAgendamentos)
router.get("/estabelecimento", agendamentoController.listarAgendamentosEstabelecimento);
router.get('/:id', agendamentoController.buscarAgendamento)
router.post('/', agendamentoController.criarAgendamento);
router.put('/:id', agendamentoController.atualizarAgendamento)
router.delete('/:id', agendamentoController.deletarAgendamento)

export default router
 
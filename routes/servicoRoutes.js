import { Router } from 'express'
import * as servicoController from '../controllers/servicoController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', servicoController.listarServicos)
router.post('/', servicoController.cadastrarServico)
router.put('/:id', servicoController.atualizarServico)
router.delete('/:id', servicoController.deletarServico)

export default router

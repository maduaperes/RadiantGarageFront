import { Router } from 'express'
import * as contatoController from '../controllers/contatoController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.post('/', contatoController.cadastrarContato)
router.get('/', contatoController.listarContato)
router.get('/:id', contatoController.listarContatoId)
router.put('/:id', contatoController.atualizarContato)
router.delete('/:id', contatoController.removerContato)

export default router

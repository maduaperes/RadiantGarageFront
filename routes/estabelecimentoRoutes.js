import { Router } from 'express'
import * as estabelecimentoController from '../controllers/estabelecimentoController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', estabelecimentoController.listarEstabelecimento)
router.post('/', estabelecimentoController.cadastrarEstabelecimento)
router.put('/:id', estabelecimentoController.atualizarEstabelecimento)
router.delete('/:id', estabelecimentoController.deletarEstabelecimento)

export default router

import { Router } from 'express'
import {
  cadastrarEndereco,
  listarEnderecos,
  buscarEndereco,
  atualizarEndereco,
  deletarEndereco
} from '../controllers/enderecoController.js'

import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.post('/', cadastrarEndereco)
router.get('/', listarEnderecos)
router.get('/:id', buscarEndereco)
router.put('/:id', atualizarEndereco)
router.delete('/:id', deletarEndereco)

export default router

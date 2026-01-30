import { Router } from 'express'
import * as categoriaController from '../controllers/categoriaController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', categoriaController.listarCategorias)
router.post('/', categoriaController.cadastrarCategoria)
router.put('/:id', categoriaController.atualizarCategoria)
router.delete('/:id', categoriaController.deletarCategoria)

export default router

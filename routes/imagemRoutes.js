import { Router } from 'express'
import * as ImagemController from '../controllers/imagemController.js'

const router = Router()

router.post('/', ImagemController.criar)
router.get('/', ImagemController.listar)
router.get('/:id', ImagemController.buscar)
router.put('/:id', ImagemController.atualizar)
router.delete('/:id', ImagemController.deletar)

export default router

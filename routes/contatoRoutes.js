import { Router } from 'express'
import * as contatoController from '../controllers/contatoController.js'

const router = Router()

router.post('/', contatoController.create)
router.get('/', contatoController.getAll)
router.get('/:id', contatoController.getById)
router.put('/:id', contatoController.update)
router.delete('/:id', contatoController.remove)

export default router

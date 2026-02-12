import { Router } from 'express'
import * as contatoController from '../controllers/contatoController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()


router.use(authMiddleware)

router.post('/', contatoController.create)
router.get('/', contatoController.getAll)
router.get('/me', contatoController.getMyContato);
router.get('/:id', contatoController.getById)
router.put('/:id', contatoController.update)
router.delete('/:id', contatoController.remove)

export default router

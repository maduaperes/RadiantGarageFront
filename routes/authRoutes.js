import { Router } from 'express'
import { login, register, status } from '../controllers/authController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'


const router = Router()


router.post('/login', login)
router.post('/register', register)
router.get('/status', authMiddleware, status)

export default router

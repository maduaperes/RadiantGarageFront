import { Router } from 'express'
import * as clienteController from '../controllers/clienteController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', clienteController.listarClientes);
router.get('/:id', clienteController.listarClienteId);
router.post('/', clienteController.cadastrarCliente);
router.put('/:id', clienteController.atualizarCliente);
router.delete('/:id', clienteController.deletarCliente);

export default router
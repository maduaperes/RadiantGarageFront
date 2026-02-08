import { Router } from 'express';
import * as servicoController from '../controllers/servicoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/todos', servicoController.listarTodosServicos);
router.get('/publico/:id', servicoController.buscarServicoPublico);
router.get('/publico/contato/:id', servicoController.buscarServicoPublicoContato);


router.use(authMiddleware); // tudo abaixo precisa de token

router.get('/', servicoController.listarServicos);   
router.get('/me', servicoController.listarMeusServicos);   
router.post('/', servicoController.cadastrarServico);     // criar serviço
router.put('/:id', servicoController.atualizarServico);   // atualizar serviço
router.delete('/:id', servicoController.deletarServico);  // deletar serviço

export default router;

import { Router } from 'express'
import * as ColecaoController from '../controllers/colecaoController.js'

const router = Router()

router.post('/', ColecaoController.criar)
router.get('/', ColecaoController.listar)
router.get('/estabelecimento/:estabelecimento_id', ColecaoController.listarPorEstabelecimento)
router.get('/:id', ColecaoController.buscar)
router.delete('/:id', ColecaoController.deletar)

export default router

const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimentoController');


router.get('/estabelecimento/servicos', estabelecimentoController.listarServicos);
router.post('/estabelecimento/servico', estabelecimentoController.cadastrarServico);
router.put('/estabelecimento/servico/:id', estabelecimentoController.atualizarServico);
router.delete('/estabelecimento/servico/:id', estabelecimentoController.deletarServico);

module.exports = router;
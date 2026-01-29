const express = require('express');
const router = express.Router();
const cliienteController = require('../controllers/clienteController');


router.get('/cliente/agendamentos', cliienteController.listarAgendamentos);
router.post('/cliente/agendamento', cliienteController.cadastrarAgendamento);
router.put('/cliente/agendamento/:id', cliienteController.atualizarAgendamento);
router.delete('/cliente/agendamento/:id', cliienteController.deletarAgendamento);

module.exports = router;
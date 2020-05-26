const express = require('express');
const router = express.Router();

const ctrlMessage = require('../controllers/message.controller');
const jwtHelper = require('../config/jwtHelper');

router.get('/listarMensagens', jwtHelper.verifyJwtToken, ctrlMessage.listarMensagens);
router.post('/enviarMensagem', jwtHelper.verifyJwtToken, ctrlMessage.enviarMensagem);
router.patch('/atualizarMensagem/:id', ctrlMessage.atualizarMensagem);
router.delete('/deletarMensagem/:id', ctrlMessage.deletarMensagem);

module.exports = router;
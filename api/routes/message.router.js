const express = require('express');
const router = express.Router();

const ctrlMessage = require('../controllers/message.controller');

router.get('/listarMensagens', ctrlMessage.listarMensagens);
router.post('/enviarMensagem', ctrlMessage.enviarMensagem);
router.patch('/atualizarMensagem/:id', ctrlMessage.atualizarMensagem);
router.delete('/deletarMensagem/:id', ctrlMessage.deletarMensagem);

module.exports = router;
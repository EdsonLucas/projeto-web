const mongoose = require('mongoose');

const Message = mongoose.model('Message');

module.exports.listarMensagens = (req, res, next) => {
    Message.find().exec((err, result) => {
        if (err) {
            return res.status(500).json({
                myErroTitle: 'Ocorreu um erro ao buscar a mensagem!',
                myError: err
            })
        }
        res.status(200).json({
            myMsgSucess: 'Mensagem recuperada com sucesso!',
            objsMessageSRecuperados: result
        })
    });
}

module.exports.enviarMensagem = (req, res, next) => {
    const usuarioId = res.locals.auth_data._id;
    req.body.user = usuarioId;

    const message = new Message({
        content: req.body.content,
        user: req.body.user
    });
    message.save((err, result) => {
        console.log(result);
        if (err) {
            return res.status(500).json({
                myErroTitle: 'Ocorreu um erro ao salvar a mensagem!',
                myError: err
            });
        }
        res.status(201).json({
            myMsgSucess: "Mensagem salva com sucesso!",
            objMessageSave: result
        });
    });
}

module.exports.atualizarMensagem = (req, res, next) => {
    Message.findById(req.params.id, function (err, resultMsgRecuperada) {
        if (err) {
            return res.status(500).json({
                myErroTitle: 'Ocorreu um erro ao buscar a mensagem!',
                myError: err
            });
        }
        if (!resultMsgRecuperada) {
            return res.status(500).json({
                myErroTitle: 'Messagem não encontrada',
                myError: {
                    info: "A mensagm com o Id: " + req.params.id + "não foi encontrada!"
                }
            })
        }
        resultMsgRecuperada.content = req.body.content;
        resultMsgRecuperada.save(function (err, resultMsgAlterada) {
            if (err) {
                return res.status(500).json({
                    myErroTitle: 'Ocorreu um erro ao atualizar a mensagem',
                    myError: err
                });
            }
            res.status(200).json({
                myMsgSucess: "Mensagem atualizada com sucesso!",
                objMessageAtualizada: resultMsgAlterada
            });
        });
    });
}

module.exports.deletarMensagem = (req, res, next) => {
    Message.findById(req.params.id, function (err, resultMsgRecuperada) {
        console.log(resultMsgRecuperada);
        if (err) {
            return res.status(500).json({
                myErroTitle: 'Ocorreu um erro ao buscar a mensagem a ser deletada!',
                myError: err
            });
        }
        if (!resultMsgRecuperada) {
            return res.status(500).json({
                myErroTitle: 'Não foi possivel localizar a mensagem a ser deletada!',
                myError: {
                    info: "A mensagem com Id: " + res.params.id + "não foi localizada para ser deletada!"
                }
            });
        }
        resultMsgRecuperada.remove(function (err, resultMsgDeletada) {
            console.log(resultMsgDeletada);
            if (err) {
                return res.status(500).json({
                    myErroTitle: 'Ocorreu um erro ao deletar a mensagem!',
                    myError: err
                });
            }
            res.status(200).json({
                myMsgSucess: "Mensagem deletada com sucesso!",
                objMessageApagada: resultMsgDeletada
            });
        });
    });
}
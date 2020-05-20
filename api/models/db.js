const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
        console.log('Conexão realizada com sucesso.');
    } else {
        console.log('Erro ao conectar com a Base de Dados : ' + JSON.stringify(err, undefined, 2));
    }
});

require('./user.model');
require('./message.model');
const express = require('express');

// express.Router() cria um conjunto de rotas isolado deste recurso ('focos').
// Ele só vira útil de verdade quando alguém faz app.use('/prefixo', router)
// lá no app.js — sozinho, esse arquivo não escuta nada.
const router = express.Router();

// Repare: o caminho aqui é '/', não '/focos'. Esse '/' é relativo ao prefixo
// que for usado no app.js (hoje '/focos'), então essa rota responde em
// GET /focos, não em GET /.
router.get('/', (req, res) => {
    res.send('Rota de focos funcionando!');
});

// Sem isso, require('./foco.routes.js') no app.js voltaria um objeto vazio
// {} (padrão do CommonJS) em vez do router — e app.use() quebraria, porque
// espera receber uma função (foi exatamente o erro que apareceu antes).
module.exports = router;

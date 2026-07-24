const express = require('express');
const { PrismaClient } = require('../generated/prisma/client'); //importa o PrismaClient do pacote @prisma/client
const prisma = new PrismaClient(); //instancia o objeto PrismaClient, que é usado para interagir com o banco de dados
// express.Router() cria um conjunto de rotas isolado deste recurso ('focos').
// Ele só vira útil de verdade quando alguém faz app.use('/prefixo', router)
// lá no app.js — sozinho, esse arquivo não escuta nada.
const router = express.Router();

// Repare: o caminho aqui é '/', não '/focos'. Esse '/' é relativo ao prefixo
// que for usado no app.js (hoje '/focos'), então essa rota responde em
// GET /focos, não em GET /.
router.get('/', async (req, res) => {
    res.json(await prisma.foco.findMany()); //res.send e res.json são iguais, mas para API usa o res.json
});

router.post('/', async (req, res) => {
    res.json(await prisma.foco.create({ data: req.body }));
});

router.get('/:id', async (req,res) => {
    const foco = await prisma.foco.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!foco) {
        return res.status(404).json({message: 'Foco não encontrado'});
    }   
    res.json(foco);
});

router.put('/:id', async (req, res) => {
    const foco = await prisma.foco.update({where: {id: parseInt(req.params.id)}, data: req.body});
    if(!foco) {
        return res.status(404).json({message: 'Foco não encontrado'});
    }
    res.json(foco);
})

router.delete('/:id', async (req, res) => {
    res.json(await prisma.foco.delete({where: {id: parseInt(req.params.id)}}));
})
// Sem isso, require('./foco.routes.js') no app.js voltaria um objeto vazio
// {} (padrão do CommonJS) em vez do router — e app.use() quebraria, porque
// espera receber uma função (foi exatamente o erro que apareceu antes).
module.exports = router;

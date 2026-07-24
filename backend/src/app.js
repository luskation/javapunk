// Carrega o .env pra dentro de process.env. Precisa ser a primeiríssima coisa
// a rodar no app, antes de qualquer código que dependa de variáveis de ambiente
// (como o DATABASE_URL usado lá no foco.routes.js).
require('dotenv').config();

// Traz código de pacotes externos (node_modules) para dentro deste arquivo.
// Sem o require(), 'express' e 'cors' não existiriam aqui — cada arquivo .js
// só enxerga o que importa explicitamente.
const express = require('express');
const cors = require('cors');

// express() cria a instância do servidor. É esse objeto 'app' que concentra
// toda a configuração: middlewares, rotas, e no fim, o listen().
const app = express();

// Um router é um "mini app" de rotas definido em outro arquivo (separação de
// responsabilidade: app.js cuida da configuração geral, cada *.routes.js
// cuida das rotas de um recurso específico).
const focoRoutes = require('./routes/foco.routes.js');
const abateRoutes = require('./routes/abate.routes.js');
const userRoutes = require('./routes/user.routes.js');


// Middlewares rodam em TODA requisição, antes dela chegar na rota final.
// A ordem aqui importa: eles são executados na sequência em que aparecem.
app.use(express.json());  // sem isso, req.body chegaria undefined em POST/PUT
app.use(cors())

// libera chamadas vindas de outra origem (ex: o frontend)

// Monta o router sob um prefixo: qualquer rota definida dentro de focoRoutes
// passa a responder em /focos/... (ex: router.get('/') vira GET /focos).
app.use('/focos', focoRoutes);
app.use('/abates', abateRoutes);
app.use('/users', userRoutes);  

// Rota "solta", direto no app principal — útil como health check simples
// pra saber que a API está de pé.
app.get('/', (req, res) => {
    res.send('API JavaPunk funcionando!');
});

// Só a partir daqui o servidor de fato "sobe": abre a porta 3000 e fica
// esperando conexões. É isso que mantém o processo Node vivo (não retorna).
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

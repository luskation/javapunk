//importar as funções do express e do cors
const express = require('express');
const cors = require('cors');

//criar uma instância/objeto do express
const app = express();
const focoRoutes = require('./routes/focoRoutes');


//middlewares
app.use(express.json());
app.use(cors());

//importar as rotas
app.use('focos', focoRoutes);
app.get('/', (req, res) => {
    res.send('API JavaPunk funcionando!');
});

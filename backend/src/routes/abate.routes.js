const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware'); //importa o middleware de autenticação
const abateController = require('../controllers/abate.controller'); //importa o controller de abate

const router = express.Router();

router.get('/', abateController.getAll); //delegando a lógica de list para o controller

router.post('/', authMiddleware, abateController.create); //delegando a lógica de create para o controller

router.get('/:id', abateController.getById); //delegando a lógica de getById para o controller

router.put('/:id', authMiddleware, abateController.updateAbate); //delegando a lógica de update para o controller

router.delete('/:id', authMiddleware, abateController.deleteAbate); //delegando a lógica de delete para o controller

module.exports = router;

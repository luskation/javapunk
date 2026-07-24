const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware'); //importa o middleware de autenticação
const focoController = require('../controllers/foco.controller'); //importa o controller de foco

const router = express.Router();

router.get('/', focoController.getAll); //delegando a lógica de list para o controller

router.post('/', authMiddleware, focoController.create); //delegando a lógica de create para o controller

router.get('/:id', focoController.getById); //delegando a lógica de getById para o controller

router.put('/:id', authMiddleware, focoController.updateFoco); //delegando a lógica de update para o controller

router.delete('/:id', authMiddleware, focoController.deleteFoco); //delegando a lógica de delete para o controller

module.exports = router;

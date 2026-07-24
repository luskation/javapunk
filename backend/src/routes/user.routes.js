const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware'); //importa o middleware de autenticação
const userController = require('../controllers/user.controller');

const router = express.Router();

// Rota enxuta: só mapeia HTTP + caminho pro controller certo. Cadastro e
// login ficam públicos (de propósito) — ninguém tem token antes de existir
// ou de logar, então authMiddleware não faz sentido nessas duas.
router.post('/', userController.createUser); //Rota para criar usuário

router.post('/login', userController.login); //Rota para fazer login

router.get ('/', userController.getAllUsers); // Rota para buscar todos os usuários

router.get('/:id', userController.getUserById); // Rota para buscar um usuário por ID

router.delete('/:id', authMiddleware, userController.deleteUserById); // Rota para deletar um usuário por ID, protegida pelo middleware de autenticação

router.put('/:id', authMiddleware, userController.updateUserById); //Rota para atualizar um usuário por ID, protegio pelo middleware

module.exports = router;

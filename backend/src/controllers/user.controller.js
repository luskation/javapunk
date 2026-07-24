// Controller: a única camada que conhece req/res. Traduz a requisição HTTP
// em chamadas simples pro service, e traduz o retorno do service de volta
// em status code + corpo de resposta. Nenhuma regra de negócio mora aqui.
const userService = require('../services/user.service');

async function getAllUsers (req, res) {
    res.json(await userService.buscarTodos());
}

async function getUserById (req, res) {
    const user = await userService.buscarPorId(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'Usuario não encontrado' });
    }
    res.json(user);
}

async function deleteUserById (req, res) {
    // deleteUser lança erro se o id não existir (repository não trata isso)
    // — try/catch é a ferramenta certa aqui, diferente do if/return de cima.
    try {
        await userService.deletarUsuario(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: 'Usuario não encontrado' });
    }
}

async function updateUserById (req, res) {
    try {
        const user = await userService.atualizarUsuario(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        res.status(404).json({error: 'Usuario não encontrado'})
    }
}

async function login (req, res) {
    const token = await userService.login(req.body.email, req.body.senha);
    if (!token) {
        // mesma mensagem genérica tanto pra "email não existe" quanto pra
        // "senha errada" — decisão de segurança, não vazar qual foi.
        return res.status(401).json({message: 'Usuário ou senha não encontrados ou incorretos'});
    }
    res.json({token});
}

async function createUser (req, res) {
    const novoUsuario = await userService.criarUsuario(req.body);
    // "moldar a resposta" é responsabilidade do controller: aqui é onde
    // o senha_hash é removido antes de sair pro cliente.
    const { senha_hash, ...userSemSenha } = novoUsuario;
    res.status(201).json(userSemSenha);
}

module.exports = { getAllUsers, getUserById, deleteUserById, updateUserById, login, createUser };

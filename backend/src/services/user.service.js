// Service: aqui moram as regras de negócio de verdade — coisas que não são
// "conversa com banco" (isso é repository) nem "lidar com HTTP" (isso é
// controller). Hash de senha e verificação de login são exemplos exatos disso.
const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function buscarTodos() {
    return userRepository.findAll();
}

async function buscarPorId(id) {
    return userRepository.findById(id)
}

async function deletarUsuario(id) {
    return userRepository.deleteUser(id);
}

async function atualizarUsuario(id, data) {
    return userRepository.updateUser(id, data);
}

async function login (email, senha) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        // não revela se foi o email que não existe — mensagem genérica fica
        // por conta do controller, aqui só devolvemos "falhou" (null).
        return null;
    }
    const senhaCorreta = await bcrypt.compare(senha, user.senha_hash);
    if (!senhaCorreta) {
        // mesmo "null" de cima: nem o controller sabe qual dos dois errou.
        return null;
    }
    // payload do token: só o essencial pra identificar o usuário depois:
    // nunca inclui senha/hash aqui (o conteúdo do JWT não é criptografado).
    return jwt.sign({ userId: user.id, papel: user.papel }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

async function criarUsuario (data){
    // regra de negócio: senha nunca é gravada em texto puro.
    const senha_hash = await bcrypt.hash(data.senha, 10);
    return userRepository.createUser({
        nome: data.nome,
        email: data.email,
        senha_hash,
        papel: data.papel,
    });
}

module.exports = { buscarTodos, buscarPorId, deletarUsuario, atualizarUsuario, login, criarUsuario };

const focoRepository = require('../repositories/foco.repository');

async function buscarPorId(id) {
    return focoRepository.findById(id);
}

async function buscarTodos() {
    return focoRepository.findAll();
}

async function criarFoco(dadosDoFoco) {
    return focoRepository.createFoco(dadosDoFoco);
}

async function deletarFoco(id) {
    return focoRepository.deleteFoco(id);
}

async function atualizarFoco(id, dadosDoFoco) {
    return focoRepository.updateFoco(id, dadosDoFoco);
}

module.exports = { buscarPorId, buscarTodos, criarFoco, deletarFoco, atualizarFoco };
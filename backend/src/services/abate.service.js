const abateRepository = require ('../repositories/abate.repository');

async function buscarPorId(id) {
    return abateRepository.findById(id);
}

async function buscarTodos() {
    return abateRepository.findAll();
}

async function deletarPorId(id) {
    return abateRepository.deleteById(id);
}

async function criarAbate(dadosDoAbate, papelDoUsuario) {
    if (papelDoUsuario === 'cacador') {
        return abateRepository.createAbate(dadosDoAbate);
    } else {
        return null;
    }
}

async function atualizarAbate(id, dadosDoAbate) {
    return abateRepository.updateAbate(id, dadosDoAbate);
}

module.exports = { buscarPorId, buscarTodos, deletarPorId, criarAbate, atualizarAbate };
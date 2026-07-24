const focoService = require('../services/foco.service');

async function getById(req, res) {
    const foco = await focoService.buscarPorId(parseInt(req.params.id));
    if (!foco) {
        return res.status(404).json({ message: 'Foco não encontrado' });
    }
    res.json(foco);
}

async function getAll(req, res) {
    res.json(await focoService.buscarTodos());
}

async function create(req, res) {
    const dadosDoFoco = {
        lat: req.body.lat,
        lng: req.body.lng,
        descricao: req.body.descricao,
        foto_url: req.body.foto_url,
        status: req.body.status,
        criadoPorId: req.user.userId
    };
    const foco = await focoService.criarFoco(dadosDoFoco);
    res.status(201).json(foco);
}

async function deleteFoco(req, res) {
    try {
        await focoService.deletarFoco(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: 'Foco não encontrado' });
    }
}

async function updateFoco(req, res) {
    try {
        const foco = await focoService.atualizarFoco(parseInt(req.params.id), req.body);
        res.json(foco);
    } catch (error) {
        res.status(404).json({ message: 'Foco não encontrado' });
    }
}
module.exports = { getById, getAll, create, deleteFoco, updateFoco };
const abateService = require ('../services/abate.service');

async function getById(req, res) {
    const abate = await abateService.buscarPorId(parseInt(req.params.id));
    if (!abate) {
        return res.status(404).json({ message: 'Abate não encontrado' });
    }
    res.json(abate);
}

async function getAll(req, res) {
    res.json(await abateService.buscarTodos());
}

async function create(req, res) {
    const dadosDoAbate = {
        lat: req.body.lat,
        lng: req.body.lng,
        data: req.body.data,
        status_lote: req.body.statusLote,
        codigo_lote: req.body.codigoLote,
        cacadorId: req.user.userId,
    };
    const papelDoUsuario = req.user.papel;
    const abate = await abateService.criarAbate(dadosDoAbate, papelDoUsuario);
    if(!abate) {
        return res.status(403).json ({message: 'Apenas caçadores podem registrar abates'});
    }
    res.status(201).json(abate);
}

async function deleteAbate(req, res) {
    try {
        await abateService.deletarPorId(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: 'Abate não encontrado' });
    }
}

async function updateAbate(req, res) {
    try {
        const dadosDoAbate = { lat: req.body.lat, lng: req.body.lng };
        const abate = await abateService.atualizarAbate(parseInt(req.params.id), dadosDoAbate);
        res.json(abate);
    } catch (error) {
        res.status(404).json({ message: 'Abate não encontrado' });
    }
}

module.exports = { getById, getAll, create, deleteAbate, updateAbate };

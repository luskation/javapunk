const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const router = express.Router();

router.get ('/', async (req, res) => {
    res.json(await prisma.user.findMany()); 
});

router.get('/:id', async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!user) {
        return res.status(404).json({message: 'Usuário não encontrado'});
    }
    res.json(user);
});

router.delete('/:id', async (req, res) => {
    try {
        res.json(await prisma.user.delete({ where: { id: parseInt(req.params.id) } }));
    } catch (error) {
        res.status(404).json({message: 'Usuário não encontrado'});
    }
});

router.post('/', async (req, res) => {
    res.json(await prisma.user.create({ data: req.body }));     
});

router.put('/:id', async (req, res) => {
    try {
        res.json(await prisma.user.update({ where: { id: parseInt(req.params.id) }, data: req.body }));
    } catch (error) {
        res.status(404).json({message: 'Usuário não encontrado'});
    }
});

module.exports = router;
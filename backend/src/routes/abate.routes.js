const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const router = express.Router();

router.get('/', async (req, res) => {
    res.json(await prisma.abate.findMany());
});

router.get('/:id', async (req, res) => {
    const abate = await prisma.abate.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!abate) {
        return res.status(404).json({message: 'Abate não encontrado'});
    }
    res.json(abate);
});

router.post('/', async (req, res) => {
    res.json(await prisma.abate.create({ data: { lat: req.body.lat, lng: req.body.lng } }));
});

router.delete('/:id', async (req, res) => {
    try {
        res.json(await prisma.abate.delete({ where: { id: parseInt(req.params.id) } }));  
    } catch (error) {
        res.status(404).json({message: 'Abate não encontrado'}); 
    }     
});

router.put('/:id', async (req, res) => {
    try {
        res.json(await prisma.abate.update({ where: { id: parseInt(req.params.id) }, data: { lat: req.body.lat, lng: req.body.lng } }));  
    } catch (error) {
        res.status(404).json({message: 'Abate não encontrado'}); 
    }
});

module.exports = router;
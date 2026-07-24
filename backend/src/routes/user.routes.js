const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const router = express.Router();

router.post('/', async (req, res) => {
    const senha_hash = await bcrypt.hash(req.body.senha, 10);
    const user = await prisma.user.create({ 
        data: {
            nome: req.body.nome,
            email: req.body.email,
            senha_hash: senha_hash,
            papel: req.body.papel,
        }
    });
    const { senha_hash: descartado, ...userSemSenha } = user;
    res.status(201).json(userSemSenha);
});

router.post('/login', async (req, res) => {
    const user = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (!user) {
        return res.status(401).json({message: 'Usuário ou senha não encontrados ou incorretos'});
    } else {
        const senhaCorreta = await bcrypt.compare(req.body.senha, user.senha_hash);
        if (!senhaCorreta) {
            return res.status(401).json({message: 'Usuário ou senha não encontrados ou incorretos'});
        }
        const token = jwt.sign({ userId: user.id, papel: user.papel }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login bem-sucedido', token });
    }
});

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

router.put('/:id', async (req, res) => {
    try {
        res.json(await prisma.user.update({ where: { id: parseInt(req.params.id) }, data: req.body }));
    } catch (error) {
        res.status(404).json({message: 'Usuário não encontrado'});
    }
});

module.exports = router;
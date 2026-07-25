const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter })

async function findAll () {
    return prisma.abate.findMany();
}

async function findById (id) {
    return prisma.abate.findUnique({where: {id}});
}

async function deleteById (id) {
    return prisma.abate.delete({where: {id}});
}

async function createAbate (dadosDoAbate) {
    return prisma.abate.create({ data: dadosDoAbate });
}

async function updateAbate (id, dadosDoAbate) {
    return prisma.abate.update({ where: { id }, data: dadosDoAbate });
}

module.exports = { findAll, findById, deleteById, createAbate, updateAbate };
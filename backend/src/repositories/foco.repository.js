const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function findById(id) {
    return prisma.foco.findUnique({ where: { id } });
}

async function findAll() {
    return prisma.foco.findMany();
}

async function createFoco(dadosDoFoco) {
    return prisma.foco.create({data: dadosDoFoco});
}

async function deleteFoco(id) {
    return prisma.foco.delete({ where: { id } });
}

async function updateFoco(id, dadosDoFoco) {
    return prisma.foco.update({ where: { id }, data: dadosDoFoco });
}

module.exports = { findById, findAll, createFoco, deleteFoco, updateFoco };
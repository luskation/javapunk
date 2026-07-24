// Repository: a única camada que conhece o Prisma. Recebe e devolve sempre
// dados simples (números, strings, objetos) — nunca req/res, nunca regra de
// negócio. Se um dia trocar o Prisma por outra coisa, só este arquivo muda.

const { PrismaPg} = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function findAll() {
    return prisma.user.findMany();
}

async function findById(id) {
    // params de rota sempre chegam como string; o Prisma espera Int no id.
    return prisma.user.findUnique({ where: { id: parseInt(id) } });
}

async function deleteUser(id) {
    // delete() lança erro se o id não existir (diferente do findUnique, que
    // devolve null) — quem trata isso é o controller, com try/catch.
    return prisma.user.delete({ where: {id: parseInt(id) } });
}
async function updateUser(id, data) {
    // update() também lança erro se o id não existir — mesmo motivo do delete.
    return prisma.user.update({ where: { id: parseInt(id) }, data });
}

async function findByEmail(email) {
    // usado pelo login: busca por email em vez de id.
    return prisma.user.findUnique({where: {email} });
}

async function createUser(data) {
    // recebe os dados já prontos (com senha_hash calculado lá no service) —
    // esta camada só grava, nunca decide como a senha é tratada.
    return prisma.user.create({data});
}

module.exports = { findAll, findById, deleteUser, updateUser, findByEmail, createUser};

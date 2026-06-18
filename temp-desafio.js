import prisma from './prisma/client.js';

const alunoInexistente =  await prisma.aluno.findUnique({ where: { id: 999 } });
console.log (alunoInexistente);


await prisma.$disconnect();
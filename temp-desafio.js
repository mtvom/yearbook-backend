import prisma from './prisma/client.js';
console.log ("DESAFIO 01");
const alunoInexistente =  await prisma.aluno.findUnique({ where: { id: 999 } });
console.log (alunoInexistente);

console.log ("\nDESAFIO 02");
const listaSEMsenha = await prisma.aluno.findMany({
    select: {
        id: true,
        nome: true, 
        email: true,
        cidade: true, 
        frase: true, 
        planosFuturos: true, 
        fotoUrl: true, 
        role: true, 
        criadoEm: true
    },
});

console.log (listaSEMsenha);

console.log ("\nDESAFIO 03");

const novaMensagem = await prisma.mensagem.create({
  data: {
    texto: 'oie',
    autorId: 1,
  },
});

console.log('Mensagem:', novaMensagem);

const mensagens = await prisma.mensagem.findMany({
  include: {
    autor: {
      select: {
        nome: true,
        fotoUrl: true,
      },
    },
  },
});

console.log(JSON.stringify(mensagens, null, 2));

await prisma.$disconnect();
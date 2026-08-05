import prisma from '.../prisma/client.js'; // importa o singleton do Prisma

const selectMensagens = {
  id: true,
  texto: true,
  imagemUrl: true,
  autorId: true,
  autor: true,
  criadoEm: true,
};

// GET /mensagens — lista todas as mensagens (mais recentes primeiro, com dados do autor)
export async function listarMensagens(req, res, next) {
  try{ const mensagens = await prisma.mensagem.findMany({
    orderBy: { criadoEm: 'desc' },  // mais recente primeiro
    include: {
      autor: {                        // traz dados do autor junto
        select: {
          nome: true,                 // nome do autor
          fotoUrl: true,              // foto do autor
        },
      },
    },
  });
  res.json(mensagens); // retorna a lista com autor embutido
  } catch (erro){
    next(erro);
  }
}

// --- Stubs para o desafio do aluno ---
/*
Agora é sua vez. Você tem duas funções vazias no controller — 
criarMensagem e deletarMensagem. O padrão é o mesmo do controller de 
alunos. As diferenças: (1) criarMensagem precisa validar que texto não 
está vazio e (2) mensagens não têm senhaHash, então não precisa de selectSemSenha.
*/

// 🎯 POST /mensagens — cria uma nova mensagem
export async function criarMensagem(req, res, next) {
  try {
    const { texto, imagemUrl, autorId } = req.body;

    if (!texto?.trim()) {
      return res.status(400).json({ erro: 'Texto é obrigatório' });
    }

    const mensagem = await prisma.mensagem.create({
      data: {
        texto,
        imagemUrl,
        autorId: Number(autorId),
      },
      select: selectMensagens,
    });

    return res.status(201).json(mensagem);

  } catch (erro) {
    next (erro);
  }
}

// 🎯 DELETE /mensagens/:id — deleta uma mensagem
// Siga o mesmo padrão do deletarAluno
export async function deletarMensagem(req, res, next) {
  const { id } = req.params;

  try {
    await prisma.mensagem.delete({
      where: { id: Number(id) },
    });

    return res.status(204).end();
  } catch (erro) {
     return res.status(500).json({
      erro: "o id não confere a nenhuma mensagem"
    });
  }
}
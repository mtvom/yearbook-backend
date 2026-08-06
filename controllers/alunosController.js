import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// select que omite senhaHash — reutilizado em todas as queries de alunos
const selectSemSenha = {
  id: true,
  nome: true,
  email: true,
  cidade: true,
  frase: true,
  planosFuturos: true,
  fotoUrl: true,
  role: true,
  criadoEm: true,
  // senhaHash NÃO está aqui — nunca retornado pela API
};

// GET /alunos — lista todos os alunos
export async function listarAlunos(req, res, next) {  // adicione next aos parâmetros
  try {
    const alunos = await prisma.aluno.findMany({
      select: selectSemSenha,
    });
    res.json(alunos);
  } catch (erro) {
    next(erro);  // passa o erro para o middleware global
  }
}

// GET /alunos/:id — busca um aluno pelo ID

export async function buscarAluno(req, res, next) {
  try{
    const { id } = req.params; // extrai o :id da URL
  const aluno = await prisma.aluno.findUnique({
    where: { id: Number(id) }, // converte string → number
    select: selectSemSenha,    // omite senhaHash
  });

  if (!aluno) {
    return res.status(404).json({ erro: 'Aluno não encontrado' }); // null → 404
  }

  res.json(aluno); // retorna o aluno encontrado
  } catch(erro){
    next(erro);
  }
  
}

// --- Stubs para o desafio do aluno ---
export async function criarAluno(req, res, next) {
  try {
    const aluno = await prisma.aluno.create({
      data: req.body,
      select: selectSemSenha,
    });

    return res.status(201).json(aluno);
  } catch (erro){
    next(erro);
  }
}

export async function atualizarAluno(req, res, next) {
  const { id } = req.params;
  try{
  const aluno = await prisma.aluno.update({
  where: { id: Number(id) },
  data: req.body,
  select: selectSemSenha,
  });

  return res.status(200).json(aluno);
  } catch (erro){
    next(erro);
  }
}

export async function deletarAluno(req, res, next) {
  const { id } = req.params;

  try {
    await prisma.aluno.delete({
      where: { id: Number(id) },
    });

    return res.status(204).end();
  } catch (erro){
    next(erro);
  
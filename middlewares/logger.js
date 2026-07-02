// Middleware de log — registra cada requisição no terminal
export default function logger(req, res, next) {
  const inicio = Date.now(); 

  res.on('finish', () => {
    const duracao = Date.now() - inicio;     // timestamp no formato ISO
    const agora = new Date().toISOString();
    const metodo = req.method;                   // GET, POST, PUT, DELETE
    const url = req.originalUrl;
    const status = res.statusCode;                 // URL completa da requisição
    console.log(`[${agora}]${req.method}${req.originalUrl} →${res.statusCode} (${duracao}ms)`);  // exibe no terminal
  })
  next();                                       // passa para o próximo middleware/rota
}
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Limita cada IP a 5 requisições por `windowMs` para fins de teste
  message: {
    message: 'Too many requests, please try again later.',
  }, // Mensagem de erro ajustada para retornar um objeto com a chave `message`
  headers: true, // Inclui informações sobre a limitação nos cabeçalhos
});

module.exports = limiter;

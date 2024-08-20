const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Limita cada IP a 5 requisições por `windowMs`
  message: {
    message: 'Too many requests, please try again later.',
  },
  headers: true,
  handler: (req, res, next) => {
    console.log('Limite de requisições excedido, enviando resposta 429');
    res.status(429).json({
      message: 'Too many requests, please try again later.',
    });
  },
});

module.exports = limiter;

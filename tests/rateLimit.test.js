const request = require('supertest');
const { app, sequelize } = require('../app'); // Importa o aplicativo Express do app.js

beforeAll(async () => {
  await sequelize.sync(); // Garante que o banco esteja sincronizado antes dos testes
});

describe('Rate Limiting', () => {
  it('should allow the first few requests and then block the rest', async () => {
    const MAX_REQUESTS = 5; // Supondo que o limite seja 5 requisições por minuto
    let response;

    // Envia as primeiras 5 requisições (espera-se que elas sejam aceitas)
    for (let i = 0; i < MAX_REQUESTS; i++) {
      response = await request(app).get('/api/tasks'); // Substitua a rota pelo endpoint que deseja testar
      expect(response.statusCode).not.toEqual(429); // Verifica que não foi bloqueado
    }

    // Envia uma requisição extra (espera-se que esta seja bloqueada)
    response = await request(app).get('/api/tasks'); // Substitua a rota pelo endpoint que deseja testar

    // Log da resposta completa para ajudar na depuração se houver falhas
    console.log('Resposta da requisição extra:', response.body);

    expect(response.statusCode).toEqual(429); // Verifica que foi bloqueado
    expect(response.body).toHaveProperty('message', 'Too many requests, please try again later.'); // Verifica a mensagem de erro
  });
});

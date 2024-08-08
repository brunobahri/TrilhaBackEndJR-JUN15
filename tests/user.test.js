// tests/user.test.js
const request = require('supertest');
const app = require('../app'); // Importa o aplicativo Express do app.js

describe('User API Endpoints', () => {
  let server;
  beforeAll((done) => {
    server = app.listen(4000, done); // Inicia o servidor em uma porta diferente para testes
  });

  afterAll((done) => {
    server.close(done); // Fecha o servidor após os testes
  });

  it('should create a new user', async () => {
    const res = await request(server)
      .post('/api/user/register')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Usuário criado com sucesso');
    expect(res.body.user).toHaveProperty('username', 'testuser');
  });

  it('should not create a duplicate user', async () => {
    await request(server)
      .post('/api/user/register')
      .send({
        username: 'duplicateuser',
        password: 'testpassword'
      });

    const res = await request(server)
      .post('/api/user/register')
      .send({
        username: 'duplicateuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Usuário já existe');
  });

  it('should login a user', async () => {
    await request(server)
      .post('/api/user/register')
      .send({
        username: 'loginuser',
        password: 'testpassword'
      });

    const res = await request(server)
      .post('/api/user/login')
      .send({
        username: 'loginuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Login realizado com sucesso');
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with wrong password', async () => {
    await request(server)
      .post('/api/user/register')
      .send({
        username: 'wrongpassworduser',
        password: 'correctpassword'
      });

    const res = await request(server)
      .post('/api/user/login')
      .send({
        username: 'wrongpassworduser',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Senha inválida');
  });

  it('should logout a user', async () => {
    const res = await request(server)
      .get('/api/user/logout');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Logout realizado com sucesso');
  });
});

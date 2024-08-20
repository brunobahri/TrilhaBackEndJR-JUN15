process.env.JWT_SECRET = 'minha_chave_secreta_para_testes';
process.env.DB_TEST_PATH = './data/testdb.sqlite';

const request = require('supertest');
const app = require('../app'); // Agora `app` é a instância do Express
const sequelize = require('../sequelize');
const User = require('../models/User');

describe('User API Endpoints', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await sequelize.query('PRAGMA foreign_keys = OFF'); // Desabilita as chaves estrangeiras
    await User.destroy({ where: {}, truncate: true }); // Limpa a tabela de usuários
    await sequelize.query('PRAGMA foreign_keys = ON'); // Reabilita as chaves estrangeiras
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/user/register')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    console.log('Resposta ao criar usuário:', res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Usuário criado com sucesso');
    expect(res.body.user).toHaveProperty('username', 'testuser');
  });

  it('should not create a duplicate user', async () => {
    await request(app)
      .post('/api/user/register')
      .send({
        username: 'duplicateuser',
        password: 'testpassword'
      });

    const res = await request(app)
      .post('/api/user/register')
      .send({
        username: 'duplicateuser',
        password: 'testpassword'
      });
    console.log('Resposta ao tentar criar usuário duplicado:', res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Usuário já existe');
  });

  it('should login a user', async () => {
    await request(app)
      .post('/api/user/register')
      .send({
        username: 'loginuser',
        password: 'testpassword'
      });

    const res = await request(app)
      .post('/api/user/login')
      .send({
        username: 'loginuser',
        password: 'testpassword'
      });
    console.log('Resposta ao fazer login:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Login realizado com sucesso');
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with wrong password', async () => {
    await request(app)
      .post('/api/user/register')
      .send({
        username: 'wrongpassworduser',
        password: 'correctpassword'
      });

    const res = await request(app)
      .post('/api/user/login')
      .send({
        username: 'wrongpassworduser',
        password: 'wrongpassword'
      });
    console.log('Resposta ao tentar login com senha errada:', res.body);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Senha inválida');
  });

  it('should logout a user', async () => {
    const res = await request(app)
      .get('/api/user/logout');
    console.log('Resposta ao fazer logout:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Logout realizado com sucesso');
  });
});

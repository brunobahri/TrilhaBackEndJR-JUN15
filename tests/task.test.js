process.env.JWT_SECRET = 'minha_chave_secreta_para_testes'; // Define o segredo JWT para os testes

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const sequelize = require('../sequelize'); // Usando a instância de sequelize compartilhada
const User = require('../models/User');
const Task = require('../models/Task');

// Gera um token JWT válido para os testes
function generateTestToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

describe('Task API Endpoints', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Sincroniza o banco de dados e cria um usuário de teste
    await sequelize.sync({ force: true });
    const user = await User.create({
      username: 'testuser',
      password: 'testpassword' // Pode ser um hash adequado para testes reais
    });
    userId = user.id;

    // Gera o token JWT para o usuário
    token = generateTestToken(user.id);
  });

  beforeEach(async () => {
    // Limpa a tabela de tarefas antes de cada teste
    await Task.destroy({ where: {}, truncate: true });
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Minha tarefa de teste',
        description: 'Descrição da tarefa de teste'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Tarefa criada com sucesso');
    expect(res.body.task).toHaveProperty('title', 'Minha tarefa de teste');
  });

  it('should get all tasks for the authenticated user', async () => {
    // Cria uma tarefa para garantir que haja algo para buscar
    await Task.create({ title: 'Tarefa de teste', userId });

    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a task', async () => {
    const task = await Task.create({
      title: 'Tarefa para atualização',
      description: 'Descrição da tarefa para atualização',
      userId
    });

    const res = await request(app)
      .put(`/api/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        completed: true
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Tarefa atualizada com sucesso');
    expect(res.body.task).toHaveProperty('completed', true);
  });

  it('should delete a task', async () => {
    const task = await Task.create({
      title: 'Tarefa para deletar',
      description: 'Descrição da tarefa para deletar',
      userId
    });

    const res = await request(app)
      .delete(`/api/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Tarefa deletada com sucesso');
  });
});

require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const sequelize = require('./sequelize');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); // Importando as rotas de tarefas
const swaggerSetup = require('./config/swagger'); // Importando a configuração do Swagger
const rateLimiter = require('./middleware/rateLimiter'); // Importa o middleware de limitação de requisições

const app = express();
app.use(express.json());

// Configuração do Swagger
swaggerSetup(app);

// Aplica o middleware de limitação de requisições apenas se não estiver em ambiente de testes
if (process.env.NODE_ENV !== 'test') {
  app.use(rateLimiter);
}

// Definindo as rotas da API
app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes); // Adicionando as rotas de tarefas

// Middleware de tratamento de erros (deve ser o último middleware)
app.use((err, req, res, next) => {
  console.error('Erro capturado pelo middleware:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app; // Exportando apenas a instância do Express

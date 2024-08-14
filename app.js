require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const sequelize = require('./sequelize');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); // Importando as rotas de tarefas
const rateLimiter = require('./middleware/rateLimiter'); // Importando o middleware de limitação de requisições

const app = express();
app.use(express.json());

// Aplica o middleware de limitação de requisições globalmente
app.use(rateLimiter);

app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes); // Adicionando as rotas de tarefas

// Remove a função checkConnection daqui

module.exports = { app, sequelize };

require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const sequelize = require('./sequelize');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); // Importando as rotas de tarefas

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes); // Adicionando as rotas de tarefas

async function checkConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sincronizando os modelos com o banco de dados
    await sequelize.sync();
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

checkConnection();

module.exports = app;

require('dotenv').config();
const express = require('express');
const sequelize = require('./sequelize'); // Importando a instância de sequelize
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);

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

const { Sequelize } = require('sequelize');
require('dotenv').config(); // Certifique-se de carregar as variáveis de ambiente

// Seleciona o caminho do banco de dados com base no ambiente
const dbPath = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_PATH : process.env.DB_PATH;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath
});

module.exports = sequelize

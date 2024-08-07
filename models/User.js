const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Importando a instância de sequelize

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Outras opções de modelo
});

module.exports = User;

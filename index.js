const app = require('./app'); // Importa a instância do Express
const sequelize = require('./sequelize'); // Importa a instância do sequelize

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sincronizando os modelos com o banco de dados
    await sequelize.sync();
    console.log('Database synchronized.');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Sai da aplicação em caso de erro na conexão com o banco de dados
  }
}

startServer();

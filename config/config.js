//Reemplazo de config.json creado por npx sequelize-cli init a config.js para poder leer variables de entorno creadas en .env

require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3309,
    dialect: process.env.DB_DIALECT || 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    logging: false,
  },
};

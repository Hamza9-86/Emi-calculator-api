const { Sequelize } = require('sequelize');
require("dotenv").config();
// Using the connection string provided
const url = process.env.POSTGRE_URL;
const sequelize = new Sequelize(url, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Required for Neon connections
    },
  },
});

module.exports = sequelize;

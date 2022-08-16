const Sequelize = require('sequelize');

require("dotenv").config();

const sequelize = new Sequelize (process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
   dialect: "mysql", host: "127.0.0.1"
});

module.exports = sequelize;
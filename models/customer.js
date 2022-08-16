const Sequelize = require('sequelize');
const sequelize = require('../utility/database');
const Customer = sequelize.define("customer", {
   id: {
      type: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
   },
   fname: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   lname: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   principal: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   interest: {
      type: Sequelize.FLOAT,
      allowNull: false,
   },
   repayment: {
      type: Sequelize.INTEGER,
   },
   balance: {
      type: Sequelize.INTEGER,
   },
   status: {
      type: Sequelize.STRING,
      allowNull: false,
   },
});

module.exports = { Customer }; 
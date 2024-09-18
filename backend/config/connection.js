const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("raw-stats", "root", "password", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;

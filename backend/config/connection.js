const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("raw_stats", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;

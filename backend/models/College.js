const sequelize = require("../config/connection.js");
const { Model, DataTypes } = require("sequelize");

const College = sequelize.define(
  "college",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "college",
  }
);

module.exports = College;

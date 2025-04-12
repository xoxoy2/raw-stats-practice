const sequelize = require("../config/connection.js");
const { Model, DataTypes } = require("sequelize");

const Player = sequelize.define(
  "player",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    touchdowns: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    passingYards: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rushingYards: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    receivingYards: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "player",
  }
);

module.exports = Player;

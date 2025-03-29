const sequelize = require("../config/connection.js");
const { Model, DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
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
      allowNull: true,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
   
  },
  // {
  //   sequelize,
  //   timestamps: false,
  //   freezeTableName: true,
  //   underscored: true,
  //   //modelName: "user",
  // }
);

console.log("userModel",User,sequelize.models.User)

module.exports = User;

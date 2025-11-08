const sequelize = require("../config/connection.js");
const { Model, DataTypes } = require("sequelize");

const UserStats = sequelize.define(
  "UserStats",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    reviewStatus: {
      type: DataTypes.ENUM("under review", "approved", "rejected"),
      allowNull: false,
      defaultValue: "under review" // other values could be "approved", "rejected"
    },

    data: {
      type: DataTypes.JSON,
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

console.log("userStatsModel",UserStats,sequelize.models.UserStats)

module.exports = UserStats;

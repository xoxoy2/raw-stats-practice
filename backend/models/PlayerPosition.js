const sequelize = require("../config/connection.js");
const { Model, DataTypes } = require("sequelize");
const Player = require("./Player.js");

const PlayerPosition = sequelize.define(
  "player_position",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    player_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "player",
        key: "id",
      },
    },
    position_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "position",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "player_position",
  }
);

module.exports = PlayerPosition;

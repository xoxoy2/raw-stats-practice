const sequelize = require("../config/connection.js");
const { Model, DataTypes } = require("sequelize");

const PlayerCollege = sequelize.define(
  "player_college",
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
    college_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "college",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "player_college",
  }
);

module.exports = PlayerCollege;

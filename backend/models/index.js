const Player = require("./Player");
const Position = require("./Position");
const College = require("./College");
const PlayerCollege = require("./PlayerCollege");
const PlayerPosition = require("./PlayerPosition");

// set up many to many relationship between player and position
Player.belongsToMany(Position, {
  through: "player_position",
  foreignKey: "player_id",
});

Position.belongsToMany(Player, {
  through: "player_position",
  foreignKey: "position_id",
});

// set up many to many relationship between player and college
Player.belongsToMany(College, {
  through: "player_college",
  foreignKey: "player_id",
});

College.belongsToMany(Player, {
  through: "player_college",
  foreignKey: "college_id",
});

module.exports = { Player, Position, College, PlayerCollege, PlayerPosition };

const { players } = require("../data.js");
const { Player } = require("../models");

const getAllPlayers = async (req, res) => {
  // get all players using Player model
  const players = await Player.findAll();
  res.json(players);
};

const addPlayer = (req, res) => {
  console.log(req.body);
  players.push(req.body);
  res.json({ message: "Player added" });
};

module.exports = { getAllPlayers, addPlayer };

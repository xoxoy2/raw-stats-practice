const { players } = require("../data.js");

const getAllPlayers = (req, res) => {
  res.json(players);
};

const addPlayer = (req, res) => {
  console.log(req.body);
  players.push(req.body);
  res.json({ message: "Player added" });
};

module.exports = { getAllPlayers, addPlayer };

// const { players } = require("../data.js");
const { Player } = require("../models");

const getAllPlayers = async (req, res) => {
  // get all players using Player model
  const players = await Player.findAll();
  res.json(players);
};

const addPlayer = async (req, res) => {
  console.log(req.body);
  // players.push(req.body);
  const player = await Player.create(req.body);
  res.json({ message: "Player added" });
};

const updatePlayer= async (req,res) => {
  try {
    const updatedPlayer=await Player.update(req.body,{where:{id:req.params.id}})
    res.json({ message: "Player updated" });
  } catch (error) {
    res.status (500).json(error)
  }
}
module.exports = { getAllPlayers, addPlayer,updatePlayer };


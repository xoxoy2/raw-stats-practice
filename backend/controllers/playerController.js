// const { players } = require("../data.js");
const { Player, College, Position } = require("../models");

const getAllPlayers = async (req, res) => {
  // get all players using Player model
  const players = await Player.findAll({
    include:[{
      model:College,
      attributes:["id","name"],
      through:{attributes:[]}
    },
    {
      model:Position,
      attributes:["id","name"],
      through:{attributes:[]}
    }]
  });
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

const addCollegeToPlayer= async (req,res) => {
  try {
   const player= await Player.findByPk(req.params.playerid)
   const college= await College.findByPk(req.params.collegeid)
   if (player && college) {
   const updatedPlayer= await player.addCollege(college)
   res.json(updatedPlayer)
   }
  } catch (error) {
    res.status (500).json(error)
  }
}

const addPositionToPlayer= async (req,res) => {
  try {
   const player= await Player.findByPk(req.params.playerid)
   const position= await Position.findByPk(req.params.positionid)
   if (player && position) {
   const updatedPlayer= await player.addPosition(position)
   res.json(updatedPlayer)
   }
  } catch (error) {
    res.status (500).json(error)
  }
}



module.exports = { getAllPlayers, addPlayer,updatePlayer,addCollegeToPlayer,addPositionToPlayer };


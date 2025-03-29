// const { players } = require("../data.js");
//const { Player, College, Position } = require("../models");
const {Op}=require("sequelize")
const argon2=require("argon2")
const {User}= require ("../models/User")
const sequelize = require("../config/connection.js");
const jwt = require("jsonwebtoken")
console.log (User)

// const getAllPlayers = async (req, res) => {
//   // get all players using Player model
//   const players = await Player.findAll({
//     include:[{
//       model:College,
//       attributes:["id","name"],
//       through:{attributes:[]}
//     },
//     {
//       model:Position,
//       attributes:["id","name"],
//       through:{attributes:[]}
//     }]
//   });
//   res.json(players);
// };

const signUpUser = async (req, res) => {
  console.log(req.body);
  console.log ( "sequelizeModel",sequelize.models.User)
  try {
    const foundExistingUser= await sequelize.models.User.findOne({
      where:{
          [Op.or]: [
              {
                  email:req.body.email
              },
             
          ]
      }
    })
    console.log("exisiting user found",foundExistingUser)
    if(foundExistingUser?.id){
      res.json ({success:false,message: "Email or username already taken"})
      return
    }
    const hash = await argon2.hash(req.body.password);
     const user = await sequelize.models.User.create({
      email:req.body.email,
      passwordHash:hash,
      firstName: req.body.firstName,
      lastName:req.body.lastName
     });
     const authtoken = jwt.sign ({id:user.id}, process.env.JWT_SECRET,{expiresIn:"365d"})
     res.cookie("session",authtoken,{
      maxAge:1000*60*60*24*365,
      httpOnly:true
     })
    res.json({ message: "User added",success:true,data:user });
  } catch (error) {
    console.log (error)
    res.json({ message: "Unsuccessful sign up",success:false,data:null });

  }

};

// const updatePlayer= async (req,res) => {
//   try {
//     const updatedPlayer=await Player.update(req.body,{where:{id:req.params.id}})
//     res.json({ message: "Player updated" });
//   } catch (error) {
//     res.status (500).json(error)
//   }
// }

// const addCollegeToPlayer= async (req,res) => {
//   try {
//    const player= await Player.findByPk(req.params.playerid)
//    const college= await College.findByPk(req.params.collegeid)
//    if (player && college) {
//    const updatedPlayer= await player.addCollege(college)
//    res.json(updatedPlayer)
//    }
//   } catch (error) {
//     res.status (500).json(error)
//   }
// }

// const addPositionToPlayer= async (req,res) => {
//   try {
//    const player= await Player.findByPk(req.params.playerid)
//    const position= await Position.findByPk(req.params.positionid)
//    if (player && position) {
//    const updatedPlayer= await player.addPosition(position)
//    res.json(updatedPlayer)
//    }
//   } catch (error) {
//     res.status (500).json(error)
//   }
// }



module.exports = { signUpUser };
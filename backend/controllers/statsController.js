// const { players } = require("../data.js");
//const { Player, College, Position } = require("../models");
const {Op}=require("sequelize")
const {UserStats}= require ("../models/UserStats.js")
const sequelize = require("../config/connection.js");
const jwt = require("jsonwebtoken");


//send user stats via notification to admin's profile for review
//save the data with the flag for under review
//users can see their own data while under review, but can't see others
//users can't submit multiple tables for same category while under review
const submitTableForReview = async (req, res) => {
try {
  
   const authtoken=req.headers.authorization
  if (!authtoken){
    res.json({success:false,data:null,message:"unauthorized"})
  }
  const verifiedSession=await jwt.verify (authtoken,process.env.JWT_SECRET)
  console.log (verifiedSession,"verifiedSession")
  if (!verifiedSession){
    res.json({success:false,data:null,message:"unauthorized"})
    return
  }

   const saveResult= await sequelize.models.UserStats.create({
    category:req.body.category,
    data:req.body.data,
    userId:verifiedSession.id,
    reviewStatus:"under review"
    }
   )
    console.log("Stats results",saveResult)
    res.json({ message: "Save table data",success:true,data:{}});

} catch (error) {
 console.log (error)
    res.json({ message: "Save table data",success:false,data:null });  
}
};

const getUserStats = async (req, res) => {
try {
  
   const authtoken=req.headers.authorization
  if (!authtoken){
    res.json({success:false,data:null,message:"unauthorized"})
  }
  const verifiedSession=await jwt.verify (authtoken,process.env.JWT_SECRET)
  console.log (verifiedSession,"verifiedSession")
  if (!verifiedSession){
    res.json({success:false,data:null,message:"unauthorized"})
    return
  }

   const userStatsResult= await sequelize.models.UserStats.findAll({
    where:{userId:verifiedSession.id}
    }
   )
    console.log("Stats results",userStatsResult)
    res.json({ message: "User stats retrieved",success:true,data:userStatsResult});

} catch (error) {
 console.log (error)
    res.json({ message: "Save table data",success:false,data:null });  
}
};

const adminGetAllUserStats = async (req, res) => {
try {
  
   const authtoken=req.headers.authorization
  if (!authtoken){
    res.json({success:false,data:null,message:"unauthorized"})
  }
  const verifiedSession=await jwt.verify (authtoken,process.env.JWT_SECRET)
  console.log (verifiedSession,"verifiedSession")
  if (!verifiedSession){
    res.json({success:false,data:null,message:"unauthorized"})
    return
  }

   const userStatsResult= await sequelize.models.UserStats.findAll(
  
    
   )
    console.log("Stats results",userStatsResult)
    res.json({ message: "Admin user stats retrieved",success:true,data:userStatsResult});

} catch (error) {
 console.log (error)
    res.json({ message: "Admin user stats error",success:false,data:null });  
}
};


const updateUserStats = async (req, res) => {
try {
  
   const authtoken=req.headers.authorization
  if (!authtoken){
    res.json({success:false,data:null,message:"unauthorized"})
  }
  const verifiedSession=await jwt.verify (authtoken,process.env.JWT_SECRET)
  console.log (verifiedSession,"verifiedSession")
  if (!verifiedSession){
    res.json({success:false,data:null,message:"unauthorized"})
    return
  }

   const saveResult= await sequelize.models.UserStats.create({
    category:req.body.category,
    data:req.body.data,
    userId:verifiedSession.id,
    reviewStatus:"under review"
    }
   )
    console.log("Stats results",saveResult)
    res.json({ message: "Save table data",success:true,data:{}});

} catch (error) {
 console.log (error)
    res.json({ message: "Save table data",success:false,data:null });  
}
};

module.exports = {submitTableForReview, getUserStats, updateUserStats, adminGetAllUserStats};
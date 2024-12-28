const {College,Position}=require ("../models")
const {colleges,positions}=require ("./seeddata.js")
const sequelize = require("../config/connection.js");
const addPositions= async()=>{
    try {
        console.log("Adding positions")
        await Position.bulkCreate(positions)
        console.log("Positions added")
    } catch (error) {
        console.error("Failed to add positions",error)
        
    }
}

const addColleges= async()=>{
    try {
        console.log("Adding colleges")
        await College.bulkCreate(colleges)
        console.log("colleges added")
    } catch (error) {
        console.error("Failed to add colleges",error)
        
    }
}

const seedDb= async () => {
    try {
        await sequelize.sync()
        await addPositions()
        await addColleges()
    } catch (error) {
        console.error("Failed to seed database",error)
    }
    
}
seedDb()
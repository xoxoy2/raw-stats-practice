const express = require("express");
const router = express.Router();
const {
  signUpUser,
  LoginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController.js");

// GET public
// /api/players
// Get all players
//router.get("/", getAllPlayers);

// POST public
// /api/players
// Add a player
//router.post("/", addPlayer);

//PUT private
// /api/players/:id
//updated player
//router.put("/:id",updatePlayer)

//PUT private
// /api/players/:playerid/:collegeid
//add a college to a player
//router.put("/:playerid/college/:collegeid",addCollegeToPlayer)

//PUT private
// /api/players/:playerid/:collegeid
//add a college to a player
//router.put("/:playerid/position/:positionid",addPositionToPlayer)

router.post("/signup",signUpUser)
router.post("/login",LoginUser)
router.get("/profile",getUserProfile)
router.put("/profile",updateUserProfile)

module.exports = router;

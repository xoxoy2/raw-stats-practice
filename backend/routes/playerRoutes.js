const express = require("express");
const router = express.Router();
const {
  getAllPlayers,
  addPlayer,
  updatePlayer,
} = require("../controllers/playerController.js");

// GET public
// /api/players
// Get all players
router.get("/", getAllPlayers);

// POST public
// /api/players
// Add a player
router.post("/", addPlayer);

//PUT private
// /api/players/:id
//updated player
router.put("/:id",updatePlayer)
module.exports = router;

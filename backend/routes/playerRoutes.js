const express = require("express");
const router = express.Router();
const {
  getAllPlayers,
  addPlayer,
} = require("../controllers/playerController.js");

// GET public
// /api/players
// Get all players
router.get("/", getAllPlayers);

// POST public
// /api/players
// Add a player
router.post("/", addPlayer);

module.exports = router;

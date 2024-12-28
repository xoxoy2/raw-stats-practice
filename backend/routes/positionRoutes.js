const express = require("express");
const router = express.Router();
const {
  getAllPositions,
  //addPosition,
} = require("../controllers/positionController.js");

// GET public
// /api/players
// Get all players
router.get("/", getAllPositions);

// POST public
// /api/positions
// Add a position
//router.post("/", addPosition);

module.exports = router;
const express = require("express");
const router = express.Router();
const {
  getAllColleges,
} = require("../controllers/collegeController.js");

// GET public
// /api/collegess
// Get all colleges
router.get("/", getAllColleges);

// POST public
// /api/colleges
// Add a college
//router.post("/", addCollege);

module.exports = router;
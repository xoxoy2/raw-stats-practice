const express = require("express");
const router = express.Router();
const { submitTableForReview,getUserStats,updateUserStats, adminGetAllUserStats
} = require("../controllers/statsController.js");


router.post("/save",submitTableForReview)
router.get("/view",getUserStats)
router.put("/update",updateUserStats)

router.get("/admin/all-user-stats",adminGetAllUserStats)

module.exports = router;

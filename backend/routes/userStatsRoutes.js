const express = require("express");
const router = express.Router();
const { submitTableForReview,getUserStats,updateUserStats, adminGetAllUserStats, adminRejectStats, adminApproveStats
} = require("../controllers/statsController.js");


router.post("/save",submitTableForReview)
router.get("/view",getUserStats)
router.put("/update",updateUserStats)

router.get("/admin/all-user-stats",adminGetAllUserStats)
router.post("/admin/reject/:id",adminRejectStats)
router.post("/admin/approve/:id",adminApproveStats)

module.exports = router;

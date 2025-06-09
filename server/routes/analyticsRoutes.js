const express = require("express");
const router = express.Router();
const {getUserStats,getTeamStats,} = require("../controllers/analyticsController");
const protect = require("../middilware/authMiddleware");

// Get user analytics and statistics
router.get("/", protect, getUserStats);

// Get team analytics for team leads
router.get("/team", protect, getTeamStats);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getAllUsers, getOrgChart, getUserTeam } = require('../controllers/orgController');
const protect = require("../middilware/authMiddleware");

// Get all users categorized by role
router.get('/users', protect, getAllUsers);

// Get hierarchical org chart
router.get('/org', protect, getOrgChart);

// Get user's team (manager, colleagues, direct reports)
router.get('/team', protect, getUserTeam);


router.get('/static/getOrg', protect, getOrgChart);

module.exports = router;
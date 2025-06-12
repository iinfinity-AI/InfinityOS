const express = require('express');
const router = express.Router();
const { getAllUsers} = require('../controllers/orgController');
const protect = require("../middilware/authMiddleware");

// Get all users categorized by role
router.get('/users', protect, getAllUsers);


module.exports = router;
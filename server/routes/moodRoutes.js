const express = require("express");
const router = express.Router();
const protect = require("../middilware/authMiddleware");
const { saveMood, getMoods } = require("../controllers/moodController");

router.post("/mood", protect, saveMood);
router.get("/mood", protect, getMoods);

module.exports = router;

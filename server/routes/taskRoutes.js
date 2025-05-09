const express = require("express");
const router = express.Router();
const protect = require("../middilware/authMiddleware"); // Your JWT middleware
const { createTask, updateTask } = require("../controllers/taskController");

// Create Task
router.post("/tasks", protect, createTask);

// Update Task
router.put("/tasks/:id", protect, updateTask);

module.exports = router;

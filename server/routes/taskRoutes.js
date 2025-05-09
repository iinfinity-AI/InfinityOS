const express = require("express");
const protect = require("../middilware/authMiddleware"); 
const { createTask, updateTask } = require("../controllers/taskController");
const router = express.Router();




router.post("/tasks", protect, createTask);


router.put("/tasks/:id", protect, updateTask);

module.exports = router;


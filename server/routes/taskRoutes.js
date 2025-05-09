const express = require("express");
const protect = require("../middilware/authMiddleware"); 
const {getTasks, createTask, updateTask } = require("../controllers/taskController");
const router = express.Router();




router.post("/tasks",protect, createTask);
router.put("/tasks/:id", protect, updateTask);
router.get("/tasks", protect, getTasks);
module.exports = router;


const express = require("express");
const protect = require("../middilware/authMiddleware"); 
const {getTasks, createTask, updateTask,changeEmployeeTaskStatus, getEmployeeTasks } = require("../controllers/taskController");
const router = express.Router();




router.post("/tasks",protect, createTask);
router.put("/tasks/:id", protect, updateTask);
router.get("/tasks", protect, getTasks);
router.get("/tasks/get", protect, getEmployeeTasks);
router.patch("/tasks/change/:id", protect, changeEmployeeTaskStatus);

module.exports = router;


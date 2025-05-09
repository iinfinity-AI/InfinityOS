const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      status,
      assignedTo,
      dueDate,
      createdBy: req.user.id,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Optional: Check if the current user is allowed to update
    // if (task.createdBy.toString() !== req.user.id) {
    //   return res.status(403).json({ error: "Unauthorized" });
    // }

    const updates = req.body;
    Object.assign(task, updates);
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTask, updateTask };

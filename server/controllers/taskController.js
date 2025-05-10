const Task = require("../models/Task");


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


const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }



    const updates = req.body;
    Object.assign(task, updates);
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTask, updateTask,getTasks};

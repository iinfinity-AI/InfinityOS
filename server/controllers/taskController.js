const Task = require("../models/Task");
const User = require("../models/User");

async function isDuplicateTitle({ title, assignedTo, startDate, dueDate }) {
  return await Task.findOne({
    title,
    assignedTo: { $in: assignedTo },
    $or: [
      { startDate: { $lte: dueDate }, dueDate: { $gte: startDate } },
      { startDate: { $exists: false }, dueDate: { $exists: false } }
    ]
  });
}

const createTask = async (req, res) => {
  try {
    if (!["Admin", "team-lead"].includes(req.user.role)) {
      return res.status(403).json({ error: "Unauthorized: Only Admin or Team Lead can create tasks." });
    }

    const {title,description,status,assignedTo,dueDate,startDate,priority,tags,project} = req.body;
    
    if (
      !title ||
      !description ||
      !assignedTo ||
      !Array.isArray(assignedTo) ||
      assignedTo.length === 0 ||
      !priority ||
      !startDate ||
      !dueDate
    ) {
      return res.status(400).json({ error: "All fields except tags are required." });
    }

    if (new Date(dueDate) < new Date(startDate)) {
      return res.status(400).json({ error: "Due date must be after or equal to start date." });
    }
    
    const duplicate = await isDuplicateTitle({ title, assignedTo, startDate, dueDate });
    if (duplicate) {
      return res.status(400).json({ error: "Duplicate task title for assigned user(s) in this date range." });
    }
   
    const users = await User.find({ _id: { $in: assignedTo } });
    if (users.length !== assignedTo.length) {
      return res.status(400).json({ error: "One or more assigned users do not exist." });
    }

    const task = new Task({
      title,
      description,
      status: status || "pending",
      assignedTo,
      dueDate,
      startDate,
      priority,
      tags,
      project,
      createdBy: req.user.userId,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
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

    const isAssigned = task.assignedTo.some(
      userId => userId.toString() === req.user.userId
    );
    const isManager = ["Admin", "Team Lead"].includes(req.user.role);

    if (
      req.body.status &&
      !isManager &&
      !isAssigned
    ) {
      return res.status(403).json({ error: "Only assigned employees can update the status of their own tasks." });
    }
    
    if (req.body.status === "completed" && !req.body.statusConfirmed) {
      return res.status(400).json({ error: "Status confirmation required to mark as completed." });
    }

    if (req.body.statusNote !== undefined) {
      task.statusNote = req.body.statusNote;
    }

    if (req.body.status && (isAssigned || isManager)) {
      task.status = req.body.status;
    }

    if (isManager) {
      const allowedFields = [
        "title", "description", "assignedTo", "dueDate", "startDate", "priority", "tags", "project"
      ];
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          task[field] = req.body[field];
        }
      });
    }

    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "Admin") {
      filter = {};
    } else if (req.user.role === "team-lead") {
      filter = { createdBy: req.user.userId };
    } else {
      filter = { assignedTo: req.user.userId };
    }

    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.dueDate) filter.dueDate = { $lte: new Date(req.query.dueDate) };
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: "i" };
    }

    let sort = {};
    if (req.query.sortBy === "dueDate") sort.dueDate = 1;
    else sort.createdAt = -1;

    const tasks = await Task.find(filter)
      .populate("createdBy", "name email")
      .sort(sort);

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEmployeeTasks = async (req, res) => {
  try {
    if (!["employee", "team-lead"].includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied: Only employees or team leads can view their assigned tasks." });
    }

    const tasks = await Task.find({ assignedTo: req.user.userId })
      .populate("createdBy", "name email")
      .sort({ dueDate: 1 });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changeEmployeeTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
   
    if (req.user.role !== "employee") {
      return res.status(403).json({ error: "Access denied: Only employees can change their task status." });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
   
    const isAssigned = task.assignedTo.some(
      userId => userId.toString() === req.user.userId
    );
    if (!isAssigned) {
      return res.status(403).json({ error: "You are not assigned to this task." });
    }
   
    const allowedStatuses = ["pending", "in-progress", "completed", "blocked"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated successfully.", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    if (req.user.role !== "Admin" && 
       (req.user.role !== "team-lead" || task.createdBy.toString() !== req.user.userId)) {
      return res.status(403).json({ 
        error: "Unauthorized: Only Admin or the Team Lead who created this task can delete it" 
      });
    }
    
    await Task.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTask, updateTask, getTasks, getEmployeeTasks, changeEmployeeTaskStatus, deleteTask };


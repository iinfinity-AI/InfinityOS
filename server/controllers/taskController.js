const Task = require("../models/Task");
const User = require("../models/User");

// Helper: Check for duplicate title for same user in date range
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
    // Only Admin or Team Lead can create tasks
    if (!["Admin", "Team Lead"].includes(req.user.role)) {
      return res.status(403).json({ error: "Unauthorized: Only Admin or Team Lead can create tasks." });
    }

    const {title,description,status,assignedTo,dueDate,startDate,priority,tags,project} = req.body;

    // Validation: All fields required except tags
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

    // Due date must be >= start date
    if (new Date(dueDate) < new Date(startDate)) {
      return res.status(400).json({ error: "Due date must be after or equal to start date." });
    }

    // No duplicate title for same user within same date range
    const duplicate = await isDuplicateTitle({ title, assignedTo, startDate, dueDate });
    if (duplicate) {
      return res.status(400).json({ error: "Duplicate task title for assigned user(s) in this date range." });
    }

    // Optional: Check if assigned users exist
    const users = await User.find({ _id: { $in: assignedTo } });
    if (users.length !== assignedTo.length) {
      return res.status(400).json({ error: "One or more assigned users do not exist." });
    }

    const task = new Task({title,description,status: status || "pending",assignedTo,dueDate,startDate,priority,tags,project,createdBy: req.user.userId,
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
    if (["Admin", "Team Lead"].includes(req.user.role)) {
      // Optionally, Team Lead can filter by team here
      filter = {};
    } else {
      filter = { assignedTo: req.user.userId };
    }

    // Filtering
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
    // Only allow employees to access their assigned tasks
    if (req.user.role !== "employee") {
      return res.status(403).json({ error: "Access denied: Only employees can view their assigned tasks." });
    }

    // Find tasks where the logged-in employee is assigned
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
    const { id } = req.params; // Task ID from URL
    const { status } = req.body; // New status from request body

    // Only allow employees to change their own assigned task status
    if (req.user.role !== "employee") {
      return res.status(403).json({ error: "Access denied: Only employees can change their task status." });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    // Check if the logged-in employee is assigned to this task
    const isAssigned = task.assignedTo.some(
      userId => userId.toString() === req.user.userId
    );
    if (!isAssigned) {
      return res.status(403).json({ error: "You are not assigned to this task." });
    }

    // Only allow certain statuses (optional, adjust as needed)
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

// Add to exports:
module.exports = { createTask, updateTask, getTasks, getEmployeeTasks, changeEmployeeTaskStatus };


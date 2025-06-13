const Task = require("../models/Task");
const User = require("../models/User");
const Notification = require("../models/Notification");
const { createNotification } = require("./notifyController");

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

    const {title, description, status, assignedTo, dueDate, startDate, priority, tags, project} = req.body;
    
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

    const creator = await User.findById(req.user.userId);

    const notificationPromises = assignedTo.map(async (userId) => {
      try {
        await createNotification(
          userId,
          "task_assigned",
          `${creator.name} assigned you a new task: "${title}"`,
          task._id
        );
      } catch (error) {
        console.error(`Failed to create notification for user ${userId}:`, error);
      }
    });

    await Promise.allSettled(notificationPromises);

    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    console.error("Create task error:", err);
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
    const isManager = ["Admin", "team-lead"].includes(req.user.role);

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

    // Store original values for notification comparison
    const originalAssignedTo = [...task.assignedTo];
    const originalStatus = task.status;

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

    // Send notifications for task updates
    try {
      const updater = await User.findById(req.user.userId);
      
      // Notify if status changed
      if (req.body.status && req.body.status !== originalStatus) {
        const notificationPromises = task.assignedTo.map(async (userId) => {
          if (userId.toString() !== req.user.userId) {
            await createNotification(
              userId,
              "task_updated",
              `${updater.name} updated task "${task.title}" status to ${req.body.status}`,
              task._id
            );
          }
        });
        await Promise.allSettled(notificationPromises);
      }

      // Notify if new users were assigned
      if (req.body.assignedTo && isManager) {
        const newAssignees = task.assignedTo.filter(
          userId => !originalAssignedTo.some(origId => origId.toString() === userId.toString())
        );
        
        const notificationPromises = newAssignees.map(async (userId) => {
          await createNotification(
            userId,
            "task_assigned",
            `${updater.name} assigned you to task: "${task.title}"`,
            task._id
          );
        });
        await Promise.allSettled(notificationPromises);
      }
    } catch (error) {
      console.error("Failed to send update notifications:", error);
    }

    res.status(200).json(task);
  } catch (err) {
    console.error("Update task error:", err);
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
      .populate("assignedTo", "name email")
      .sort(sort);

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err);
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
    console.error("Get employee tasks error:", err);
    res.status(500).json({ error: err.message });
  }
};

const changeEmployeeTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (req.user.role !== "employee" && req.user.role !== "team-lead") {
      return res.status(403).json({ error: "Access denied: Only employees or team leads can change their task status." });
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
   
    const allowedStatuses = ["pending", "in-progress", "completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const oldStatus = task.status;
    task.status = status;
    await task.save();

    // Notify task creator about status change
    try {
      const employee = await User.findById(req.user.userId);
      await createNotification(
        task.createdBy,
        "task_updated",
        `${employee.name} changed task "${task.title}" status from ${oldStatus} to ${status}`,
        task._id
      );
    } catch (error) {
      console.error("Failed to send status change notification:", error);
    }

    res.status(200).json({ message: "Task status updated successfully.", task });
  } catch (err) {
    console.error("Change task status error:", err);
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

    // Notify assigned users about task deletion
    try {
      const deleter = await User.findById(req.user.userId);
      const notificationPromises = task.assignedTo.map(async (userId) => {
        await createNotification(
          userId,
          "task_deleted",
          `${deleter.name} deleted task: "${task.title}"`,
          null
        );
      });
      await Promise.allSettled(notificationPromises);
    } catch (error) {
      console.error("Failed to send deletion notifications:", error);
    }
    
    await Task.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { 
  createTask, 
  updateTask, 
  getTasks, 
  getEmployeeTasks, 
  changeEmployeeTaskStatus, 
  deleteTask 
};


const Notification = require("../models/Notification");
const User = require("../models/User");

// Create a new notification
exports.createNotification = async (userId, type, message, taskId = null) => {
  try {
    const notification = new Notification({
      user: userId,
      type,
      message,
      relatedTask: taskId,
    });

    await notification.save();

    // Send real-time notification if user is online
    const io = require("../server").io;
    const userSockets = require("../server").userSockets;

    if (userSockets[userId]) {
      io.to(userSockets[userId]).emit("notification", notification);
    }

    return notification;
  } catch (error) {
    console.error("Notification creation error:", error);
    throw new Error("Failed to create notification");
  }
};

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error("Mark notification error:", error);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, read: false },
      { read: true }
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Mark all notifications error:", error);
    res.status(500).json({ error: "Failed to mark all notifications as read" });
  }
};

// In your taskController.js file
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      priority,
      startDate,
      dueDate,
      tags,
      project,
    } = req.body;

    // Create the task
    const task = new Task({
      title,
      description,
      assignedTo,
      priority,
      startDate,
      dueDate,
      tags,
      project,
      createdBy: req.user._id,
    });

    await task.save();

    // Create notifications for each assigned user
    if (Array.isArray(assignedTo) && assignedTo.length > 0) {
      const creatorName = req.user.name;

      // Create notifications in parallel
      const notificationPromises = assignedTo.map((userId) =>
        notificationController.createNotification(
          userId,
          "task_assigned",
          `${creatorName} assigned you a new task: ${title}`,
          task._id
        )
      );

      await Promise.all(notificationPromises);
    }

    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

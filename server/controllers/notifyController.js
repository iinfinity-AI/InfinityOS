const Notification = require("../models/Notification");
const User = require("../models/User");

let io;
let userSockets;

exports.initNotification = (socketIO, socketsMap) => {
  io = socketIO;
  userSockets = socketsMap;
};

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
    if (io && userSockets && userSockets[userId]) {
      io.to(userSockets[userId]).emit("notification", {
        _id: notification._id,
        user: userId,
        type,
        message,
        relatedTask: taskId,
        createdAt: notification.createdAt,
        read: false,
      });
    }

    return notification;
  } catch (error) {
    console.error("Notification creation error:", error);
    throw new Error("Failed to create notification");
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user.userId },
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

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.userId, read: false },
      { read: true }
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Mark all notifications error:", error);
    res.status(500).json({ error: "Failed to mark all notifications as read" });
  }
};
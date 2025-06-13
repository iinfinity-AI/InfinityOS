const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notifyController');
const protect  = require("../middilware/authMiddleware");

router.get('/', protect, notificationController.getUserNotifications);
router.patch('/:id/read', protect, notificationController.markAsRead);
router.post('/mark-all-read', protect, notificationController.markAllAsRead);

module.exports = router;
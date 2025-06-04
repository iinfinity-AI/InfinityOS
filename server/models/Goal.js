const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Goal title is required']
  },
  description: {
    type: String,
    required: [true, 'Goal description is required']
  },
  deadline: {
    type: Date,
    required: [true, 'Goal deadline is required']
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);
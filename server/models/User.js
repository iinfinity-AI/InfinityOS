const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,     
  },
  email: {
    type: String,
    required: true,  
    unique: true,    
  },
  password: {
    type: String,
    required: true, 
  },
  phone: {
    type: String,
    required: false, 
    trim: true,
  },
  role: {
    type: String,
    enum: ["Admin", "employee", "team-lead"],
    default: "employee",
  },
  profilePicture: {
    type: String,
    required: false
  },
    lastLogins: {
      type: [Date],
      default: []
    },

    currentStreak: {
      type: Number,
      default: 0
    },

    bestStreak: {
      type: Number,
      default: 0
    },

    lastLoginDate: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
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
    enum: ["admin", "employee", "team-lead"],
    default: "employee",
  },
}, {
  timestamps: true 
});

module.exports = mongoose.model("User", userSchema);

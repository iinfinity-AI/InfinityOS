const Goal = require("../models/Goal");
const mongoose = require("mongoose"); 


const createGoal = async (req, res) => {
  try {
    
    const { title, description, deadline } = req.body;

    if (!title || !description || !deadline) {
      return res
        .status(400)
        .json({ error: "Please provide title, description, and deadline" });
    }

    if (new Date(deadline).toString() === "Invalid Date") {
      return res.status(400).json({ error: "Invalid date format for deadline" });
    }


    const goal = await Goal.create({
      title,
      description,
      deadline: new Date(deadline),
      status: "pending",
      createdBy: req.user.userId,
    });

    res.status(201).json(goal);
  } catch (error) {
    console.error("Error creating goal:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};


const getGoals = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { createdBy: req.user.userId };

    if (status && ['pending', 'completed'].includes(status)) {
      filter.status = status;
    }
    
    const goals = await Goal.find(filter)
      .sort({ deadline: 1 })
      .populate('createdBy', 'name email'); 

    res.status(200).json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getGoalById = async (req, res) => {
  try {
    const goalId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(goalId)) {
      return res.status(400).json({ error: "Invalid goal ID" });
    }

    const goal = await Goal.findById(goalId);

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    if (goal.createdBy.toString() !== req.user.userId.toString()) { // Changed from _id to userId
      return res
        .status(403)
        .json({ error: "Not authorized to access this goal" });
    }

    res.status(200).json(goal);
  } catch (error) {
    console.error("Error fetching goal:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update goal with better validation
const updateGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const { title, description, deadline, status } = req.body;
    const updates = {};

    // Only update fields that are provided
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (deadline) {
      if (new Date(deadline).toString() === "Invalid Date") {
        return res.status(400).json({ error: "Invalid date format for deadline" });
      }
      updates.deadline = new Date(deadline);
    }
    if (status && ['pending', 'completed'].includes(status)) {
      updates.status = status;
    } else if (status) {
      return res.status(400).json({ error: "Status must be 'pending' or 'completed'" });
    }

    if (!mongoose.Types.ObjectId.isValid(goalId)) {
      return res.status(400).json({ error: "Invalid goal ID" });
    }

    const goal = await Goal.findById(goalId);

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    if (goal.createdBy.toString() !== req.user.userId.toString()) { // Changed from _id to userId
      return res
        .status(403)
        .json({ error: "Not authorized to update this goal" });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      goalId,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedGoal);
  } catch (error) {
    console.error("Error updating goal:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const goalId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(goalId)) {
      return res.status(400).json({ error: "Invalid goal ID" });
    }

    const goal = await Goal.findById(goalId);

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    if (goal.createdBy.toString() !== req.user.userId.toString()) { // Changed from _id to userId
      return res
        .status(403)
        .json({ error: "Not authorized to delete this goal" });
    }

    await Goal.findByIdAndDelete(goalId);

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
};

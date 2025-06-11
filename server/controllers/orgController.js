const User = require("../models/User");
const Mood = require("../models/Mood");

// Function to calculate average mood
const calculateAverageMood = async (userId) => {
  try {
    const moods = await Mood.find({ user: userId });
    if (!moods || moods.length === 0) return "No data";

    const sum = moods.reduce((total, mood) => total + mood.rating, 0);
    return (sum / moods.length).toFixed(1);
  } catch (error) {
    console.error("Error calculating mood average:", error);
    return "No data";
  }
};

// Get all users categorized by role
const getAllUsers = async (req, res) => {
  try {
    // Get all users with their details
    const allUsers = await User.find().select(
      "name email role profilePicture reportsTo"
    );

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    // Enhance user data with mood averages
    const enhancedUsers = await Promise.all(
      allUsers.map(async (user) => ({
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        avatar: user.profilePicture,
        moodAverage: await calculateAverageMood(user._id),
        reportsTo: user.reportsTo,
      }))
    );

    // Categorize users by role
    const categorizedUsers = {
      admins: enhancedUsers.filter(
        (user) => user.role.toLowerCase() === "admin"
      ),
      teamLeads: enhancedUsers.filter(
        (user) => user.role.toLowerCase() === "team-lead"
      ),
      employees: enhancedUsers.filter(
        (user) => user.role.toLowerCase() === "employee"
      ),
    };

    res.json(categorizedUsers);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllUsers,
};

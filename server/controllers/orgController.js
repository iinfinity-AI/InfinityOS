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

// Get organization chart data - hierarchical view
const getOrgChart = async (req, res) => {
  try {
    // Find the top-level user (could be Admin without a manager)
    const topUser = await User.findOne({ reportsTo: null }).select(
      "name email role profilePicture"
    );

    if (!topUser) {
      return res
        .status(404)
        .json({ error: "No top-level user found in the organization" });
    }

    // Build the org chart recursively
    const buildOrgChart = async (user) => {
      const moodAverage = await calculateAverageMood(user._id);

      const directReports = await User.find({ reportsTo: user._id }).select(
        "name email role profilePicture"
      );

      const node = {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        avatar: user.profilePicture,
        moodAverage: moodAverage || "No data",
      };

      if (directReports.length > 0) {
        node.children = await Promise.all(
          directReports.map((report) => buildOrgChart(report))
        );
      }

      return node;
    };

    const orgChart = await buildOrgChart(topUser);
    res.json(orgChart);
  } catch (error) {
    console.error("Error fetching org chart:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get user's direct team (colleagues and manager)
const getUserTeam = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the current user
    const currentUser = await User.findById(userId).select(
      "name email role profilePicture reportsTo"
    );

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    let result = {
      currentUser: {
        id: currentUser._id,
        name: currentUser.name,
        role: currentUser.role,
        email: currentUser.email,
        avatar: currentUser.profilePicture,
        moodAverage: await calculateAverageMood(currentUser._id),
      },
    };

    // Get manager if exists
    if (currentUser.reportsTo) {
      const manager = await User.findById(currentUser.reportsTo).select(
        "name email role profilePicture"
      );

      if (manager) {
        result.manager = {
          id: manager._id,
          name: manager.name,
          role: manager.role,
          email: manager.email,
          avatar: manager.profilePicture,
          moodAverage: await calculateAverageMood(manager._id),
        };
      }
    }

    // Get colleagues (people reporting to the same manager)
    if (currentUser.reportsTo) {
      const colleagues = await User.find({
        reportsTo: currentUser.reportsTo,
        _id: { $ne: userId }, // Exclude current user
      }).select("name email role profilePicture");

      if (colleagues && colleagues.length > 0) {
        result.colleagues = await Promise.all(
          colleagues.map(async (colleague) => ({
            id: colleague._id,
            name: colleague.name,
            role: colleague.role,
            email: colleague.email,
            avatar: colleague.profilePicture,
            moodAverage: await calculateAverageMood(colleague._id),
          }))
        );
      }
    }

    // Get direct reports if any
    const directReports = await User.find({
      reportsTo: userId,
    }).select("name email role profilePicture");

    if (directReports && directReports.length > 0) {
      result.directReports = await Promise.all(
        directReports.map(async (report) => ({
          id: report._id,
          name: report.name,
          role: report.role,
          email: report.email,
          avatar: report.profilePicture,
          moodAverage: await calculateAverageMood(report._id),
        }))
      );
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching user team:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  getOrgChart,
  getUserTeam,
};

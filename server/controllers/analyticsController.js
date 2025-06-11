const Task = require("../models/Task");
const Mood = require("../models/Mood");
const User = require("../models/User");

/**
 * Get user analytics and statistics
 */
const getUserStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get task statistics
    const tasks = await Task.find({ assignedTo: userId });
    const completedTasks = tasks.filter((task) => task.status === "completed");
    const tasksCompletedPercent =
      tasks.length > 0
        ? Math.round((completedTasks.length / tasks.length) * 100)
        : 0;

    // Get mood statistics
    const moods = await Mood.find({ user: userId }).sort({ createdAt: -1 });
    let averageMood = 0;

    if (moods.length > 0) {
      const moodValues = moods.map((m) => {
        if (m.rating) return m.rating;

        // Convert mood strings to numeric values
        switch (m.mood) {
          case "happy":
            return 5;
          case "satisfied":
            return 4;
          case "neutral":
            return 3;
          case "frustrated":
            return 2;
          case "sad":
          case "stressed":
            return 1;
          default:
            return 3;
        }
      });

      averageMood =
        moodValues.reduce((sum, val) => sum + val, 0) / moodValues.length;
      averageMood = Math.round(averageMood * 10) / 10; // Round to 1 decimal place
    }

    // Get login streak (improved version)
    const user = await User.findById(userId);
    let loginStreak = user?.currentStreak || 0; // Use the tracked streak directly

    // If we need to calculate from scratch (fallback)
    if (!loginStreak && user && user.lastLogins && user.lastLogins.length > 0) {
      // Sort login dates in descending order
      const sortedLogins = [...user.lastLogins].sort(
        (a, b) => new Date(b) - new Date(a)
      );

      // Normalize dates to start of day for accurate comparison
      const normalizedLogins = sortedLogins.map((date) => {
        const normalized = new Date(date);
        normalized.setHours(0, 0, 0, 0);
        return normalized.getTime();
      });

      // Remove duplicate dates (multiple logins on same day)
      const uniqueDates = [...new Set(normalizedLogins)];

      // Calculate streak
      let streak = 1;
      const oneDayMs = 24 * 60 * 60 * 1000;

      for (let i = 1; i < uniqueDates.length; i++) {
        const current = uniqueDates[i - 1];
        const previous = uniqueDates[i];

        // Check if logins are on consecutive days
        const diffDays = Math.round((current - previous) / oneDayMs);

        if (diffDays === 1) {
          streak++;
        } else if (diffDays > 1) {
          break;
        }
      }

      loginStreak = streak;
    }

    // Get best streak from the user record
    const bestStreak = user?.bestStreak || loginStreak;

    // Get task breakdown by status
    const pendingTasks = tasks.filter(
      (task) => task.status === "pending"
    ).length;
    const inProgressTasks = tasks.filter(
      (task) => task.status === "in-progress"
    ).length;
    const blockedTasks = tasks.filter(
      (task) => task.status === "blocked"
    ).length;

    // Get priority breakdown
    const highPriorityTasks = tasks.filter(
      (task) => task.priority === "High" || task.priority === "Critical"
    ).length;

    // Get upcoming deadline tasks (due in next 3 days)
    const now = new Date();
    const threeDaysFromNow = new Date(now);
    threeDaysFromNow.setDate(now.getDate() + 3);

    const upcomingDeadlines = tasks.filter((task) => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      return (
        dueDate >= now &&
        dueDate <= threeDaysFromNow &&
        task.status !== "completed"
      );
    }).length;

    // Response with all stats
    res.status(200).json({
      tasksCompletedPercent,
      averageMood,
      loginStreak,
      bestStreak,
      taskBreakdown: {
        completed: completedTasks.length,
        pending: pendingTasks,
        inProgress: inProgressTasks,
        blocked: blockedTasks,
        total: tasks.length,
      },
      highPriorityTasks,
      upcomingDeadlines,
      latestMood: moods.length > 0 ? moods[0].mood : null,
    });
  } catch (err) {
    console.error("Error fetching user stats:", err);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
};

/**
 * Get team analytics for team leads
 */
const getTeamStats = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "team-lead") {
      return res.status(403).json({
        error: "Unauthorized: Only admins and team leads can access team stats",
      });
    }

    const userId = req.user.userId;
    const user = await User.findById(userId);

    // Get users in the same department (for team leads)
    const teamQuery =
      req.user.role === "admin" ? {} : { department: user.department };

    const teamMembers = await User.find({
      ...teamQuery,
      _id: { $ne: userId }, // Exclude current user
      role: { $in: ["employee", "team-lead"] },
    });

    const teamMemberIds = teamMembers.map((member) => member._id);

    // Get tasks assigned to team
    const tasks = await Task.find({
      assignedTo: { $in: teamMemberIds },
    });

    // Calculate team completion rate
    const completedTasks = tasks.filter((task) => task.status === "completed");
    const teamCompletionRate =
      tasks.length > 0
        ? Math.round((completedTasks.length / tasks.length) * 100)
        : 0;

    // Get team mood average
    const moods = await Mood.find({
      user: { $in: teamMemberIds },
    }).sort({ createdAt: -1 });

    let teamMoodAverage = 0;
    if (moods.length > 0) {
      const moodValues = moods.map((m) => {
        if (m.rating) return m.rating;

        switch (m.mood) {
          case "happy":
            return 5;
          case "satisfied":
            return 4;
          case "neutral":
            return 3;
          case "frustrated":
            return 2;
          case "sad":
          case "stressed":
            return 1;
          default:
            return 3;
        }
      });

      teamMoodAverage =
        moodValues.reduce((sum, val) => sum + val, 0) / moodValues.length;
      teamMoodAverage = Math.round(teamMoodAverage * 10) / 10;
    }

    // Get team login streak stats
    const teamStreakStats = {
      averageStreak: 0,
      maxStreak: 0,
      totalDailyActive: 0,
    };

    if (teamMembers.length > 0) {
      const streaks = teamMembers.map((member) => member.currentStreak || 0);
      teamStreakStats.averageStreak = Math.round(
        streaks.reduce((sum, streak) => sum + streak, 0) / streaks.length
      );
      teamStreakStats.maxStreak = Math.max(...streaks);
      teamStreakStats.totalDailyActive = streaks.filter(
        (streak) => streak > 0
      ).length;
    }

    // Get task distribution
    const memberTaskDistribution = await Promise.all(
      teamMembers.map(async (member) => {
        const memberTasks = tasks.filter((task) =>
          task.assignedTo.some(
            (assignee) => assignee.toString() === member._id.toString()
          )
        );

        const completed = memberTasks.filter(
          (task) => task.status === "completed"
        ).length;

        return {
          name: member.name,
          id: member._id,
          totalTasks: memberTasks.length,
          completedTasks: completed,
          completionRate:
            memberTasks.length > 0
              ? Math.round((completed / memberTasks.length) * 100)
              : 0,
          currentStreak: member.currentStreak || 0,
        };
      })
    );

    // Response with team stats
    res.status(200).json({
      teamSize: teamMembers.length,
      teamCompletionRate,
      teamMoodAverage,
      teamStreakStats,
      memberTaskDistribution,
      taskBreakdown: {
        completed: completedTasks.length,
        pending: tasks.filter((task) => task.status === "pending").length,
        inProgress: tasks.filter((task) => task.status === "in-progress")
          .length,
        blocked: tasks.filter((task) => task.status === "blocked").length,
        total: tasks.length,
      },
    });
  } catch (err) {
    console.error("Error fetching team stats:", err);
    res.status(500).json({ error: "Failed to fetch team statistics" });
  }
};

module.exports = { getUserStats, getTeamStats };

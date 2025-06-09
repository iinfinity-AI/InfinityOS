import React, { useState, useEffect } from "react";
import {
  FaTasks,
  FaSmile,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaClock,
  FaChartPie,
} from "react-icons/fa";
import API from "../../services/api";

const AnalyticsCards = () => {
  const [stats, setStats] = useState({
    tasksCompletedPercent: 0,
    averageMood: 0,
    loginStreak: 0,
    taskBreakdown: {
      completed: 0,
      pending: 0,
      inProgress: 0,
      blocked: 0,
      total: 0,
    },
    highPriorityTasks: 0,
    upcomingDeadlines: 0,
    latestMood: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await API.get("/status");
        setStats(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load analytics data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getMoodEmoji = (mood) => {
    if (!mood) return "🙂";
    if (mood === "happy") return "😊";
    if (mood === "neutral") return "😐";
    if (mood === "sad") return "😢";
    if (mood === "stressed") return "😠";
    if (mood === "frustrated") return "😣";
    if (mood === "satisfied") return "😌";
    return "🙂";
  };

  const getMoodColor = (average) => {
    if (average >= 4.5) return "from-green-400 to-green-600";
    if (average >= 3.5) return "from-green-300 to-green-500";
    if (average >= 2.5) return "from-yellow-400 to-yellow-600";
    if (average >= 1.5) return "from-orange-400 to-orange-600";
    return "from-red-400 to-red-600";
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 h-32"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Task Completion Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-blue-100 mb-1">Task Completion</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">
                {stats.tasksCompletedPercent}%
              </span>
              <span className="text-blue-200 ml-1">completed</span>
            </div>
          </div>
          <div className="p-2 bg-blue-400 bg-opacity-30 rounded-lg">
            <FaTasks className="text-xl" />
          </div>
        </div>
        <div className="mt-4 bg-blue-200 bg-opacity-30 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${stats.tasksCompletedPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Mood Score Card */}
      <div
        className={`bg-gradient-to-br ${getMoodColor(
          stats.averageMood
        )} text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-green-100 mb-1">Mood Score</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">
                {stats.averageMood.toFixed(1)}
              </span>
              <span className="text-green-200 ml-1">/ 5</span>
            </div>
          </div>
          <div className="p-2 bg-green-400 bg-opacity-30 rounded-lg">
            <span className="text-2xl">{getMoodEmoji(stats.latestMood)}</span>
          </div>
        </div>
        <div className="mt-4 bg-green-200 bg-opacity-30 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${(stats.averageMood / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Login Streak Card */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-purple-100 mb-1">Login Streak</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">{stats.loginStreak}</span>
              <span className="text-purple-200 ml-1">days</span>
            </div>
          </div>
          <div className="p-2 bg-purple-400 bg-opacity-30 rounded-lg">
            <FaCalendarCheck className="text-xl" />
          </div>
        </div>
        <p className="text-xs text-purple-200 mt-4">Keep the streak going!</p>
      </div>

      {/* High Priority Tasks */}
      <div className="bg-gradient-to-br from-red-500 to-red-700 text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-red-100 mb-1">High Priority</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">
                {stats.highPriorityTasks}
              </span>
              <span className="text-red-200 ml-1">tasks</span>
            </div>
          </div>
          <div className="p-2 bg-red-400 bg-opacity-30 rounded-lg">
            <FaExclamationTriangle className="text-xl" />
          </div>
        </div>
        <p className="text-xs text-red-200 mt-4">
          {stats.highPriorityTasks > 0
            ? "These tasks need immediate attention!"
            : "Great job! No high priority tasks."}
        </p>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-amber-100 mb-1">Upcoming Deadlines</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">
                {stats.upcomingDeadlines}
              </span>
              <span className="text-amber-200 ml-1">tasks</span>
            </div>
          </div>
          <div className="p-2 bg-amber-400 bg-opacity-30 rounded-lg">
            <FaClock className="text-xl" />
          </div>
        </div>
        <p className="text-xs text-amber-200 mt-4">Due in the next 3 days</p>
      </div>

      {/* Task Breakdown */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-teal-100 mb-1">Task Breakdown</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">
                {stats.taskBreakdown.total}
              </span>
              <span className="text-teal-200 ml-1">total tasks</span>
            </div>
          </div>
          <div className="p-2 bg-teal-400 bg-opacity-30 rounded-lg">
            <FaChartPie className="text-xl" />
          </div>
        </div>
        <div className="flex text-xs mt-4 justify-between">
          <span className="text-teal-200">
            {stats.taskBreakdown.completed} completed
          </span>
          <span className="text-teal-200">
            {stats.taskBreakdown.inProgress} in progress
          </span>
          <span className="text-teal-200">
            {stats.taskBreakdown.pending} pending
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCards;

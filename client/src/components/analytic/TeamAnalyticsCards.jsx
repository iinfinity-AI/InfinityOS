import React, { useState, useEffect } from "react";
import { FaUsers, FaTasks, FaSmile, FaChartLine } from "react-icons/fa";
import API from "../../services/api";

const TeamAnalyticsCards = () => {
  const [stats, setStats] = useState({
    teamSize: 0,
    teamCompletionRate: 0,
    teamMoodAverage: 0,
    memberTaskDistribution: [],
    taskBreakdown: {
      completed: 0,
      pending: 0,
      inProgress: 0,
      blocked: 0,
      total: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamStats = async () => {
      try {
        setLoading(true);
        const response = await API.get("/status/team");
        setStats(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching team stats:", err);
        setError("Failed to load team analytics data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamStats();
  }, []);

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
        {[1, 2, 3, 4].map((i) => (
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
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Team Analytics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Team Size */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-blue-100 mb-1">Team Size</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{stats.teamSize}</span>
                <span className="text-blue-200 ml-1">members</span>
              </div>
            </div>
            <div className="p-2 bg-blue-400 bg-opacity-30 rounded-lg">
              <FaUsers className="text-xl" />
            </div>
          </div>
        </div>

        {/* Team Completion Rate */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-emerald-100 mb-1">Completion Rate</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{stats.teamCompletionRate}%</span>
                <span className="text-emerald-200 ml-1">tasks</span>
              </div>
            </div>
            <div className="p-2 bg-emerald-400 bg-opacity-30 rounded-lg">
              <FaTasks className="text-xl" />
            </div>
          </div>
          <div className="mt-4 bg-emerald-200 bg-opacity-30 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${stats.teamCompletionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Team Mood Average */}
        <div className={`bg-gradient-to-br ${getMoodColor(stats.teamMoodAverage)} text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-green-100 mb-1">Team Mood</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{stats.teamMoodAverage.toFixed(1)}</span>
                <span className="text-green-200 ml-1">/ 5</span>
              </div>
            </div>
            <div className="p-2 bg-green-400 bg-opacity-30 rounded-lg">
              <FaSmile className="text-xl" />
            </div>
          </div>
          <div className="mt-4 bg-green-200 bg-opacity-30 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${(stats.teamMoodAverage / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Task Total */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-purple-100 mb-1">Total Tasks</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{stats.taskBreakdown.total}</span>
                <span className="text-purple-200 ml-1">assigned</span>
              </div>
            </div>
            <div className="p-2 bg-purple-400 bg-opacity-30 rounded-lg">
              <FaChartLine className="text-xl" />
            </div>
          </div>
          <div className="flex text-xs mt-4 justify-between">
            <span className="text-purple-200">
              {stats.taskBreakdown.completed} completed
            </span>
            <span className="text-purple-200">
              {stats.taskBreakdown.pending + stats.taskBreakdown.inProgress} in progress
            </span>
          </div>
        </div>
      </div>

      {/* Team Member Performance */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Team Member Performance</h3>
        
        {stats.memberTaskDistribution.length > 0 ? (
          <div className="space-y-4">
            {stats.memberTaskDistribution.map((member) => (
              <div key={member.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-800">{member.name}</span>
                  <span className="font-medium text-blue-600">{member.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      member.completionRate >= 75 ? "bg-green-500" :
                      member.completionRate >= 50 ? "bg-yellow-500" :
                      member.completionRate >= 25 ? "bg-orange-500" : "bg-red-500"
                    }`}
                    style={{ width: `${member.completionRate}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>{member.completedTasks} completed</span>
                  <span>{member.totalTasks} total tasks</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No team member data available.</p>
        )}
      </div>
    </div>
  );
};

export default TeamAnalyticsCards;
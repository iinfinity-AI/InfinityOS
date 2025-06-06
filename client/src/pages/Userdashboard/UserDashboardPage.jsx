import React, { useState, useEffect } from "react";
import SideBar from "../../components/userdashboard/SideBar";
import TopBar from "../../components/userdashboard/TopBar";
import TaskFilterBar from "../../components/userdashboard/taskboard/TaskFilterBar";
import MoodcheckIN from "../../components/userdashboard/mood/MoodCheckIn";
import API from "../../services/api";
import { FaTasks, FaSmile, FaCheckCircle, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GoalsPage from "../Goal/GoalsPage";
import OrgChart from "../../components/OrgChart/OrgChart";

const UserDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    latestMood: "",
    moodAverage: 0,
    completionRate: 0,
  });

  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/tasks");
        const allTasks = res.data;

        const currentUserId = user.id;
        console.log("Current User ID:", currentUserId);

        const filteredTasks = allTasks.filter((task) => {
          if (Array.isArray(task.assignedTo)) {
            return task.assignedTo.some((assignedUser) => {
              if (typeof assignedUser === "string") {
                return assignedUser === currentUserId;
              }

              if (assignedUser && assignedUser._id) {
                return String(assignedUser._id) === String(currentUserId);
              }

              return false;
            });
          }

          if (typeof task.assignedTo === "string") {
            return task.assignedTo === currentUserId;
          }

          if (task.assignedTo && task.assignedTo._id) {
            return String(task.assignedTo._id) === String(currentUserId);
          }

          return false;
        });

        console.log(
          `Found ${filteredTasks.length} tasks assigned to user ${currentUserId}`
        );

        setMyTasks(filteredTasks);

        const completedTasks = filteredTasks.filter(
          (task) => task.status === "completed"
        );
        const completionRate =
          filteredTasks.length > 0
            ? Math.round((completedTasks.length / filteredTasks.length) * 100)
            : 0;

        setStats((prevStats) => ({
          ...prevStats,
          totalTasks: filteredTasks.length,
          completedTasks: completedTasks.length,
          completionRate,
        }));

        const moodsRes = await API.get("/allmood");
        const moods = moodsRes.data || [];
        const myMoods = moods.filter((m) => m.user && m.user._id === user.id);

        let latestMood = "";
        if (myMoods.length > 0) {
          myMoods.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          latestMood = myMoods[0].mood;
        }

        let moodAverage = 0;
        if (myMoods.length > 0) {
          const moodValues = myMoods.map((m) => {
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

          moodAverage =
            moodValues.reduce((sum, val) => sum + val, 0) / moodValues.length;
          moodAverage = Math.round(moodAverage * 10) / 10;
        }

        setStats((prevStats) => ({
          ...prevStats,
          latestMood,
          moodAverage,
        }));
      } catch (error) {
        console.error("Error fetching stats:", error);
        setMyTasks([]);
        setStats({
          totalTasks: 0,
          completedTasks: 0,
          latestMood: "",
          moodAverage: 0,
          completionRate: 0,
        });
      }
    };

    if (selectedTab === "dashboard") fetchStats();
  }, [selectedTab, user._id]);

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

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  const TaskCard = ({ task }) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      blocked: "bg-red-100 text-red-800 border-red-200",
    };

    const priorityColors = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-blue-100 text-blue-800",
      High: "bg-orange-100 text-orange-800",
      Critical: "bg-red-100 text-red-800",
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-semibold text-gray-800 mb-1">
            {task.title}
          </h4>
          <div
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              priorityColors[task.priority] || "bg-gray-100"
            }`}
          >
            {task.priority}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>

        <div className="flex justify-between items-center">
          <div
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              statusColors[task.status] || "bg-gray-100"
            }`}
          >
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </div>

          <div className="text-xs text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </div>
      </div>
    );
  };

  // Debugging
  console.log("MyTasks length:", myTasks.length);
  console.log("Stats:", stats);

  return (
    <div className="flex min-h-screen bg-[#f0f4fc]">
      <SideBar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isCollapsed={isSidebarCollapsed}
      />

      <div className="flex-1 flex flex-col overflow-x-hidden">
        <TopBar toggleSidebar={toggleSidebar} />
        <div className="p-6 mt-4 mx-4 bg-[#f0f4fc] flex-1 overflow-y-auto rounded-lg">
          {selectedTab === "dashboard" && (
            <div>
              <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1f2937] mb-2">
                    Welcome back, {user?.name?.split(" ")[0] || "User"}!
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Here's a quick overview of your tasks and activity.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mt-4 md:mt-0">
                  <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow mb-2 md:mb-0">
                    Role: {user?.role}
                  </span>
                  <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold shadow mb-2 md:mb-0">
                    {new Date().toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => navigate("/profile")}
                    className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition ml-0 md:ml-2"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Stats Grid - Enhanced version with 4 cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Total Tasks Card */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
                  <FaTasks className="text-3xl mb-2" />
                  <div className="text-3xl font-bold">{stats.totalTasks}</div>
                  <div className="text-sm mt-1">Assigned Tasks</div>
                </div>

                {/* Completed Tasks Card */}
                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
                  <FaCheckCircle className="text-3xl mb-2" />
                  <div className="text-3xl font-bold">
                    {stats.completedTasks}
                  </div>
                  <div className="text-sm mt-1">Completed Tasks</div>
                </div>

                {/* Completion Rate Card */}
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
                  <FaChartLine className="text-3xl mb-2" />
                  <div className="text-3xl font-bold">
                    {stats.completionRate}%
                  </div>
                  <div className="text-sm mt-1">Completion Rate</div>
                </div>

                {/* Mood Average Card */}
                <div
                  className={`bg-gradient-to-br ${getMoodColor(
                    stats.moodAverage
                  )} text-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300`}
                >
                  <FaSmile className="text-3xl mb-2" />
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-2">
                      {stats.moodAverage ? stats.moodAverage.toFixed(1) : "-"}
                    </div>
                    <div className="text-2xl">
                      {getMoodEmoji(stats.latestMood)}
                    </div>
                  </div>
                  <div className="text-sm mt-1">Mood Average</div>
                </div>
              </div>

              {/* You can add a task summary or mood history section here */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Your Performance
                </h3>
                <div className="flex flex-col space-y-4">
                  {/* Task Progress Bar */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Task Completion
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {stats.completionRate}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${stats.completionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Mood Level Bar */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Mood Level
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {stats.moodAverage
                          ? `${(stats.moodAverage / 5) * 100}%`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full bg-gradient-to-r ${
                          stats.moodAverage >= 3.5
                            ? "from-green-400 to-green-500"
                            : stats.moodAverage >= 2.5
                            ? "from-yellow-400 to-yellow-500"
                            : "from-red-400 to-red-500"
                        }`}
                        style={{
                          width: `${
                            stats.moodAverage
                              ? (stats.moodAverage / 5) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Tasks Section */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Your Recent Tasks
                  </h3>
                  <button
                    onClick={() => setSelectedTab("taskboard")}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>

                {myTasks && myTasks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {myTasks.slice(0, 4).map((task) => (
                      <TaskCard key={task._id} task={task} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No tasks assigned to you yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {selectedTab === "taskboard" && (
            <div className="space-y-6 mt-4">
              <TaskFilterBar />
            </div>
          )}

          {selectedTab === "mood" && (
            <div className="space-y-6 mt-4">
              <MoodcheckIN />
            </div>
          )}

          {selectedTab === "goals" && (
            <div className="space-y-6 mt-4">
              <GoalsPage />
            </div>
          )}

          {selectedTab === "orgchart" && (
            <div className="space-y-6 mt-4">
              <OrgChart />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;

import React, { useState, useEffect } from "react";
import SideBar from "../../components/userdashboard/SideBar";
import TopBar from "../../components/userdashboard/TopBar";
import TaskFilterBar from "../../components/userdashboard/taskboard/TaskFilterBar";
import MoodcheckIN from "../../components/userdashboard/mood/MoodCheckIn";
import API from "../../services/api";
import { FaTasks, FaSmile, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GoalsPage from "../Goal/GoalsPage";

const UserDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();


  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    latestMood: "",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {

        const res = await API.get("/tasks");
        const allTasks = res.data || [];
        const myTasks = allTasks.filter((task) => {
          if (Array.isArray(task.assignedTo)) {
            return task.assignedTo.some(
              (a) =>
                (typeof a === "string" && a === user._id) ||
                (a && a._id && String(a._id) === String(user._id))
            );
          }
          return (
            task.assignedTo === user._id ||
            (task.assignedTo &&
              task.assignedTo._id &&
              String(task.assignedTo._id) === String(user._id))
          );
        });
        const completedTasks = myTasks.filter(
          (task) => task.status === "completed"
        );



        const moodsRes = await API.get("/allmood");
        const moods = moodsRes.data || [];
        const myMoods = moods.filter((m) => m.user && m.user._id === user._id);
        let latestMood = "";
        if (myMoods.length > 0) {
          myMoods.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          latestMood = myMoods[0].mood;
        }

        setStats({
          totalTasks: myTasks.length,
          completedTasks: completedTasks.length,
          latestMood,
        });
      } catch {
        setStats({ totalTasks: 0, completedTasks: 0, latestMood: "" });
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

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

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
                    Here’s a quick overview of your tasks and activity.
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

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
                  <FaTasks className="text-3xl mb-2" />
                  <div className="text-3xl font-bold">{stats.totalTasks}</div>
                  <div className="text-sm mt-1">Total Tasks</div>
                </div>
                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
                  <FaCheckCircle className="text-3xl mb-2" />
                  <div className="text-3xl font-bold">{stats.completedTasks}</div>
                  <div className="text-sm mt-1">Completed Tasks</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
                  <FaSmile className="text-3xl mb-2" />
                  <div className="text-3xl font-bold">{getMoodEmoji(stats.latestMood)}</div>
                  <div className="text-sm mt-1">Latest Mood</div>
                </div>
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
              <GoalsPage/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;

import React, { useState, useEffect } from "react";
import SideBar from "../../components/userdashboard/SideBar";
import TopBar from "../../components/userdashboard/TopBar";
import TaskFilterBar from "../../components/userdashboard/taskboard/TaskFilterBar";
import MoodcheckIN from "../../components/userdashboard/mood/MoodCheckIn";
import API from "../../services/api";
import {
  FaTasks,
  FaSmile,
  FaCheckCircle,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

import NewTask from "../../components/task/dashboard";
import GetAllMoods from "../../components/moods/getallMoods";
import GoalsPage from "../Goal/GoalsPage";
import TeamAnalyticsCards from "../../components/analytic/TeamAnalyticsCards";
import AnalyticsCards from "../../components/analytic/AnalyticCard";

const TeamLeadDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);


  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    teamMembers: 0,
    tasksAssigned: 0,
    completionRate: 0,
    latestMood: "",
    moodAverage: 0,
  });

  const [teamTasks, setTeamTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const tasksRes = await API.get("/tasks");
        const allTasks = tasksRes.data;

        const usersRes = await API.get("/users");
        const allUsers = usersRes.data.users || usersRes.data || [];

        const myTeamMembers = allUsers.filter(
          (u) => u.role === "employee" && u.department === user.department
        );

        setTeamMembers(myTeamMembers);

        const createdTasks = allTasks.filter(
          (task) => task.createdBy && task.createdBy === user.id
        );

        const teamMemberIds = myTeamMembers.map((m) => m._id);
        const assignedTasks = allTasks.filter((task) => {
          if (!task.assignedTo) return false;

          if (Array.isArray(task.assignedTo)) {
            return task.assignedTo.some((assignee) => {
              if (typeof assignee === "string") {
                return teamMemberIds.includes(assignee);
              }
              return (
                assignee && assignee._id && teamMemberIds.includes(assignee._id)
              );
            });
          }

          return false;
        });

        const completedTasks = assignedTasks.filter(
          (task) => task.status === "completed"
        );
        const completionRate =
          assignedTasks.length > 0
            ? Math.round((completedTasks.length / assignedTasks.length) * 100)
            : 0;

        setTeamTasks(assignedTasks);

        setStats((prev) => ({
          ...prev,
          totalTasks: assignedTasks.length,
          completedTasks: completedTasks.length,
          teamMembers: myTeamMembers.length,
          tasksAssigned: createdTasks.length,
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

        setStats((prev) => ({
          ...prev,
          latestMood,
          moodAverage,
        }));
      } catch (error) {
        console.error("Error fetching team stats:", error);
        setTeamTasks([]);
        setTeamMembers([]);
        setStats({
          totalTasks: 0,
          completedTasks: 0,
          teamMembers: 0,
          tasksAssigned: 0,
          completionRate: 0,
          latestMood: "",
          moodAverage: 0,
        });
      }
    };

    if (selectedTab === "dashboard") fetchStats();
  }, [selectedTab, user.id, user.department]);

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

  const TeamMemberCard = ({ member }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
          {member.name.charAt(0)}
        </div>
        <div className="ml-3">
          <h4 className="text-md font-semibold text-gray-800">{member.name}</h4>
          <p className="text-xs text-gray-500">{member.email}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#E1EAFE]">
      <SideBar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isCollapsed={isSidebarCollapsed}
      />

      <div className="flex-1 flex flex-col overflow-x-hidden">
        <TopBar toggleSidebar={toggleSidebar} />

        <div className="p-6 mt-4 mx-4 bg-[#E1EAFE] flex-1 overflow-y-auto rounded-lg">
          {selectedTab === "dashboard" && (
            <div>
              <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1f2937] mb-2">
                    Welcome back, Team Lead{" "}
                    {user?.name?.split(" ")[0] || "User"}!
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Here's a quick overview of your team's performance and
                    tasks.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mt-4 md:mt-0">
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
                  <FaUsers className="text-3xl mb-2" />
                  <div className="text-3xl font-bold">{stats.teamMembers}</div>
                  <div className="text-sm mt-1">Team Members</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
                  <FaTasks className="text-3xl mb-2" />
                  <div className="text-3xl font-bold">
                    {stats.tasksAssigned}
                  </div>
                  <div className="text-sm mt-1">Tasks Assigned</div>
                </div>

                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
                  <FaCheckCircle className="text-3xl mb-2" />
                  <div className="text-3xl font-bold">
                    {stats.completionRate}%
                  </div>
                  <div className="text-sm mt-1">Team Completion Rate</div>
                </div>

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
                  <div className="text-sm mt-1">Your Mood</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Team Performance
                    </h3>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Task Completion Rate
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

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Team Capacity
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {stats.totalTasks > 0
                            ? Math.min(
                                100,
                                Math.round(
                                  (stats.totalTasks / (stats.teamMembers * 5)) *
                                    100
                                )
                              )
                            : 0}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            stats.totalTasks / (stats.teamMembers * 5) > 0.8
                              ? "bg-red-500"
                              : stats.totalTasks / (stats.teamMembers * 5) > 0.5
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${
                              stats.totalTasks > 0
                                ? Math.min(
                                    100,
                                    Math.round(
                                      (stats.totalTasks /
                                        (stats.teamMembers * 5)) *
                                        100
                                    )
                                  )
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Based on estimated capacity of 5 tasks per team member
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Your Mood Level
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

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Your Team Members
                    </h3>
                  </div>

                  {teamMembers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                      {teamMembers.slice(0, 6).map((member) => (
                        <TeamMemberCard key={member._id} member={member} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No team members found.
                    </p>
                  )}

                  {teamMembers.length > 6}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Team Tasks
                  </h3>
                  <button
                    onClick={() => setSelectedTab("assign")}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Assign New Tasks
                  </button>
                </div>

                {teamTasks && teamTasks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamTasks.slice(0, 4).map((task) => (
                      <TaskCard key={task._id} task={task} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No tasks assigned to your team yet.
                  </p>
                )}

                {teamTasks.length > 4 && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setSelectedTab("taskboard")}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View all {teamTasks.length} tasks
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Quick Actions
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => setSelectedTab("assign")}
                    className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition flex flex-col items-center"
                  >
                    <FaTasks className="text-2xl text-blue-600 mb-2" />
                    <span className="text-sm font-medium">Assign Tasks</span>
                  </button>

                  <button
                    onClick={() => setSelectedTab("mood")}
                    className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition flex flex-col items-center"
                  >
                    <FaSmile className="text-2xl text-green-600 mb-2" />
                    <span className="text-sm font-medium">Check-in Mood</span>
                  </button>

                  <button
                    onClick={() => setSelectedTab("moods")}
                    className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition flex flex-col items-center"
                  >
                    <FaChartLine className="text-2xl text-purple-600 mb-2" />
                    <span className="text-sm font-medium">Team Moods</span>
                  </button>

                  <button
                    onClick={() => setSelectedTab("goals")}
                    className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition flex flex-col items-center"
                  >
                    <FaCheckCircle className="text-2xl text-yellow-600 mb-2" />
                    <span className="text-sm font-medium">Team Goals</span>
                  </button>
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

          {selectedTab === "assign" && (
            <div className="space-y-6 mt-4">
              <NewTask />
            </div>
          )}

          {selectedTab === "moods" && (
            <div className="space-y-6 mt-4">
              <GetAllMoods />
            </div>
          )}

          {selectedTab === "goals" && (
            <div className="space-y-6 mt-4">
              <GoalsPage />
            </div>
          )}

          {selectedTab === "analytics" && (
            <div className="space-y-6 mt-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Team Analytics Dashboard
              </h2>
              <TeamAnalyticsCards />
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Your Personal Analytics
                </h3>
                <AnalyticsCards />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamLeadDashboardPage;

import React, { useEffect, useState } from "react";
import API from "../../services/api";

const RoleChangeDashboard = () => {
  const [users, setUsers] = useState([]);
  const [moods, setMoods] = useState([]);
  const [tasks, setTasks] = useState({});
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMoods, setLoadingMoods] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [roleChangingId, setRoleChangingId] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchMoods();
    fetchTasks();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await API.get("/users");
      const usersList = res.data.users || res.data;
      setUsers(usersList);
    } catch (err) {
      alert("Failed to fetch users", err);
      setUsers([]);
    }
    setLoadingUsers(false);
  };

  // Fetch all moods
  const fetchMoods = async () => {
    setLoadingMoods(true);
    try {
      const res = await API.get("/allmood");
      setMoods(res.data);
    } catch (err) {
      alert("Failed to fetch moods", err);
      setMoods([]);
    }
    setLoadingMoods(false);
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const res = await API.get("/tasks");
      const tasksData = res.data;
      const tasksByUser = {};

      tasksData.forEach((task) => {
        if (!tasksByUser[task.assignedTo]) {
          tasksByUser[task.assignedTo] = [];
        }
        tasksByUser[task.assignedTo].push(task.title);
      });

      setTasks(tasksByUser);
    } catch (err) {
      alert("Failed to fetch tasks", err);
      setTasks({});
    }
    setLoadingTasks(false);
  };

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    setRoleChangingId(userId);
    try {
      await API.patch(`/admin/dashboard/changeRole/${userId}`, { role: newRole });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      alert("Failed to change role", err);
    }
    setRoleChangingId(null);
  };

  // If data is still loading
  if (loadingUsers || loadingMoods || loadingTasks) {
    return (
      <div className="flex justify-center items-center h-screen p-8">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen p-8">
        <span className="text-lg text-red-500">No users found.</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-10">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-900 flex items-center gap-2">
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0V7m0 4l-4-4m0 0l-4 4"></path>
        </svg>
        User Role Management
      </h2>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-50 text-blue-900">
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Role</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Mood</th>
              <th className="py-3 px-4 text-left font-semibold">Assigned Tasks</th>
              <th className="py-3 px-4 text-left font-semibold">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => {
              const userMood = moods.find(mood => mood.user && mood.user._id === user._id);
              const userTasks = tasks[user._id] || [];

              return (
                <tr key={user._id} className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-blue-50"} hover:bg-blue-100 transition`}>
                  <td className="py-2 px-4 font-semibold text-blue-800">{user.name}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    {userMood ? (
                      <span
                        className={`inline-block px-3 py-1 rounded-full ${
                          userMood.mood === "stressed" ? "bg-red-500" : "bg-green-500"
                        } text-white`}
                      >
                        {userMood.mood}
                      </span>
                    ) : (
                      <span className="text-gray-500">No mood data</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {userTasks.length > 0 ? (
                      userTasks.map((task, idx) => (
                        <div key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm mb-1">
                          {task}
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500">No tasks</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      disabled={roleChangingId === user._id}
                      className="px-4 py-2 bg-blue-100 rounded-md cursor-pointer"
                    >
                      <option value="employee">Employee</option>
                      <option value="team-lead">Team Lead</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleChangeDashboard;

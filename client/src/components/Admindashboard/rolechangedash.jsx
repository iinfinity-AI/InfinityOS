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

  if (loadingUsers || loadingMoods || loadingTasks) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-red-500">No users found.</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-12">
      <h2 className="text-4xl font-bold mb-8 text-blue-800 flex items-center gap-3">
        {/* <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0V7m0 4l-4-4m0 0l-4 4"></path>
        </svg> */}
        Manage User Roles
      </h2>

      <div className="overflow-x-auto rounded-lg border border-blue-200 shadow-sm">
        <table className="min-w-full bg-white divide-y divide-blue-100">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="py-5 px-5 text-left font-semibold">Name</th>
              <th className="py-3 px-5 text-left font-semibold">Role</th>
              <th className="py-3 px-5 text-left font-semibold">Email</th>
              <th className="py-3 px-5 text-left font-semibold">Mood</th>
              <th className="py-3 px-5 text-left font-semibold">Tasks</th>
              <th className="py-3 px-5 text-left font-semibold">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => {
              const userMood = moods.find(mood => mood.user && mood.user._id === user._id);
              const userTasks = tasks[user._id] || [];

              return (
                <tr
                  key={user._id}
                  className={`transition-all duration-200 hover:bg-blue-100 ${
                    idx % 2 === 0 ? "bg-white" : "bg-blue-30"
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-blue-900">{user.name}</td>
                  <td className="py-3 px-5 capitalize">{user.role}</td>
                  <td className="py-3 px-5">{user.email}</td>
                  <td className="py-3 px-5">
                    {userMood ? (
                      <span
                        className={`inline-flex items-center px-1 py-2 text-sm font-medium rounded-lg ${
                          userMood.mood === "stressed"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {userMood.mood}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm italic">No data</span>
                    )}
                  </td>
                  <td className="py-3 px-5 space-y-1">
                    {userTasks.length > 0 ? (
                      userTasks.map((task, i) => (
                        <div key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md shadow-sm inline-block mr-1">
                          {task}
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm italic">No tasks</span>
                    )}
                  </td>
                  <td className="py-3 px-5">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      disabled={roleChangingId === user._id}
                      className="text-sm bg-blue-50 border border-blue-300 text-blue-900 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

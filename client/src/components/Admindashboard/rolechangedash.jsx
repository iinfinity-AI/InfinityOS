import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { FaTrash, FaUserEdit } from "react-icons/fa";

const RoleChangeDashboard = () => {
  const [users, setUsers] = useState([]);
  const [moods, setMoods] = useState([]);
  const [tasks, setTasks] = useState({});
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMoods, setLoadingMoods] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [roleChangingId, setRoleChangingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    userId: null,
    userName: "",
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "", // "success" or "error"
  });

  useEffect(() => {
    fetchUsers();
    fetchMoods();
    fetchTasks();
  }, []);

  // Hide alert after 5 seconds
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await API.get("/users");
      const usersList = res.data.users || res.data;
      setUsers(usersList);
    } catch (err) {
      setAlert({
        show: true,
        message: "Failed to fetch users",
        type: "error",
      });
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
      setAlert({
        show: true,
        message: "Failed to fetch moods",
        type: "error",
      });
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
      setAlert({
        show: true,
        message: "Failed to fetch tasks",
        type: "error",
      });
      setTasks({});
    }
    setLoadingTasks(false);
  };

  const handleRoleChange = async (userId, newRole) => {
    setRoleChangingId(userId);
    try {
      await API.patch(`/admin/dashboard/changeRole/${userId}`, {
        role: newRole,
      });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      setAlert({
        show: true,
        message: "User role updated successfully",
        type: "success",
      });
    } catch (err) {
      setAlert({
        show: true,
        message: err.response?.data?.error || "Failed to change role",
        type: "error",
      });
    }
    setRoleChangingId(null);
  };

  const handleDeleteClick = (userId, userName) => {
    setDeleteConfirm({
      show: true,
      userId,
      userName,
    });
  };

  const handleDeleteUser = async () => {
    try {
      await API.delete(`/admin/dashboard/changeRole/${deleteConfirm.userId}`);
      setUsers((prev) =>
        prev.filter((user) => user._id !== deleteConfirm.userId)
      );
      setAlert({
        show: true,
        message: "User deleted successfully",
        type: "success",
      });
    } catch (err) {
      setAlert({
        show: true,
        message:
          err.response?.data?.error ||
          "Failed to delete user. Only employees can be deleted.",
        type: "error",
      });
    } finally {
      setDeleteConfirm({ show: false, userId: null, userName: "" });
    }
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm({ show: false, userId: null, userName: "" });
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
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 ">
      {/* Alert Message */}
      {alert.show && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            alert.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{alert.message}</span>
            <button
              onClick={() => setAlert({ ...alert, show: false })}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <h2 className="text-4xl font-bold mb-8 text-blue-800 flex items-center gap-3">
        Manage Users
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
              <th className="py-3 px-5 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => {
              const userMood = moods.find(
                (mood) => mood.user && mood.user._id === user._id
              );
              const userTasks = tasks[user._id] || [];

              return (
                <tr
                  key={user._id}
                  className={`transition-all duration-200 hover:bg-blue-100 ${
                    idx % 2 === 0 ? "bg-white" : "bg-blue-30"
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-blue-900">
                    {user.name}
                  </td>
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
                      <span className="text-gray-500 text-sm italic">
                        No data
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-5 space-y-1">
                    {userTasks.length > 0 ? (
                      userTasks.map((task, i) => (
                        <div
                          key={i}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md shadow-sm inline-block mr-1"
                        >
                          {task}
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm italic">
                        No tasks
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-5 flex items-center space-x-2">
                    <div className="flex items-center">
                      <FaUserEdit className="mr-2 text-blue-600" />
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        disabled={roleChangingId === user._id}
                        className="text-sm bg-blue-50 border border-blue-300 text-blue-900 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="employee">Employee</option>
                        <option value="team-lead">Team Lead</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>

                    {user.role === "employee" && (
                      <button
                        onClick={() => handleDeleteClick(user._id, user.name)}
                        className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        title="Delete user"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-6 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <FaTrash className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Delete User
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{deleteConfirm.userName}</span>?
                This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={closeDeleteConfirm}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleChangeDashboard;

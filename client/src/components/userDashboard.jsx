import React, { useEffect, useState } from "react";
import API from "../services/api";

const statusOptions = ["pending", "in-progress", "completed", "blocked"];
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  blocked: "bg-red-100 text-red-800",
};

const DashboardTable = ({ title, tasks, loading, updatingId, handleStatusChange }) => (
  <div className={`max-w-${title === 'My Assigned Tasks' ? '5xl' : '4xl'} mx-auto bg-white rounded-2xl shadow-lg p-10 mt-10`}>
    <h2 className="text-3xl font-extrabold mb-8 text-blue-900 flex items-center gap-2">
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0V7m0 4l-4-4m0 0l-4 4"></path>
      </svg>
      {title}
    </h2>
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-50 text-blue-900">
            <th className="py-3 px-4 text-left font-semibold">Title</th>
            <th className="py-3 px-4 text-left font-semibold">Description</th>
            <th className="py-3 px-4 text-left font-semibold">Status</th>
            <th className="py-3 px-4 text-left font-semibold">Priority</th>
            <th className="py-3 px-4 text-left font-semibold">Due Date</th>
            <th className="py-3 px-4 text-left font-semibold">Change Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) => (
            <tr key={task._id} className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-blue-50"} hover:bg-blue-100 transition`}>
              <td className="py-2 px-4 font-semibold text-blue-800">{task.title}</td>
              <td className="py-2 px-4 max-w-xs truncate" title={task.description}>
                {task.description.length > 40 ? task.description.slice(0, 40) + "..." : task.description}
              </td>
              <td className="py-2 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[task.status] || "bg-gray-100 text-gray-800"}`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  task.priority === "High" ? "bg-red-100 text-red-700" :
                  task.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                  task.priority === "Critical" ? "bg-red-200 text-red-900" :
                  "bg-green-100 text-green-700"
                }`}>
                  {task.priority}
                </span>
              </td>
              <td className="py-2 px-4">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
              </td>
              <td className="py-2 px-4">
                <select
                  value={task.status}
                  disabled={updatingId === task._id}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>
                {updatingId === task._id && <span className="ml-2 text-blue-500 animate-pulse text-xs">Updating...</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    API.get("/tasks/get")
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleStatusChange = async (taskId, newStatus) => {
    setUpdatingId(taskId);
    try {
      await API.patch(`/tasks/change/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      alert("Failed to update status", err.message);
    }
    setUpdatingId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 p-8">
        <span className="text-lg text-gray-600">Loading...</span>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 p-8">
        <span className="text-lg text-red-500">No assigned tasks found.</span>
      </div>
    );
  }

  return (
    <DashboardTable
      title={role === "team-lead" || role === "Team Lead" ? "My Assigned Tasks" : "My Tasks"}
      tasks={tasks}
      loading={loading}
      updatingId={updatingId}
      handleStatusChange={handleStatusChange}
    />
  );
};

export default UserDashboard;
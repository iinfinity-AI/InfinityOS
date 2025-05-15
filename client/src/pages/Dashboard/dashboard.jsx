import React, { useEffect, useState } from "react";
import API from "../../services/api";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "", search: "" });
  const [sortBy, setSortBy] = useState("dueDate");

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [filters, sortBy]);

  const fetchTasks = async () => {
    const params = { ...filters, sortBy };
    const res = await API.get("/tasks", { params });
    setTasks(res.data);
  };

  return (
    <div className="max-w-5xl mx-auto py-20">
      <h2 className="text-2xl font-bold mb-6">My Assigned Tasks</h2>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border rounded px-3 py-1"
          value={filters.status}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="blocked">Blocked</option>
        </select>
        <select
          className="border rounded px-3 py-1"
          value={filters.priority}
          onChange={e => setFilters(f => ({ ...f, priority: e.target.value }))}
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        <input
          className="border rounded px-3 py-1"
          placeholder="Search by title..."
          value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
        />
        <select
          className="border rounded px-3 py-1"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="createdAt">Sort by Created Date</option>
        </select>
      </div>
      {/* Task Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Priority</th>
              <th className="py-2 px-4">Assigned By</th>
              <th className="py-2 px-4">Start Date</th>
              <th className="py-2 px-4">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id} className="border-b hover:bg-blue-50">
                <td className="py-2 px-4 font-semibold">{task.title}</td>
                <td className="py-2 px-4 max-w-xs truncate" title={task.description}>
                  {task.description.length > 40 ? task.description.slice(0, 40) + "..." : task.description}
                </td>
                <td className="py-2 px-4">{task.status}</td>
                <td className="py-2 px-4">{task.priority}</td>
                <td className="py-2 px-4">{task.createdBy?.name || "N/A"}</td>
                <td className="py-2 px-4">{task.startDate ? new Date(task.startDate).toLocaleDateString() : "-"}</td>
                <td className="py-2 px-4">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tasks.length === 0 && (
        <div className="text-center text-gray-500 py-8">No tasks found.</div>
      )}
    </div>
  );
};

export default TaskDashboard;
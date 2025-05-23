import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const statusColors = {
  pending: "bg-yellow-200 text-yellow-900",
  "in-progress": "bg-blue-200 text-blue-900",
  completed: "bg-green-200 text-green-900",
  blocked: "bg-red-200 text-red-900",
};

const priorityColors = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-orange-200 text-orange-800",
  Critical: "bg-red-300 text-red-900",
};

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "", search: "" });
  const [sortBy, setSortBy] = useState("dueDate");
  const [showAdd, setShowAdd] = useState(false);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: [],
    priority: "Low",
    startDate: "",
    dueDate: "",
    tags: "",
    project: "",
  });
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();

  useEffect(() => {
    fetchTasks();
    API.get("/users")
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : res.data.users || [];
        setUsers(list);
      })
      .catch(() => setUsers([]));
  }, [filters, sortBy]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks", { params: { ...filters, sortBy } });
    setTasks(res.data || []);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssignChange = (e) => {
    setForm((prev) => ({
      ...prev,
      assignedTo: Array.from(e.target.selectedOptions, (o) => o.value),
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/tasks", {
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
      });
      setShowAdd(false);
      setForm({
        title: "",
        description: "",
        assignedTo: [],
        priority: "Low",
        startDate: "",
        dueDate: "",
        tags: "",
        project: "",
      });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add task");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-15">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold text-blue-800 flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75h5.25v5.25H3.75V3.75zm0 11.25h5.25v5.25H3.75v-5.25zM15 3.75h5.25v5.25H15V3.75zm0 11.25h5.25v5.25H15v-5.25z"
            />
          </svg>
          {role === "team-lead" ? "Team Tasks" : "Admin Task Dashboard"}
        </h2>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2"
          onClick={() => setShowAdd(true)}
          aria-label="Add Task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 text-blue-900">
        <select
          className="border rounded px-3 py-2 shadow-sm"
          value={filters.status}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="blocked">Blocked</option>
        </select>
        <select
          className="border rounded-lg px-3 py-2 shadow-sm"
          value={filters.priority}
          onChange={(e) => setFilters((f) => ({ ...f, priority: e.target.value }))}
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        <input
          className="border rounded-lg px-3 py-2 shadow-sm "
          placeholder="Search by title..."
          value={filters.search}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
        />
        <select
          className="border rounded-lg px-3 py-2 shadow-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="createdAt">Sort by Created Date</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-blue-200">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Priority</th>
              <th className="py-3 px-4 text-center">Assigned To</th>
              <th className="py-3 px-4 text-center">Start Date</th>
              <th className="py-3 px-4 text-center">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr
                key={task._id}
                className={`transition hover:bg-blue-50 ${idx % 2 === 0 ? "bg-white" : "bg-blue-50"}`}
              >
                <td className="py-3 px-4 font-semibold text-blue-800">{task.title}</td>
                <td className="py-3 px-4 text-sm truncate max-w-sm" title={task.description}>
                  {task.description.length > 60 ? task.description.slice(0, 60) + "..." : task.description}
                </td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[task.status] || "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      priorityColors[task.priority] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  {Array.isArray(task.assignedTo) && task.assignedTo.length > 0
                    ? task.assignedTo
                        .map((id) =>
                          typeof id === "object" ? id.name : users.find((u) => u._id === id)?.name || id
                        )
                        .join(", ")
                    : "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  {task.startDate ? new Date(task.startDate).toLocaleDateString() : "-"}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && <div className="text-center text-gray-500 py-6">No tasks found.</div>}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl relative">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-red-500"
              onClick={() => setShowAdd(false)}
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-6 text-blue-900 border-b pb-2">📝 Create a New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleFormChange}
                required
                placeholder="Task Title"
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                required
                placeholder="Description"
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="assignedTo"
                multiple
                value={form.assignedTo}
                onChange={handleAssignChange}
                required
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 h-24"
              >
                {users
                  .filter((u) => u.role === "employee" || u.role === "team-lead")
                  .map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name} ({u.role})
                    </option>
                  ))}
              </select>
              <select
                name="priority"
                value={form.priority}
                onChange={handleFormChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
              <div className="flex gap-4">
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleFormChange}
                  className="w-1/2 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleFormChange}
                  className="w-1/2 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                name="tags"
                value={form.tags}
                onChange={handleFormChange}
                placeholder="Tags (comma separated)"
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="project"
                value={form.project}
                onChange={handleFormChange}
                placeholder="Project Name"
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl shadow text-lg"
              >
                {loading ? "Adding..." : "Add Task"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDashboard;

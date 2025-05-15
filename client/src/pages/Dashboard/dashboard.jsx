import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  blocked: "bg-red-100 text-red-800",
};

const priorityColors = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-orange-100 text-orange-700",
  Critical: "bg-red-100 text-red-700",
};

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
  });
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
  const Navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    API.get("/users")
      .then((res) => {
        if (Array.isArray(res.data)) setUsers(res.data);
        else if (Array.isArray(res.data.users)) setUsers(res.data.users);
        else setUsers([]);
      })
      .catch(() => setUsers([]));
    // eslint-disable-next-line
  }, [filters, sortBy]);

  const fetchTasks = async () => {
    const params = { ...filters, sortBy };
    const res = await API.get("/tasks", { params });
    setTasks(res.data);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAssignChange = (e) => {
    setForm((f) => ({
      ...f,
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
    <div className="max-w-6xl mx-auto py-20">
      <h2 className="text-3xl font-extrabold mb-8 flex items-center justify-between text-blue-900">
        <span className="flex items-center gap-2">
          <svg
            className="w-8 h-8 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-2a4 4 0 014-4h4m0 0V7m0 4l-4-4m0 0l-4 4"
            ></path>
          </svg>
          Admin Dashboard
        </span>
        <div className="flex gap-3">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            onClick={() => setShowAdd(true)}
          >
            + Add Task
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
            onClick={() => Navigate("/mood")}
          >
            Mood
          </button>
        </div>
      </h2>
      {/* Add Task Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-red-500"
              onClick={() => setShowAdd(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Add New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleFormChange}
                required
                placeholder="Task Title"
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                required
                placeholder="Description"
                className="w-full border rounded px-3 py-2"
              />
              <select
                name="assignedTo"
                multiple
                value={form.assignedTo}
                onChange={handleAssignChange}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="" disabled>
                  Assign To (hold Ctrl to select multiple)
                </option>
                {Array.isArray(users) &&
                  users
                    .filter((u) => u.role === "employee")
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
                required
                className="w-full border rounded px-3 py-2"
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
                  required
                  className="border rounded px-3 py-2 w-1/2"
                />
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleFormChange}
                  required
                  className="border rounded px-3 py-2 w-1/2"
                />
              </div>
              <input
                name="tags"
                value={form.tags}
                onChange={handleFormChange}
                placeholder="Tags (comma separated)"
                className="w-full border rounded px-3 py-2"
              />
              <input
                name="project"
                value={form.project}
                onChange={handleFormChange}
                placeholder="Project"
                className="w-full border rounded px-3 py-2"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
              >
                {loading ? "Adding..." : "Add Task"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 mt-4">
        <select
          className="border rounded px-3 py-1"
          value={filters.status}
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value }))
          }
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
          onChange={(e) =>
            setFilters((f) => ({ ...f, priority: e.target.value }))
          }
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
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
        />
        <select
          className="border rounded px-3 py-1"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="createdAt">Sort by Created Date</option>
        </select>
      </div>
      {/* Task Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white rounded">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Assign To</th>
              <th className="py-3 px-4">Start Date</th>
              <th className="py-3 px-4">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr
                key={task._id}
                className={`border-b ${
                  idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                } hover:bg-blue-100 transition`}
              >
                <td className="py-2 px-4 font-semibold text-blue-800">
                  {task.title}
                </td>
                <td
                  className="py-2 px-4 max-w-xs truncate"
                  title={task.description}
                >
                  {task.description.length > 40
                    ? task.description.slice(0, 40) + "..."
                    : task.description}
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      statusColors[task.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      priorityColors[task.priority] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
       
                <td className="py-2 px-4">
                  {Array.isArray(task.assignedTo) && task.assignedTo.length > 0
                    ? task.assignedTo
                        .map((user) =>
                          typeof user === "object"
                            ? user.name
                            : users.find((u) => u._id === user)?.name || user 
                        )
                        .join(", ")
                    : "N/A"}
                </td>
                <td className="py-2 px-4">
                  {task.startDate
                    ? new Date(task.startDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-2 px-4">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "-"}
                </td>
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

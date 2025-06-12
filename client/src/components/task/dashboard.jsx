import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const AlertPopup = ({ message, onClose, type = "error" }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div
      className="absolute inset-0 bg-black bg-opacity-30"
      onClick={onClose}
    ></div>
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto z-10 relative">
      <div className="flex items-center mb-4">
        {type === "error" ? (
          <div className="mr-4 bg-red-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        ) : (
          <div className="mr-4 bg-green-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
        <h3 className="text-lg font-medium text-gray-900">
          {type === "error" ? "Warning" : "Success"}
        </h3>
      </div>
      <p className="mb-5 text-gray-600">{message}</p>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className={`${
            type === "error"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-600 hover:bg-green-700"
          } text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            type === "error" ? "focus:ring-blue-500" : "focus:ring-green-500"
          }`}
        >
          OK
        </button>
      </div>
    </div>
  </div>
);

const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div
      className="absolute inset-0 bg-black bg-opacity-30"
      onClick={onCancel}
    ></div>
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto z-10 relative">
      <div className="flex items-center mb-4">
        <div className="mr-4 bg-yellow-100 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
      </div>
      <p className="mb-5 text-gray-600">{message}</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

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
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "error",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    show: false,
    taskId: null,
    taskTitle: "",
  });
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
  const [deleteLoading, setDeleteLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();


  const canDelete = role === "admin" || role === "team-lead";


  const canAddTask = role === "admin" || role === "team-lead";

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
    try {
      const res = await API.get("/tasks", { params: { ...filters, sortBy } });
      setTasks(res.data || []);
    } catch (err) {
      setAlert({
        show: true,
        message: "Failed to load tasks. Please try again.",
        type: "error",
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "startDate" || name === "dueDate") {
      const otherField = name === "startDate" ? "dueDate" : "startDate";
      const otherValue = form[otherField];

      if (value && otherValue) {
        const startDate =
          name === "startDate" ? new Date(value) : new Date(otherValue);
        const dueDate =
          name === "dueDate" ? new Date(value) : new Date(otherValue);

        if (startDate > dueDate) {
          setAlert({
            show: true,
            message: "Start date cannot be after due date",
            type: "error",
          });
          return;
        }
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssignChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (o) => ({
      id: o.value,
      role: o.getAttribute("data-role"),
    }));

    const teamLeads = selectedOptions.filter((opt) => opt.role === "team-lead");

    if (teamLeads.length > 1) {
      setAlert({
        show: true,
        message: "Only one team lead can be assigned to a task.",
        type: "error",
      });
      return;
    }

    setForm((prev) => ({
      ...prev,
      assignedTo: selectedOptions.map((opt) => opt.id),
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (form.startDate && form.dueDate) {
      const startDate = new Date(form.startDate);
      const dueDate = new Date(form.dueDate);

      if (startDate > dueDate) {
        setAlert({
          show: true,
          message: "Start date cannot be after due date",
          type: "error",
        });
        return;
      }
    }

    setLoading(true);

    try {
      await API.post("/tasks", {
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
      });

      setAlert({
        show: true,
        message: "Task created successfully!",
        type: "success",
      });

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
      setShowAdd(false);
    } catch (err) {
      setAlert({
        show: true,
        message:
          err.response?.data?.error || "Failed to add task. Please try again.",
        type: "error",
      });
    }

    setLoading(false);
  };

  const handleDeleteClick = (taskId, taskTitle) => {
    setConfirmDialog({
      show: true,
      taskId,
      taskTitle,
    });
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);

    try {
      await API.delete(`/tasks/${confirmDialog.taskId}`);

      setAlert({
        show: true,
        message: "Task deleted successfully!",
        type: "success",
      });

      fetchTasks();
    } catch (err) {
      setAlert({
        show: true,
        message:
          err.response?.data?.error ||
          "Failed to delete task. Please try again.",
        type: "error",
      });
    } finally {
      setDeleteLoading(false);
      setConfirmDialog({ show: false, taskId: null, taskTitle: "" });
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDialog({ show: false, taskId: null, taskTitle: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
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
          {role === "team-lead"
            ? "Team Tasks"
            : role === "admin"
            ? "Admin Task Dashboard"
            : "Task Dashboard"}
        </h2>

        {canAddTask && (
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Task
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mb-6 text-blue-900">
        <select
          className="border rounded px-3 py-2 shadow-sm"
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
          className="border rounded-lg px-3 py-2 shadow-sm"
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
          className="border rounded-lg px-3 py-2 shadow-sm"
          placeholder="Search by title..."
          value={filters.search}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
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
              {canDelete && <th className="py-3 px-4 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr
                key={task._id}
                className={`transition hover:bg-blue-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                }`}
              >
                <td className="py-3 px-4 font-semibold text-blue-800">
                  {task.title}
                </td>
                <td
                  className="py-3 px-4 text-sm truncate max-w-sm"
                  title={task.description}
                >
                  {task.description.length > 60
                    ? task.description.slice(0, 60) + "..."
                    : task.description}
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
                      priorityColors[task.priority] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  {Array.isArray(task.assignedTo) && task.assignedTo.length > 0
                    ? task.assignedTo
                        .map((id) =>
                          typeof id === "object"
                            ? id.name
                            : users.find((u) => u._id === id)?.name || id
                        )
                        .join(", ")
                    : "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  {task.startDate
                    ? new Date(task.startDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "-"}
                </td>
                {canDelete && (
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDeleteClick(task._id, task.title)}
                      className="text-red-600 hover:text-red-800 focus:outline-none"
                      title="Delete Task"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 py-6">No tasks found.</div>
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-blue-900">
                📝 Create a New Task
              </h3>
              <button
                className="text-2xl text-gray-400 hover:text-red-500"
                onClick={() => setShowAdd(false)}
              >
                &times;
              </button>
            </div>

            <div className="overflow-y-auto p-6 flex-grow">
              <form onSubmit={handleAddTask} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Title
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleFormChange}
                      required
                      placeholder="Enter task title"
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleFormChange}
                      required
                      placeholder="Describe the task"
                      rows="3"
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned To
                    </label>
                    <select
                      name="assignedTo"
                      multiple
                      value={form.assignedTo}
                      onChange={handleAssignChange}
                      required
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 h-24"
                    >
                      {users
                        .filter(
                          (u) => u.role === "employee" || u.role === "team-lead"
                        )
                        .map((u) => (
                          <option key={u._id} value={u._id} data-role={u.role}>
                            {u.name} ({u.role})
                          </option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Note: Only one team lead can be assigned to a task. Hold
                      Ctrl/Cmd to select multiple employees.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
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
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Task Dates
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-1/2">
                        <input
                          type="date"
                          name="startDate"
                          value={form.startDate}
                          onChange={handleFormChange}
                          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                          placeholder="Start Date"
                          max={form.dueDate}
                        />
                        <p className="text-xs text-gray-500 mt-1">Start Date</p>
                      </div>
                      <div className="w-full sm:w-1/2">
                        <input
                          type="date"
                          name="dueDate"
                          value={form.dueDate}
                          onChange={handleFormChange}
                          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                          placeholder="Due Date"
                          min={form.startDate}
                        />
                        <p className="text-xs text-gray-500 mt-1">Due Date</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Note: Start date must be before or equal to due date.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <input
                      name="tags"
                      value={form.tags}
                      onChange={handleFormChange}
                      placeholder="Tags (comma separated)"
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project
                    </label>
                    <input
                      name="project"
                      value={form.project}
                      onChange={handleFormChange}
                      placeholder="Project Name"
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t sticky bottom-0 bg-white z-10">
              <button
                onClick={handleAddTask}
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl shadow text-lg"
              >
                {loading ? "Adding..." : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}

      {alert.show && (
        <AlertPopup
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ show: false, message: "", type: "error" })}
        />
      )}

      {confirmDialog.show && (
        <ConfirmDialog
          message={`Are you sure you want to delete the task "${confirmDialog.taskTitle}"? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default TaskDashboard;

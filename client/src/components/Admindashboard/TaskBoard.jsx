import React, { useState } from "react";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Low",
    dueDate: "",
    startDate: "",
    tags: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskForm.title || !taskForm.assignedTo || !taskForm.dueDate) {
      alert("Please fill out required fields (title, assigned to, due date)");
      return;
    }
    setTasks([...tasks, taskForm]);
    setTaskForm({
      title: "",
      description: "",
      assignedTo: "",
      priority: "Low",
      dueDate: "",
      startDate: "",
      tags: "",
      status: "Pending",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Board</h1>

      {/* Task List Table */}
      <div className="bg-white rounded-lg p-4 shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Task List</h2>
        <table className="w-full text-left table-auto">
          <thead className="bg-blue-200">
            <tr>
              <th className="px-4 py-2">Task Title</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Priority</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-center text-gray-400" colSpan="5">
                  No tasks added yet.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2">{task.status}</td>
                  <td className="px-4 py-2">{task.priority}</td>
                  <td className="px-4 py-2">{task.assignedTo}</td>
                  <td className="px-4 py-2">{task.dueDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Task Form */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            name="title"
            value={taskForm.title}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Task Title *"
          />
          <textarea
            name="description"
            value={taskForm.description}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Multi-line description input here"
          />
          <select
            name="assignedTo"
            value={taskForm.assignedTo}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select User *</option>
            <option>Jhone Lee</option>
            <option>Jane Peter</option>
          </select>
          <select
            name="priority"
            value={taskForm.priority}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
          <select
            name="status"
            value={taskForm.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Blocked</option>
          </select>
          <input
            type="date"
            name="startDate"
            value={taskForm.startDate}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Start Date"
          />
          <input
            type="date"
            name="dueDate"
            value={taskForm.dueDate}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Due Date *"
          />
          <input
            name="tags"
            value={taskForm.tags}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Tags"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTaskForm({
                title: "",
                description: "",
                assignedTo: "",
                priority: "Low",
                dueDate: "",
                startDate: "",
                tags: "",
                status: "Pending",
              })}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskBoard;

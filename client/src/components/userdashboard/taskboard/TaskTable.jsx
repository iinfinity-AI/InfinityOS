import React, { useEffect, useState } from "react";
import axios from "axios";

const statusBadge = {
  Pending: "bg-gray-200 text-gray-800",
  "In Progress": "bg-yellow-200 text-yellow-800",
  Completed: "bg-green-200 text-green-800",
  Blocked: "bg-red-200 text-red-800",
};

const priorityDot = {
  Critical: "bg-red-600",
  High: "bg-orange-500",
  Medium: "bg-blue-500",
};

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks"); // Replace with your backend URL
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="bg-white rounded-md shadow-md mt-6 p-4">
      <h2 className="text-2xl font-semibold mb-4">Assigned Task</h2>
      <table className="w-full table-auto border border-blue-300">
        <thead>
          <tr className="bg-blue-300 text-black font-semibold">
            <th className="px-3 py-2">Task Title</th>
            <th className="px-3 py-2">Description</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Priority</th>
            <th className="px-3 py-2">Assigned By</th>
            <th className="px-3 py-2">Assigned On</th>
            <th className="px-3 py-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No tasks found.
              </td>
            </tr>
          ) : (
            tasks.map((task, i) => (
              <tr key={i} className="text-center border-b border-blue-200">
                <td className="py-2">{task.title}</td>
                <td className="py-2 text-blue-600 hover:underline cursor-pointer">
                  Hover <span className="font-semibold">To View...</span>
                </td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${statusBadge[task.status]}`}>
                    {task.status}
                  </span>
                </td>
                <td className="py-2 flex items-center justify-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${priorityDot[task.priority]}`}></span>
                  {task.priority}
                </td>
                <td className="py-2">{task.assignedBy}</td>
                <td className="py-2">{task.assignedOn}</td>
                <td className="py-2">{task.dueDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;

import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import API from "../../services/api";

const AssignedToMeCard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) return;
        const res = await API.get(`/tasks`);
        const allTasks = res.data || [];
        const assignedTasks = allTasks.filter((task) => {
          if (Array.isArray(task.assignedTo)) {
            return task.assignedTo.some(
              (a) =>
                (typeof a === "string" && a === user.id) ||
                (a && a._id && String(a._id) === String(user.id))
            );
          }
          return (
            task.assignedTo === user.id ||
            (task.assignedTo && task.assignedTo._id && String(task.assignedTo._id) === String(user.id))
          );
        });
        setTasks(assignedTasks);
      } catch {
        setTasks([]);
      }
    };
    fetchAssignedTasks();
  }, []);

  return (
    <div className="bg-white rounded-md p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold">Assigned to me</p>
      </div>
      {tasks.length === 0 && (
        <div className="text-gray-400 text-sm">No tasks assigned.</div>
      )}
      {tasks.map(({ title, dueDate }, i) => (
        <div
          key={i}
          className="flex items-center space-x-4 bg-[#d9e5ff] rounded-md p-3 mb-3"
        >
          <div className="flex-1">
            <p className="font-semibold">{title}</p>
            <p className="text-xs text-gray-600">Due Date : {dueDate}</p>
          </div>
          <button className="bg-green-600 p-1 rounded text-white">
            <AiOutlineEye />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AssignedToMeCard;

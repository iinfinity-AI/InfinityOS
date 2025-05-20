import React, { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import API from "../../services/api";

const AssignedToMeCard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?._id) return;
        const res = await API.get(`/tasks`);
        const allTasks = res.data || [];
        const assignedTasks = allTasks.filter(
          (task) =>
            task.assignedTo === user._id ||
            (Array.isArray(task.assignedTo) && task.assignedTo.includes(user._id))
        );
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
        <FiMoreVertical className="cursor-pointer" />
      </div>

      {tasks.length === 0 && (
        <div className="text-gray-400 text-sm">No tasks assigned.</div>
      )}

      {tasks.map(({ title, role }, i) => (
        <div
          key={i}
          className="flex items-center space-x-4 bg-[#d9e5ff] rounded-md p-3 mb-3"
        >
          <div className="flex-1">
            <p className="font-semibold">{title}</p>
            <p className="text-xs text-gray-600">Applied for : {role}</p>
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

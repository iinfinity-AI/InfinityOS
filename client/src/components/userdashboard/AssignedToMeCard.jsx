import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";

const AssignedToMeCard = () => {
  const tasks = [
    {
      title: "Design and implement the backend",
      role: "backend Engineer",
    },
    {
      title: "Develop a simple and intelligent chatbot",
      role: "Sales",
    },
    {
      title: "Build UI designs",
      role: "Product Manager",
    },
  ];

  return (
    <div className="bg-white rounded-md p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold">Assigned to me</p>
        <FiMoreVertical className="cursor-pointer" />
      </div>

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

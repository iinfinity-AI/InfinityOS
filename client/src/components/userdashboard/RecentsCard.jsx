import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { FaUserTie, FaTasks, FaUserGraduate } from "react-icons/fa";
import { AiOutlineEye, AiOutlineDownload } from "react-icons/ai";

const RecentsCard = () => {
  const projects = [
    { icon: <FaUserTie />, title: "Project 1", role: "" },
    { icon: <FaTasks />, title: "Design UI Pages", role: "" },
    { icon: <FaUserGraduate />, title: "WS Marketing system", role: "" },
  ];

  return (
    <div className="bg-white rounded-md p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold">Recents</p>
        <FiMoreVertical className="cursor-pointer" />
      </div>

      {projects.map(({ icon, title, role }, i) => (
        <div
          key={i}
          className="flex items-center space-x-4 bg-[#d9e5ff] rounded-md p-3 mb-3"
        >
          <div className="p-3 bg-gray-300 rounded-full text-xl">{icon}</div>
          <div className="flex-1">
            <p className="font-semibold">{title}</p>
            <p className="text-xs text-gray-600">Role : {role}</p>
          </div>
          <div className="flex space-x-2 text-white">
            <button className="bg-green-600 p-1 rounded">
              <AiOutlineEye />
            </button>
            <button className="bg-blue-700 p-1 rounded">
              <AiOutlineDownload />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentsCard;

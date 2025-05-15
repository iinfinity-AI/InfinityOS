import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { HiOutlineDocumentText, HiOutlineUsers, HiOutlineUserCircle } from "react-icons/hi";

const HelpfullCard = () => {
  const items = [
    { icon: <HiOutlineDocumentText />, title: "Documentation", subtitle: "Access Bank" },
    { icon: <HiOutlineUsers />, title: "Community", subtitle: "Paystack" },
    { icon: <HiOutlineUserCircle />, title: "Self-Managed licensing", subtitle: "T-Pay" },
  ];

  return (
    <div className="bg-white rounded-md p-4 space-y-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold">Helpfull</p>
        <FiMoreVertical className="cursor-pointer" />
      </div>

      {items.map(({ icon, title, subtitle }, i) => (
        <div
          key={i}
          className="flex items-center space-x-4 bg-[#d9e5ff] rounded-md p-3 cursor-pointer hover:bg-[#b7d1ff]"
        >
          <div className="p-3 bg-gray-300 rounded-full text-xl">{icon}</div>
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HelpfullCard;

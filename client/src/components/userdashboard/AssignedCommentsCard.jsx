import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineEye, AiOutlineClose } from "react-icons/ai";

const AssignedCommentsCard = () => {
  const comments = [
    {
      name: "Aman",
      avatar: "/path/to/Customer1.png",
      comment: "Good work",
    },
    {
      name: "Gelila",
      avatar: "/path/to/Customer2.png",
      comment:
        "Can you align the button spacing on the homepage hero section? It feels a bit off-center.",
    },
    {
      name: "Shaneli",
      avatar: "/path/to/Customer3.png",
      comment: "Can you integrate the leave management API by Friday?",
    },
  ];

  return (
    <div className="bg-white rounded-md p-4 shadow-sm w-full">
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold">Assigned Comments</p>
        <FiMoreVertical className="cursor-pointer" />
      </div>

      {comments.map(({ name, avatar, comment }, i) => (
        <div
          key={i}
          className="flex items-center space-x-4 bg-[#d9e5ff] rounded-md p-3 mb-3"
        >
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-semibold">{name}</p>
            <p className="text-xs text-gray-600">{comment}</p>
          </div>
          <div className="flex space-x-2 items-center">
            <button className="bg-green-600 p-1 rounded text-white text-base">
              <AiOutlineEye />
            </button>
            <button className="bg-red-600 p-1 rounded text-white text-base">
              <AiOutlineClose />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssignedCommentsCard;

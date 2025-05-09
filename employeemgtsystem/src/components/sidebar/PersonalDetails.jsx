import React from "react";
import { FaEdit } from "react-icons/fa";

export default function PersonalDetails({
  name,
  department,
  jobTitle,
  jobCategory,
  avatarUrl
}) {
  return (
    <div className="relative py-10 px-6 h-full bg-white rounded-lg shadow-md">
      {/* Edit button top-right */}
      <div className="absolute top-4 right-4 text-gray-600 text-sm cursor-pointer hover:underline flex items-center gap-1">
        <FaEdit className="text-base" />
        <span>Edit</span>
      </div>

      {/* Centered content */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Employee Name</p>
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p className="text-sm text-gray-600">Department</p>
          <h3 className="text-lg font-semibold mb-4">{department}</h3>

          <div className="flex justify-center gap-16">
            <div className="text-center">
              <p className="text-sm text-gray-600">Job Title</p>
              <p className="font-semibold">{jobTitle}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Job Category</p>
              <p className="font-semibold">{jobCategory}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

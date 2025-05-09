import React from "react";

export default function SideBar({ activeItem, setActiveItem }) {
  const items = [
    "Personal Details",
    "Contact Details",
    "My Tasks",
    "Next of kin Details",
    "Education Qualifications",
    "Guarantor Details",
    "Family Details",
    "Job Details",
    "Financial Details",
  ];

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 space-y-3">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => setActiveItem(item)}
          className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
            activeItem === item
              ? "bg-yellow-400 text-black"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

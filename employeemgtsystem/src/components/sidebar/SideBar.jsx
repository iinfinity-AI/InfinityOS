import React from "react";

export default function SideBar({ activeItem, setActiveItem }) {
  const items = [
    "Personal Details",
    "Contact Details",
    "My Tasks", // You can change this to "Next of kin Details" if needed
    "Education Qualifications",
    "Guarantor Details",
    "Family Details",
    "Job Details",
    "Financial Details",
  ];

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-md py-6 px-4 space-y-4">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => setActiveItem(item)}
          className={`w-full text-center px-4 py-3 rounded-lg font-semibold text-sm ${
            activeItem === item
              ? "bg-yellow-400 text-black"
              : "bg-blue-100 hover:bg-blue-200 text-gray-800"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

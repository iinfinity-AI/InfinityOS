import React from "react";

export default function BreadCrumb({ current }) {
  return (
    <div className="bg-white rounded-md shadow-sm px-6 py-4 mb-6">
      <h2 className="text-lg font-medium text-[#1C1C1C]">
        Dashboard <span className="text-yellow-500">&gt;</span> {current}
      </h2>
    </div>
  );
}

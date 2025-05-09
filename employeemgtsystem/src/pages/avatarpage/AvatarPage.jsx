import React, { useState } from "react";
import BreadCrumb from "../../components/sidebar/BreadCrumb";
import SideBar from "../../components/sidebar/SideBar";

export default function AvatarPage() {
  const [activeItem, setActiveItem] = useState("Personal Details");

  return (
    <div className="bg-blue-50 min-h-screen px-6 pt-24 pb-8 overflow-y-scroll">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-4">
        <BreadCrumb current={activeItem} />
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />

        <div className="flex-1 bg-white rounded-lg shadow-md p-6 relative">
          <div className="absolute top-4 right-4 text-sm text-gray-600 cursor-pointer hover:underline">
            🖉 Edit
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                alt="Avatar"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Employee Name</p>
              <h2 className="text-xl font-semibold mb-2">Biruk Dawit</h2>
              <p className="text-sm text-gray-600">Department</p>
              <h3 className="text-lg font-medium mb-4">Design & Marketing</h3>
              <div className="flex justify-center gap-10">
                <div>
                  <p className="text-sm text-gray-600">Job Title</p>
                  <p className="font-medium">UI / UX Designer</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Job Category</p>
                  <p className="font-medium">Full time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

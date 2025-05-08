import React from "react";

export default function AvatarPage() {
  return (
    <div className="mt-24 px-6 py-8 bg-blue-50 min-h-screen">
      {/* Breadcrumb */}
      <p className="text-gray-500 mb-4">Dashboard &gt; Update Profile</p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4 space-y-3">
          {[
            "Personal Details",
            "Contact Details",
            "Next of kin Details",
            "Education Qualifications",
            "Guarantor Details",
            "Family Details",
            "Job Details",
            "Financial Details",
          ].map((item, index) => (
            <button
              key={index}
              className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                index === 0
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right Profile Content */}
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

import React from "react";

import { FaTasks, FaSmile, FaUser } from "react-icons/fa";
import TopNav from "../../components/navbar/TopNav";

const stats = [
  { icon: <FaTasks size={32} className="text-blue-500" />, label: "Tasks", value: 12 },
  { icon: <FaSmile size={32} className="text-yellow-400" />, label: "Mood Entries", value: 7 },
  { icon: <FaUser size={32} className="text-green-400" />, label: "Profile Views", value: 23 },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 pt-24">
      {/* Top Navigation */}
      <TopNav/>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-10 mt-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2 tracking-wide">
          Welcome to InfinityOS Dashboard
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Track your productivity, mood, and more at a glance.
        </p>
        <div className="flex flex-col md:flex-row justify-around gap-8 mb-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-blue-50 rounded-xl px-8 py-6 flex flex-col items-center shadow-md hover:scale-105 transition-transform"
            >
              <div>{stat.icon}</div>
              <div className="text-4xl font-bold text-gray-800 my-3">{stat.value}</div>
              <div className="text-lg text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-green-400 rounded-xl py-8 px-4 text-white text-center text-xl font-semibold shadow-lg">
          Have a great day! Stay productive and positive. 🌟
        </div>
      </div>
    </div>
  );
};

export default HomePage;

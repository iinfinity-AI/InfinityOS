<<<<<<< HEAD
import React from "react";
import { FaTasks, FaSmile, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const stats = [
  { icon: <FaTasks size={32} className="text-blue-500" />, label: "Tasks", value: 12, color: "from-blue-400 to-blue-600" },
  { icon: <FaSmile size={32} className="text-yellow-400" />, label: "Mood Entries", value: 7, color: "from-yellow-300 to-yellow-500" },
  { icon: <FaUser size={32} className="text-green-400" />, label: "Profile Views", value: 23, color: "from-green-300 to-green-500" },
];
=======
import React from 'react';
import HomeBack from '../../assets/homepage/HomeBack.jpg';
>>>>>>> newFrontend

const HomePage = () => {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 mt-12 border border-blue-100">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-wide mb-4 md:mb-0 drop-shadow-lg">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-400">InfinityOS</span> Dashboard
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 hover:scale-105 transition-all duration-200"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow hover:from-green-500 hover:to-blue-600 hover:scale-105 transition-all duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
        {/* Subheading */}
        <p className="text-center text-gray-600 mb-10 text-lg">
          Track your productivity, mood, and more at a glance.
        </p>
        {/* Stats Cards */}
        <div className="flex flex-col md:flex-row justify-around gap-8 mb-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`relative group bg-gradient-to-br ${stat.color} rounded-xl px-8 py-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform cursor-pointer hover:shadow-2xl focus:ring-4 focus:ring-blue-200 outline-none`}
              tabIndex={0}
              onClick={() => {
                if (stat.label === "Tasks") navigate("/tasks");
                if (stat.label === "Mood Entries") navigate("/mood");
                if (stat.label === "Profile Views") navigate("/profile");
              }}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  if (stat.label === "Tasks") navigate("/tasks");
                  if (stat.label === "Mood Entries") navigate("/mood");
                  if (stat.label === "Profile Views") navigate("/profile");
                }
              }}
            >
              <div className="mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-4xl font-extrabold text-white my-3 drop-shadow">{stat.value}</div>
              <div className="text-lg text-white font-medium">{stat.label}</div>
              <span className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 text-xs text-white bg-black bg-opacity-30 px-2 py-1 rounded transition-all">
                View {stat.label}
              </span>
            </div>
          ))}
        </div>
        {/* Animated Encouragement */}
        <div className="bg-gradient-to-r from-blue-500 to-green-400 rounded-xl py-8 px-4 text-white text-center text-2xl font-bold shadow-lg animate-pulse mb-4">
          Have a great day! Stay productive and positive. <span role="img" aria-label="star">🌟</span>
        </div>
        {/* Footer */}
        <div className="text-center text-gray-400 mt-8 text-sm">
          &copy; {new Date().getFullYear()} InfinityOS &mdash; Empowering your productivity.
        </div>
=======
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `url(${HomeBack})`,
      }}
    >

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-24 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Powering Smarter Teams, Every Day
        </h1>
        <p className="text-lg leading-relaxed text-justify">
          <span className="text-5xl font-serif float-left leading-none pr-2">I</span>
          nfinityOS streamlines team management with smart dashboards, task tracking, and mood
          check-ins—all in one platform. Enhance productivity, boost engagement, and build a
          healthier workplace with InfinityOS.
        </p>
>>>>>>> newFrontend
      </div>
    </div>
  );
};

export default HomePage;


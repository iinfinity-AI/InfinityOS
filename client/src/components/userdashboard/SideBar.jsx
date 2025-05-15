import React from "react";
import InfinityLogo from '../../assets/navbar/Infinitylogo.png';
import Customer1 from '../../assets/userdashboard/Customer1.png';  // default profile image import (adjust path as needed)

import {
  FaTachometerAlt,
  FaBalanceScale,
  FaUsers,
  FaBriefcase,
  FaSmile,
  FaEnvelope,
  FaClock,
  FaPowerOff,
} from "react-icons/fa";

const Sidebar = ({ userName, userAvatar }) => {
  // Use provided avatar or fallback to default Customer1 image
  const avatarToShow =
    userAvatar && userAvatar.trim() !== "" ? userAvatar : Customer1;

  return (
    <aside className="bg-[#0F1946] w-60 min-h-screen flex flex-col justify-between p-6">
      <div>
        {/* Logo */}
        <div className="flex items-center mb-8 space-x-2">
          <img src={InfinityLogo} alt="InfinityOS" className="w-auto h-10" />
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={avatarToShow}
            alt={userName || "User"}
            className="w-14 h-14 rounded-full border-4 border-yellow-400 object-cover"
            onError={(e) => {
              e.target.onerror = null; // prevent infinite loop
              e.target.src = Customer1;
            }}
          />
          <div>
            <p className="text-white font-semibold text-lg">{userName || "User"}</p>
            <p className="text-gray-400 text-xs">User</p>
          </div>
        </div>

        {/* Features label */}
        <p className="text-gray-400 mb-3 text-xs">Features</p>

        {/* Navigation */}
        <nav className="flex flex-col space-y-3 text-white">
          <NavItem icon={<FaTachometerAlt />} label="Dashboard" active />
          <NavItem icon={<FaBalanceScale />} label="Task Board" badgeCount={13} />
          <NavItem icon={<FaUsers />} label="Performance" />
          <NavItem icon={<FaSmile />} label="Mood & Wellness" />
          <NavItem icon={<FaEnvelope />} label="Communication" />
          <NavItem icon={<FaClock />} label="Time & Attendance" />
        </nav>
      </div>

      {/* Logout */}
      <button className="bg-red-600 text-white flex items-center justify-center space-x-2 py-2 rounded-md mt-6 w-full hover:bg-red-700 transition">
        <FaPowerOff /> <span>Log Out</span>
      </button>
    </aside>
  );
};

const NavItem = ({ icon, label, badgeCount, active }) => {
  return (
    <div
      className={`flex items-center space-x-3 px-4 py-3 rounded-md cursor-pointer ${
        active
          ? "bg-yellow-400 text-black font-semibold"
          : "hover:bg-yellow-400 hover:text-black"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="flex-1 whitespace-nowrap">{label}</span>
      {badgeCount && (
        <span className="text-xs bg-red-600 rounded-full px-2 py-0.5 font-bold text-white">
          {badgeCount}
        </span>
      )}
    </div>
  );
};

export default Sidebar;

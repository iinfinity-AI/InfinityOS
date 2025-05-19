import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import profileImage from "../../assets/admindashb/profileImage.png";
import infinityLogo from "../../assets/admindashb/infinityLogo.png";
import {
  FaTachometerAlt,
  FaBalanceScale,
  FaSmile,
  FaPowerOff,
} from "react-icons/fa";

const Adminsidebar = ({ collapsed, selectedTab, setSelectedTab }) => {
  const navigate = useNavigate();  // Initialize navigate

  const menuItems = [
    { icon: <FaTachometerAlt />, label: "dashboard" },
    { icon: <FaBalanceScale />, label: "taskboard" },
    { icon: <FaSmile />, label: "mood 4 wellness" },
  ];

  const handleLogout = () => {
    // Add any logout logic here (e.g. clear auth tokens)

    navigate("/");  // Navigate to home page
  };

  return (
    <div
      className={`h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-[#0C1E44] text-white flex flex-col justify-between fixed transition-all duration-300 shadow-lg z-50`}
    >
      <div>
        {/* Logo Section */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-0"
          } px-2 pt-1 mb-2`}
        >
          <img src={infinityLogo} alt="Infinity Logo" className="h-20" />
          {!collapsed && (
            <span className="text-white text-2xl font-normal tracking-wide">
              Infinity<span className="text-white-400">OS</span>
            </span>
          )}
        </div>

        {/* Admin Info */}
        {!collapsed && (
          <div className="flex items-center gap-4 px-5 py-2 border-b border-gray-700">
            <img
              src={profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <p className="font-semibold">Jane Peter</p>
              <p className="text-sm text-gray-300">Admin</p>
            </div>
          </div>
        )}

        {/* Menu Title */}
        {!collapsed && (
          <p className="px-6 mt-6 text-sm font-semibold text-gray-400">
            Features
          </p>
        )}

        {/* Sidebar Items */}
        <nav className="mt-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              collapsed={collapsed}
              active={selectedTab === item.label.toLowerCase()}
              onClick={() => setSelectedTab(item.label.toLowerCase())}
            />
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
          className="bg-red-600 w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition"
          onClick={handleLogout}
        >
          <FaPowerOff />
          {!collapsed && "Log Out"}
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, badge, collapsed, active, onClick }) => {
  return (
    <div
      className={`flex items-center justify-between px-6 py-3 cursor-pointer rounded-lg mx-2 my-1 transition ${
        active
          ? "bg-yellow-400 text-black font-semibold"
          : "hover:bg-blue-800 hover:text-white"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        {!collapsed && (
          <span className="capitalize">
            {label.replace(/&/g, "&").replace(/\bmgt\b/gi, "Management")}
          </span>
        )}
      </div>
      {!collapsed && badge && (
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
};

export default Adminsidebar;

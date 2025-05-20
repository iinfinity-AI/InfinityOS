// src/components/common/RoleBasedSidebar.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTachometerAlt, FaBalanceScale, FaSmile, FaUsers, FaTasks, FaPowerOff } from "react-icons/fa";

import InfinityLogo from "../../assets/navbar/Infinitylogo.png";
import AdminLogo from "../../assets/admindashb/infinityLogo.png";
import DefaultAvatar from "../../assets/userdashboard/Customer1.png";

const RoleBasedSidebar = ({ selectedTab, setSelectedTab, isCollapsed = false }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  const avatarToShow =
    user.profilePicture && user.profilePicture.trim() !== ""
      ? user.profilePicture
      : DefaultAvatar;

  const role = user.role?.toLowerCase();

  const baseClasses = `flex items-center ${isCollapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-md cursor-pointer transition-all duration-200`;

  const getNavItem = (icon, label, tabKey, path = "#") => (
    <Link
      key={tabKey}
      to={path}
      onClick={() => setSelectedTab(tabKey)}
      className={`${baseClasses} ${
        selectedTab === tabKey
          ? "bg-yellow-400 text-black font-semibold"
          : "hover:bg-yellow-400 hover:text-black text-white"
      }`}
    >
      {icon}
      {!isCollapsed && <span className="capitalize">{label}</span>}
    </Link>
  );

  // Define tabs per role
  const tabs = {
    admin: [
      getNavItem(<FaTachometerAlt />, "Dashboard", "dashboard"),
      getNavItem(<FaUsers />, "Manage Users", "users"),
      getNavItem(<FaBalanceScale />, "Task Board", "taskboard"),
      getNavItem(<FaSmile />, "Mood & Wellness", "mood"),
    ],
    employee: [
      getNavItem(<FaTachometerAlt />, "Dashboard", "dashboard"),
      getNavItem(<FaBalanceScale />, "Task Board", "taskboard"),
      getNavItem(<FaSmile />, "Mood & Wellness", "mood"),
    ],
    "team-lead": [
      getNavItem(<FaTachometerAlt />, "Dashboard", "dashboard"),
      getNavItem(<FaBalanceScale />, "Team Tasks", "taskboard"),
      getNavItem(<FaTasks />, "Assign Tasks", "assign"),
      getNavItem(<FaSmile />, "Add Mood", "mood"),
      getNavItem(<FaSmile />, "All Mood", "allmood"),
    ],
  };

  return (
    <aside
      className={`bg-[#0F1946] ${isCollapsed ? "w-20" : "w-64"} min-h-screen flex flex-col justify-between p-4 text-white transition-all duration-300`}
    >
      <div>
        {/* Logo */}
        <div className="flex items-center mb-6 justify-center">
          <img
            src={role === "admin" ? AdminLogo : InfinityLogo}
            alt="Logo"
            className="h-10"
          />
        </div>


        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={avatarToShow}
            alt="User Avatar"
            className={`rounded-full border-4 border-yellow-400 shadow-md ${
              isCollapsed ? "w-12 h-12" : "w-20 h-20"
            }`}
          />
          {!isCollapsed && (
            <>
              <h3 className="mt-2 text-lg font-semibold">{user.name || "User"}</h3>
              <p className="text-sm text-gray-300 capitalize">{user.role}</p>
            </>
          )}
        </div>

        {!isCollapsed && (
          <p className="text-sm uppercase tracking-wide text-gray-400 mb-3">
            Features
          </p>
        )}

        {/* Navigation */}
        <div className="space-y-2">{tabs[role] || []}</div>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 px-4 rounded-md"
        >
          <FaPowerOff />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default RoleBasedSidebar;

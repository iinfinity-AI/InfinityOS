import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBalanceScale,
  FaSmile,
  FaUsers,
  FaTasks,
  FaPowerOff,
  FaBullseye,
  FaSitemap,
  FaChartLine,
} from "react-icons/fa";

import AdminLogo from "../../assets/admindashb/infinityLogo.png";
import DefaultAvatar from "../../assets/userdashboard/Customer1.png";

const RoleBasedSidebar = ({
  selectedTab,
  setSelectedTab,
  isCollapsed = false,
}) => {
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
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null;

  const avatarToShow =
    user.profilePicture && user.profilePicture.trim() !== ""
      ? user.profilePicture
      : DefaultAvatar;

  const role = user.role?.toLowerCase();

  // Enhanced styling while keeping the same structure
  const baseClasses = `flex items-center ${
    isCollapsed ? "justify-center" : "gap-3"
  } px-4 py-3 rounded-lg cursor-pointer transition-all duration-200`;

  const getNavItem = (icon, label, tabKey, path = "#") => (
    <Link
      key={tabKey}
      to={path}
      onClick={() => setSelectedTab(tabKey)}
      className={`${baseClasses} ${
        selectedTab === tabKey
          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold shadow-md"
          : "hover:bg-gray-800/60 hover:text-yellow-400 text-gray-300"
      }`}
    >
      <div
        className={selectedTab === tabKey ? "text-gray-900" : "text-yellow-400"}
      >
        {icon}
      </div>
      {!isCollapsed && <span className="capitalize">{label}</span>}
    </Link>
  );

  const tabs = {
    admin: [
      getNavItem(<FaTachometerAlt />, "Dashboard", "dashboard"),
      getNavItem(<FaUsers />, "Manage Users", "users"),
      getNavItem(<FaBalanceScale />, "Task Board", "taskboard"),
      getNavItem(<FaSmile />, "Mood & Wellness", "mood"),
      getNavItem(<FaChartLine />, "Analytics", "analytics"),
    ],
    employee: [
      getNavItem(<FaTachometerAlt />, "Dashboard", "dashboard"),
      getNavItem(<FaBalanceScale />, "Task Board", "taskboard"),
      getNavItem(<FaSmile />, "Mood & Wellness", "mood"),
      getNavItem(<FaBullseye />, "My Goals", "goals"),
      getNavItem(<FaSitemap />, "Organization Chart", "orgchart"),
      getNavItem(<FaChartLine />, "Analytics", "analytics"),
    ],
    "team-lead": [
      getNavItem(<FaTachometerAlt />, "Dashboard", "dashboard"),
      getNavItem(<FaBalanceScale />, "Team Tasks", "taskboard"),
      getNavItem(<FaTasks />, "Assign Tasks", "assign"),
      getNavItem(<FaSmile />, "Add Mood", "mood"),
      getNavItem(<FaSmile />, "All Mood", "moods"),
      getNavItem(<FaBullseye />, "Goals", "goals"),
      getNavItem(<FaChartLine />, "Analytics", "analytics"),
    ],
  };

  return (
    <aside
      className={`bg-gradient-to-b from-[#0F1946] to-[#0d1538] ${
        isCollapsed ? "w-20" : "w-64"
      } min-h-screen flex flex-col justify-between p-4 text-white transition-all duration-300 shadow-xl`}
    >
      <div>
        {/* Logo */}
        <div className="flex items-center mb-8 justify-center">
          <img src={AdminLogo} alt="Logo" className="h-10" />
          {!isCollapsed && (
            <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200">
              InfinityOS
            </span>
          )}
        </div>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative">
            <img
              src={avatarToShow}
              alt="User Avatar"
              className={`rounded-full border-2 border-yellow-400 shadow-lg ${
                isCollapsed ? "w-12 h-12" : "w-20 h-20"
              } object-cover`}
            />
          
          </div>
          {!isCollapsed && (
            <>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {user.name || "User"}
              </h3>
              <div className="flex items-center justify-center mt-1">
                <span className="text-sm text-gray-300 capitalize">
                  {user.role}
                </span>
               
              </div>
            </>
          )}
        </div>

        {!isCollapsed && (
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3 px-4">
            Features
          </p>
        )}

        {/* Navigation */}
        <div className="space-y-2 px-1">{tabs[role] || []}</div>
      </div>

      {/* Logout Button */}
      <div className="mt-auto pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all text-white font-semibold py-3 px-4 rounded-lg shadow-md"
        >
          <FaPowerOff />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default RoleBasedSidebar;

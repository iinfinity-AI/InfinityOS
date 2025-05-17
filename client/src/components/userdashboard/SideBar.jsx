import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBalanceScale,
  FaSmile,
  FaPowerOff,
} from "react-icons/fa";
import InfinityLogo from "../../assets/navbar/Infinitylogo.png";
import Customer1 from "../../assets/userdashboard/Customer1.png"; // Default avatar
import axios from "axios"; // If you need to fetch data from an API
import API from "../../services/api";

const SideBar = ({ selectedTab, setSelectedTab, isCollapsed = false }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userAvatar, setUserAvatar] = useState("");
  const [userRole, setUserRole] = useState("User");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
     
        
      
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUserName(storedUser.name || "User");
          setUserAvatar(storedUser.profilePicture || "");
          setUserRole(storedUser.role || "User");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, []);

  const avatarToShow =
    userAvatar && userAvatar.trim() !== "" ? userAvatar : Customer1;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // Redirect to the login page or homepage
  };

  const tabItem = (icon, label, tabKey) => (
    <div
      key={tabKey}
      onClick={() => setSelectedTab(tabKey)}
      className={`flex items-center ${
        isCollapsed ? "justify-center" : "gap-3"
      } px-4 py-3 rounded-md cursor-pointer transition-all duration-200 ${
        selectedTab === tabKey
          ? "bg-yellow-400 text-black font-semibold"
          : "hover:bg-yellow-400 hover:text-black text-white"
      }`}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </div>
  );

  return (
    <aside
      className={`bg-[#0F1946] ${
        isCollapsed ? "w-20" : "w-64"
      } min-h-screen flex flex-col justify-between p-4 text-white transition-all duration-300`}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        {!isCollapsed && (
          <div className="flex items-center mb-6">
            <img src={InfinityLogo} alt="InfinityOS" className="h-10" />
          </div>
        )}

        {/* User Info */}
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
              <h3 className="mt-2 text-lg font-semibold">{userName}</h3>
              <p className="text-sm text-gray-300">{userRole}</p>
            </>
          )}
        </div>

        {/* Features title */}
        {!isCollapsed && (
          <p className="text-sm uppercase tracking-wide text-gray-400 mb-3">
            Features
          </p>
        )}

        {/* Navigation */}
        <div className="space-y-2">
          {tabItem(<FaTachometerAlt />, "Dashboard", "dashboard")}
          {tabItem(<FaBalanceScale />, "Task Board", "taskboard")}
          {tabItem(<FaSmile />, "Mood & Wellness", "mood")}
        </div>
      </div>

      {/* Log Out Button at bottom */}
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

export default SideBar;

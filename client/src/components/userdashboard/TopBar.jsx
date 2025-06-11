import React, { useState, useEffect } from "react";
import { FiMenu, FiLogOut, FiCalendar, FiUser, FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TopBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Update date every minute
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    // Get user from localStorage
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    // Navigate to login page
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="bg-[#E1EAFE] px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          className="text-3xl font-bold text-gray-700 hover:text-indigo-700 transition-colors"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>

        <div className="hidden md:flex items-center text-gray-700">
          <FiCalendar className="mr-2" />
          <span className="font-medium">{formatDate(currentDate)}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Profile Section */}
        <div className="flex items-center">
          <div
            onClick={goToProfile}
            className="flex items-center cursor-pointer hover:bg-indigo-100 rounded-lg py-1 px-2 transition-colors"
          >
            <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-indigo-300 mr-2">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800 leading-tight">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 leading-tight capitalize">
                {user?.role || "User"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          <FiLogOut />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;

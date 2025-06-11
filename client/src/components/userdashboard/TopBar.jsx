import React, { useState, useEffect } from "react";
import { FiMenu, FiLogOut, FiCalendar } from "react-icons/fi";
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

      <div className="flex items-center space-x-3">
     

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

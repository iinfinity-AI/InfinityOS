import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import InfinityLogo from "../../assets/navbar/Infinitylogo.png";
import DefaultAvatar from "../../assets/userdashboard/Customer1.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaEnvelope,
  FaTachometerAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

const HomeNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState(DefaultAvatar);
  const [userName, setUserName] = useState("User");
  const [dashboardPath, setDashboardPath] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setIsLoggedIn(true);
        setUserAvatar(userData.profilePicture || DefaultAvatar);
        setUserName(userData.name || "User");

        switch (userData.role) {
          case "Admin":
            setDashboardPath("/admin/dashboard");
            break;
          case "team-lead":
            setDashboardPath("/team-lead/dashboard");
            break;
          case "employee":
            setDashboardPath("/employee/dashboard");
            break;
          default:
            setDashboardPath("");
        }
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    navigate("/profile");
  };

  const navItems = [
    { path: "/", label: "Home", icon: <FaHome className="mr-2" /> },
    {
      path: "/about",
      label: "About Us",
      icon: <FaInfoCircle className="mr-2" />,
    },
    { path: "/services", label: "Services", icon: <FaCogs className="mr-2" /> },
    {
      path: "/contact",
      label: "Contact",
      icon: <FaEnvelope className="mr-2" />,
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black text-white shadow-lg sticky top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src={InfinityLogo} alt="InfinityOS" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md font-medium flex items-center ${
                  isActive(item.path)
                    ? "text-yellow-400 bg-gray-800 bg-opacity-60"
                    : "text-white hover:text-yellow-300 hover:bg-gray-800 hover:bg-opacity-40"
                } transition-all duration-200`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {isLoggedIn && dashboardPath && (
              <Link
                to={dashboardPath}
                className={`px-3 py-2 rounded-md font-medium flex items-center ${
                  isActive(dashboardPath)
                    ? "text-yellow-400 bg-gray-800 bg-opacity-60"
                    : "text-white hover:text-yellow-300 hover:bg-gray-800 hover:bg-opacity-40"
                } transition-all duration-200`}
              >
                <FaTachometerAlt className="mr-2" />
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Buttons / User Profile */}
          <div className="hidden md:flex space-x-3">
            {!isLoggedIn ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 shadow-md hover:shadow-lg text-black font-semibold px-5 py-2 rounded-lg transition duration-300"
                >
                  Sign Up
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="bg-black hover:bg-gray-800 border-2 border-yellow-400 shadow-md hover:shadow-lg text-yellow-400 font-semibold px-5 py-2 rounded-lg transition duration-300"
                >
                  Login
                </motion.button>
              </>
            ) : (
              <div
                className="flex items-center space-x-3 relative"
                ref={dropdownRef}
              >
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  <img
                    src={userAvatar}
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full border-2 border-yellow-400 transition-transform hover:scale-110 object-cover"
                  />
                  <span className="ml-2 text-yellow-300 font-medium hidden lg:block">
                    {userName}
                  </span>
                  <svg
                    className="w-4 h-4 ml-1 text-yellow-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm text-gray-300">Signed in as</p>
                        <p className="font-medium text-yellow-300 truncate">
                          {userName}
                        </p>
                      </div>
                      <button
                        onClick={handleProfileClick}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
                      >
                        <FaUserCircle className="mr-2" />
                        Your Profile
                      </button>
                      {dashboardPath && (
                        <Link
                          to={dashboardPath}
                          onClick={() => setShowDropdown(false)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
                        >
                          <FaTachometerAlt className="mr-2" />
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400 flex items-center"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg text-white font-semibold px-4 py-2 rounded-lg transition duration-300 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle mobile menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-md hover:bg-gray-800"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-3 pt-2 pb-4 space-y-2 bg-gray-900 border-t border-gray-800"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 font-medium rounded-md flex items-center ${
                  isActive(item.path)
                    ? "text-yellow-400 bg-gray-800"
                    : "text-white hover:bg-gray-800 hover:text-yellow-300"
                } transition-all duration-200`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {isLoggedIn && dashboardPath && (
              <Link
                to={dashboardPath}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 font-medium rounded-md flex items-center ${
                  isActive(dashboardPath)
                    ? "text-yellow-400 bg-gray-800"
                    : "text-white hover:bg-gray-800 hover:text-yellow-300"
                } transition-all duration-200`}
              >
                <FaTachometerAlt className="mr-2" />
                Dashboard
              </Link>
            )}

            {isLoggedIn && (
              <div className="px-4 py-3 border-t border-gray-800 flex items-center">
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 border-yellow-400 object-cover"
                />
                <span className="ml-2 text-yellow-300 font-medium">
                  {userName}
                </span>
              </div>
            )}

            {!isLoggedIn ? (
              <div className="space-y-2 pt-2 border-t border-gray-800">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/signup");
                  }}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-4 py-3 rounded-md flex items-center justify-center"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold px-4 py-3 rounded-md flex items-center justify-center"
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-2 border-t border-gray-800">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full bg-gray-800 text-white font-semibold px-4 py-3 rounded-md flex items-center"
                >
                  <FaUserCircle className="mr-2" />
                  Your Profile
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-3 rounded-md flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default HomeNav;

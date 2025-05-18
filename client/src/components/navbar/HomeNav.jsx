import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import InfinityLogo from '../../assets/navbar/Infinitylogo.png';
import DefaultAvatar from '../../assets/userdashboard/Customer1.png';

const HomeNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState(DefaultAvatar);
  const [userName, setUserName] = useState("User");
  const [dashboardPath, setDashboardPath] = useState("");

  const isActive = (path) => location.pathname === path;

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
            setDashboardPath("/user/dashboard");
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
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={InfinityLogo} alt="InfinityOS" className="h-8 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className={`px-3 py-2 font-semibold ${isActive('/') ? 'text-yellow-400' : 'text-white'} hover:text-yellow-300`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 font-semibold ${isActive('/about') ? 'text-yellow-400' : 'text-white'} hover:text-yellow-300`}
            >
              About Us
            </Link>
            <Link
              to="/services"
              className={`px-3 py-2 font-semibold ${isActive('/services') ? 'text-yellow-400' : 'text-white'} hover:text-yellow-300`}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 font-semibold ${isActive('/contact') ? 'text-yellow-400' : 'text-white'} hover:text-yellow-300`}
            >
              Contact
            </Link>

            {/* Dashboard Link (Role-based) */}
            {isLoggedIn && dashboardPath && (
              <Link
                to={dashboardPath}
                className={`px-3 py-2 font-semibold ${isActive(dashboardPath) ? 'text-yellow-400' : 'text-white'} hover:text-yellow-300`}
              >
                Dashboard
              </Link>
            )}
          </div>


          <div className="hidden md:flex space-x-2">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-1 rounded"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-1 rounded"
                >
                  Login
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  onClick={handleAvatarClick}
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-yellow-400"
                />
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle mobile menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-3 py-2 font-semibold ${isActive('/') ? 'text-yellow-400' : 'text-white'} hover:text-yellow-300`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-3 py-2 ${isActive('/about') ? 'text-yellow-400' : 'text-white'} hover:text-yellow-300`}
          >
            About Us
          </Link>
          <Link
            to="/services"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-3 py-2 ${isActive('/services') ? 'text-yellow-400' : 'text-white'} hover:text-yellow-300`}
          >
            Services
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-3 py-2 ${isActive('/contact') ? 'text-yellow-400' : 'text-white'} hover:text-yellow-300`}
          >
            Contact
          </Link>

          {/* Role-based Dashboard */}
          {isLoggedIn && dashboardPath && (
            <Link
              to={dashboardPath}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 ${isActive(dashboardPath) ? 'text-yellow-400' : 'text-white'} hover:text-yellow-300`}
            >
              Dashboard
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/signup');
                }}
                className="block w-full text-left px-3 py-2 text-white hover:text-yellow-300"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/login');
                }}
                className="block w-full text-left px-3 py-2 text-white hover:text-yellow-300"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="block w-full text-left px-3 py-2 text-white hover:text-yellow-300"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default HomeNav;

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
    navigate("/profile");
  };

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img src={InfinityLogo} alt="InfinityOS" className="h-8 w-auto" />
          </div>

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

            {isLoggedIn && dashboardPath && (
              <Link
                to={dashboardPath}
                className={`px-3 py-2 font-semibold ${isActive(dashboardPath) ? 'text-yellow-400' : 'text-white'} hover:text-yellow-300`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:flex space-x-3">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-yellow-400 hover:bg-yellow-500 shadow-md hover:shadow-lg text-black font-semibold px-5 py-2 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-yellow-400 hover:bg-yellow-500 shadow-md hover:shadow-lg text-black font-semibold px-5 py-2 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Login
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  onClick={handleAvatarClick}
                  className="w-9 h-9 rounded-full cursor-pointer border-2 border-yellow-400 transition-transform hover:scale-110"
                />
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg text-white font-semibold px-5 py-2 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle mobile menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none text-3xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-3 pt-2 pb-4 space-y-2 bg-black">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-4 py-2 font-semibold rounded ${isActive('/') ? 'text-yellow-400 bg-yellow-900' : 'text-white hover:bg-yellow-700 hover:text-yellow-300'} transition`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-4 py-2 font-semibold rounded ${isActive('/about') ? 'text-yellow-400 bg-yellow-900' : 'text-white hover:bg-yellow-700 hover:text-yellow-300'} transition`}
          >
            About Us
          </Link>
          <Link
            to="/services"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-4 py-2 font-semibold rounded ${isActive('/services') ? 'text-yellow-400 bg-yellow-900' : 'text-white hover:bg-yellow-700 hover:text-yellow-300'} transition`}
          >
            Services
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-4 py-2 font-semibold rounded ${isActive('/contact') ? 'text-yellow-400 bg-yellow-900' : 'text-white hover:bg-yellow-700 hover:text-yellow-300'} transition`}
          >
            Contact
          </Link>

          {isLoggedIn && dashboardPath && (
            <Link
              to={dashboardPath}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2 font-semibold rounded ${isActive(dashboardPath) ? 'text-yellow-400 bg-yellow-900' : 'text-white hover:bg-yellow-700 hover:text-yellow-300'} transition`}
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
                className="w-full text-left bg-yellow-400 hover:bg-yellow-500 shadow-md hover:shadow-lg text-black font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/login');
                }}
                className="w-full text-left mt-2 bg-yellow-400 hover:bg-yellow-500 shadow-md hover:shadow-lg text-black font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
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
              className="w-full text-left bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg text-white font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
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

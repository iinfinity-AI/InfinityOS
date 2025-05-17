import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InfinityLogo from '../../assets/navbar/Infinitylogo.png';

const HomeNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const isActive = (path) => location.pathname === path;

  // Check if the user is logged in based on localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    setIsLoggedIn(false); // Set login status to false
    navigate("/"); // Redirect to home or login page
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
            <a
              href="/"
              className={`px-3 py-2 font-semibold ${
                isActive('/') ? 'text-yellow-400' : 'text-white'
              } hover:text-yellow-300`}
            >
              Home
            </a>
            <a
              href="/about"
              className={`px-3 py-2 font-semibold ${
                isActive('/about') ? 'text-yellow-400' : 'text-white'
              } hover:text-yellow-300`}
            >
              About Us
            </a>
            <a
              href="/services"
              className={`px-3 py-2 font-semibold ${
                isActive('/services') ? 'text-yellow-400' : 'text-white'
              } hover:text-yellow-300`}
            >
              Services
            </a>
            <a
              href="/contact"
              className={`px-3 py-2 font-semibold ${
                isActive('/contact') ? 'text-yellow-400' : 'text-white'
              } hover:text-yellow-300`}
            >
              Contact
            </a>
          </div>

          {/* Auth/Logout Buttons */}
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
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1 rounded"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
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
          <a href="/" className="block px-3 py-2 text-yellow-400 font-semibold">
            Home
          </a>
          <a href="/about" className="block px-3 py-2 text-white hover:text-yellow-300">
            About Us
          </a>
          <a href="/services" className="block px-3 py-2 text-white hover:text-yellow-300">
            Services
          </a>
          <a href="/contact" className="block px-3 py-2 text-white hover:text-yellow-300">
            Contact
          </a>
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

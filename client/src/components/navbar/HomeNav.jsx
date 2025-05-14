import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import Infinitylogo from '../../assets/navbar/Infinitylogo.png';

const HomeNav = () => {
  const location = useLocation(); // Get current location (current URL path)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // A helper function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for mobile menu */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-between sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              {/* Replace InfinityOS Text with Image */}
              <img src={Infinitylogo} alt="InfinityOS Logo" className="h-10" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  href="/"
                  className={`${
                    isActive('/')
                      ? 'border-b-2 border-yellow-400 text-yellow-400'
                      : 'text-yellow-400 hover:bg-blue-700 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Home
                </a>
                <a
                  href="/about"
                  className={`${
                    isActive('/about')
                      ? 'border-b-2 border-yellow-400 text-yellow-400'
                      : 'text-yellow-400 hover:bg-blue-700 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  About Us
                </a>
                <a
                  href="/services"
                  className={`${
                    isActive('/services')
                      ? 'border-b-2 border-yellow-400 text-yellow-400'
                      : 'text-yellow-400 hover:bg-blue-700 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Services
                </a>
                <a
                  href="/contact"
                  className={`${
                    isActive('/contact')
                      ? 'border-b-2 border-yellow-400 text-yellow-400'
                      : 'text-yellow-400 hover:bg-blue-700 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Contact
                </a>
                <a
                  href="/signup"
                  className={`${
                    isActive('/signup')
                      ? 'border-b-2 border-yellow-400 text-yellow-400'
                      : 'text-yellow-400 hover:bg-blue-700 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Sign Up
                </a>
                <a
                  href="/login"
                  className={`${
                    isActive('/login')
                      ? 'border-b-2 border-yellow-400 text-yellow-400'
                      : 'text-yellow-400 hover:bg-blue-700 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/"
                className="text-yellow-400 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-yellow-400 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About Us
              </a>
              <a
                href="/services"
                className="text-yellow-400 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Services
              </a>
              <a
                href="/contact"
                className="text-yellow-400 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </a>
              <a
                href="/signup"
                className="text-yellow-400 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Sign Up
              </a>
              <a
                href="/login"
                className="text-yellow-400 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HomeNav;

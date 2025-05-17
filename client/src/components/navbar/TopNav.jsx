import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");

  const navItems = ["Dashboard", "Requests", "Payroll", "Company", "Extras"];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3 flex justify-between items-center">
      {/* Left - Logo & Menu Toggle */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Center - Navigation Links (Desktop Only) */}
      <div className="hidden md:flex gap-6 text-gray-800 font-medium">
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            onClick={() => setActiveLink(item)}
            className={`pb-1 ${
              activeLink === item ? "border-b-2 border-yellow-400" : ""
            }`}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right - Avatar */}
      <div className="flex items-center gap-4">
        <Link to="/profile">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
              alt="profile"
              className="w-8 h-8 rounded-full border"
            />
          </div>
        </Link>
      </div>

      {/* Mobile Nav Links Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white flex flex-col p-4 gap-3 shadow-md md:hidden z-10">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => {
                setActiveLink(item);
                setMenuOpen(false);
              }}
              className={`text-gray-800 ${
                activeLink === item ? "font-semibold text-yellow-600" : ""
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

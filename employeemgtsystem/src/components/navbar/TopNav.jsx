import { useState } from "react";
import { FaBars, FaBell, FaEnvelope } from "react-icons/fa";

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-md px-4 py-3 flex justify-between items-center relative">
      {/* Left - Logo & Menu Toggle */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
        <span className="text-lg font-bold text-gray-800">InfinityOS</span>
      </div>

      {/* Center - Navigation Links (Desktop Only) */}
      <div className="hidden md:flex gap-6 text-gray-800 font-medium">
        <a href="#" className="border-b-2 border-yellow-400 pb-1">Dashboard</a>
        <a href="#">Requests</a>
        <a href="#">Payroll</a>
        <a href="#">Company</a>
        <a href="#">Extras</a>
      </div>

      {/* Right - Notification Icons + Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="bg-indigo-900 text-white p-2 rounded-full">
            <FaBell className="text-xl" />
          </div>
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full shadow">
            13
          </span>
        </div>
        <div className="relative">
          <div className="bg-green-700 text-white p-2 rounded-full">
            <FaEnvelope className="text-xl" />
          </div>
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full shadow">
            13
          </span>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
          alt="profile"
          className="w-8 h-8 rounded-full border"
        />
      </div>

      {/* Mobile Nav Links Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white flex flex-col p-4 gap-3 shadow-md md:hidden z-10">
          <a href="#" className="text-gray-800">Dashboard</a>
          <a href="#" className="text-gray-800">Requests</a>
          <a href="#" className="text-gray-800">Payroll</a>
          <a href="#" className="text-gray-800">Company</a>
          <a href="#" className="text-gray-800">Extras</a>
        </div>
      )}
    </div>
  );
}

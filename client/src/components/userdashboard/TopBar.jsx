import React from "react";
import { FiMenu, FiSearch } from "react-icons/fi";
import { BsBell, BsEnvelope } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

const TopBar = () => {
  return (
    <header className="bg-[#E1EAFE] px-6 py-3 flex items-center justify-between">
      {/* Left: Hamburger and Filter */}
      <div className="flex items-center space-x-4">
        <button className="text-3xl font-bold">
          <FiMenu />
        </button>

        <select className="bg-[#29469B] text-white rounded px-4 py-2 cursor-pointer">
          <option>All Candidates</option>
          {/* Add other options here */}
        </select>

        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-xl pl-10 pr-4 py-2 border border-gray-200 focus:outline-none"
          />
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <IconWithBadge icon={<BsBell />} badgeCount={13} bgColor="bg-[#29469B]" />
        <IconWithBadge icon={<FiSettings />} badgeCount={0} bgColor="bg-yellow-400" />
        <IconWithBadge icon={<BsEnvelope />} badgeCount={13} bgColor="bg-green-600" />
      </div>
    </header>
  );
};

const IconWithBadge = ({ icon, badgeCount, bgColor }) => {
  return (
    <div className={`relative p-3 rounded-full cursor-pointer ${bgColor} text-white`}>
      {icon}
      {badgeCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
          {badgeCount}
        </span>
      )}
    </div>
  );
};

export default TopBar;

import React from "react";
import { FiMenu } from "react-icons/fi";

const TopBar = ({ toggleSidebar }) => {
  return (
    <header className="bg-[#E1EAFE] px-6 py-3 flex items-center justify-between">
      <div>
        <button className="text-3xl font-bold" onClick={toggleSidebar}>
          <FiMenu />
        </button>
      </div>
    </header>
  );
};


export default TopBar;

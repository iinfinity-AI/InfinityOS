import React from "react";
import { FiMenu } from "react-icons/fi";
import { BsBell, BsEnvelope } from "react-icons/bs";

const TopBar = ({ notificationsCount = 0, messagesCount = 0, toggleSidebar }) => {
  return (
    <header className="bg-[#E1EAFE] px-6 py-3 flex items-center justify-between">
      <div>
        <button className="text-3xl font-bold" onClick={toggleSidebar}>
          <FiMenu />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <IconWithBadge icon={<BsBell />} badgeCount={notificationsCount} bgColor="bg-[#29469B]" />
        <IconWithBadge icon={<BsEnvelope />} badgeCount={messagesCount} bgColor="bg-green-600" />
      </div>
    </header>
  );
};

const IconWithBadge = ({ icon, badgeCount, bgColor }) => (
  <div className={`relative p-3 rounded-full cursor-pointer ${bgColor} text-white`}>
    {icon}
    {badgeCount > 0 && (
      <span className="absolute top-0 right-0 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
        {badgeCount}
      </span>
    )}
  </div>
);

export default TopBar;

import { useState } from "react";
import {
  FaTachometerAlt,
  FaEnvelope,
  FaBriefcase,
  FaUserFriends,
  FaFileAlt,
  FaUsersCog,
  FaBook,
  FaChartLine,
  FaMoneyBillWave,
  FaPowerOff,
  FaBars,
} from "react-icons/fa";

const Adminsidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div
      className={`h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-[#080812] text-white flex flex-col justify-between fixed transition-all duration-300`}
    >
      <div>
        {/* Toggle Button */}
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={toggleSidebar}>
            <FaBars className="text-white text-xl" />
          </button>
        </div>

        {/* Admin Info */}
        {!collapsed && (
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-700">
            <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <p className="font-semibold">Aman Admin</p>
              <p className="text-sm text-gray-300">Admin</p>
            </div>
          </div>
        )}

        {/* Sidebar Items */}
        <nav className="mt-4">
          <SidebarItem icon={<FaTachometerAlt />} label="Dashboard" active collapsed={collapsed} />
          <SidebarItem icon={<FaEnvelope />} label="Messages" badge="13" collapsed={collapsed} />

          <Divider label="Recruitment" collapsed={collapsed} />
          <SidebarItem icon={<FaBriefcase />} label="Jobs" collapsed={collapsed} />
          <SidebarItem icon={<FaUserFriends />} label="Candidates" collapsed={collapsed} />
          <SidebarItem icon={<FaFileAlt />} label="Resumes" collapsed={collapsed} />

          <Divider label="Organization" collapsed={collapsed} />
          <SidebarItem icon={<FaUsersCog />} label="Employee Mgmt" collapsed={collapsed} />
          <SidebarItem icon={<FaBook />} label="Leave Mgmt" collapsed={collapsed} />
          <SidebarItem icon={<FaChartLine />} label="Performance" collapsed={collapsed} />
          <SidebarItem icon={<FaMoneyBillWave />} label="Payroll" collapsed={collapsed} />
        </nav>
      </div>

      <div className="p-4">
        <button className="bg-red-600 w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition">
          <FaPowerOff />
          {!collapsed && "Log Out"}
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false, badge, collapsed }) => (
  <div
    className={`flex items-center justify-between px-6 py-2 cursor-pointer hover:bg-[#1E2B50] ${
      active ? "bg-yellow-400 text-black font-semibold" : ""
    }`}
  >
    <div className="flex items-center gap-3">
      <span className="text-lg">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </div>
    {!collapsed && badge && (
      <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

const Divider = ({ label, collapsed }) =>
  !collapsed ? (
    <p className="px-6 text-sm uppercase text-gray-400 mt-6 mb-2">{label}</p>
  ) : (
    <div className="h-4 mt-4" />
  );

export default Adminsidebar;

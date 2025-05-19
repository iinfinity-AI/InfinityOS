import React from "react";
import { FaEnvelope, FaBriefcase, FaUsers, FaFileAlt, FaUserTie, FaCalendarAlt, FaMoneyBill } from "react-icons/fa";

const stats = [
  { icon: <FaEnvelope />, label: "Messages", value: 4, color: "bg-orange-400" },
  { icon: <FaBriefcase />, label: "Jobs", value: 1, color: "bg-blue-600" },
  { icon: <FaUsers />, label: "Candidates", value: 30, color: "bg-green-600" },
  { icon: <FaFileAlt />, label: "Resumes", value: 2, color: "bg-black" },
  { icon: <FaUserTie />, label: "Employees", value: 20, color: "bg-orange-600" },
  { icon: <FaCalendarAlt />, label: "Leaves", value: 8, color: "bg-blue-800" },
  { icon: <FaMoneyBill />, label: "Payrolls", value: 7, color: "bg-green-700" },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className={`p-4 rounded-lg text-white shadow-md ${stat.color}`}>
          <div className="text-xl mb-2">{stat.icon}</div>
          <div className="text-sm">{stat.label}</div>
          <div className="text-lg font-bold">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;

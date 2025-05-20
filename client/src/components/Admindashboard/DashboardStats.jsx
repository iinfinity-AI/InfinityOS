import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaUserTie,
  FaCalendarAlt,
  FaMoneyBill,
} from "react-icons/fa";
import API from "../../services/api";

const DashboardStats = () => {
  const [counts, setCounts] = useState({
    employees: 0,
    teamLeads: 0,
    tasks: 0,
    messages: 0,
    jobs: 0,
    candidates: 0,
    resumes: 0,
    leaves: 0,
    payrolls: 0,
  });

  useEffect(() => {
    API.get("/users")
      .then((res) => {
        const users = res.data.users || res.data;
        setCounts((prev) => ({
          ...prev,
          employees: users.filter((u) => u.role === "employee").length,
          teamLeads: users.filter((u) => u.role === "team-lead").length,
        }));
      })
      .catch(() => {});


    API.get("/tasks")
      .then((res) => {
        setCounts((prev) => ({
          ...prev,
          tasks: Array.isArray(res.data) ? res.data.length : 0,
        }));
      })
      .catch(() => {});
  }, []);

  const stats = [
    {
      icon: <FaUserTie />,
      label: "Employees",
      value: counts.employees,
      color: "bg-orange-600",
    },
    {
      icon: <FaUsers />,
      label: "Team Leads",
      value: counts.teamLeads,
      color: "bg-blue-600",
    },
    {
      icon: <FaBriefcase />,
      label: "Tasks",
      value: counts.tasks,
      color: "bg-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 sm:grid-cols-3  gap-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg text-white shadow-md ${stat.color}`}
        >
          <div className="text-xl mb-2">{stat.icon}</div>
          <div className="text-sm">{stat.label}</div>
          <div className="text-lg font-bold">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;

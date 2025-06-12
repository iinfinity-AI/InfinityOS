import React, { useEffect, useState } from "react";
import {
  FaUserTie,
  FaUsers,
  FaBriefcase,
  FaChartLine,
  FaCalendarCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import API from "../../services/api";

const DashboardStats = () => {
  const [counts, setCounts] = useState({
    employees: 0,
    teamLeads: 0,
    tasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    highPriorityTasks: 0,
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users data
        const usersRes = await API.get("/users");
        const users = usersRes.data.users || usersRes.data;
        
        // Fetch tasks data
        const tasksRes = await API.get("/tasks");
        const tasks = Array.isArray(tasksRes.data) ? tasksRes.data : [];
        
        // Update counts
        setCounts({
          employees: users.filter((u) => u.role === "employee").length,
          teamLeads: users.filter((u) => u.role === "team-lead").length,
          tasks: tasks.length,
          completedTasks: tasks.filter(task => task.status === "completed").length,
          pendingTasks: tasks.filter(task => task.status === "pending" || task.status === "in-progress").length,
          highPriorityTasks: tasks.filter(task => task.priority === "High").length,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const stats = [
    {
      icon: <FaUserTie className="h-6 w-6" />,
      label: "Employees",
      value: counts.employees,
      color: "from-orange-400 to-orange-600",
      increase: "+12%",
      bgLight: "bg-orange-50",
      textDark: "text-orange-700",
    },
    {
      icon: <FaUsers className="h-6 w-6" />,
      label: "Team Leads",
      value: counts.teamLeads,
      color: "from-blue-400 to-blue-600",
      increase: "+5%",
      bgLight: "bg-blue-50",
      textDark: "text-blue-700",
    },
    {
      icon: <FaBriefcase className="h-6 w-6" />,
      label: "Total Tasks",
      value: counts.tasks,
      color: "from-emerald-400 to-emerald-600",
      increase: "+18%",
      bgLight: "bg-emerald-50",
      textDark: "text-emerald-700",
    },
    {
      icon: <FaCalendarCheck className="h-6 w-6" />,
      label: "Completed Tasks",
      value: counts.completedTasks,
      color: "from-indigo-400 to-indigo-600",
      increase: "+7%",
      bgLight: "bg-indigo-50",
      textDark: "text-indigo-700",
    },
    {
      icon: <FaChartLine className="h-6 w-6" />,
      label: "Pending Tasks",
      value: counts.pendingTasks,
      color: "from-amber-400 to-amber-600",
      increase: "-3%",
      bgLight: "bg-amber-50",
      textDark: "text-amber-700",
    },
    {
      icon: <FaExclamationTriangle className="h-6 w-6" />,
      label: "High Priority",
      value: counts.highPriorityTasks,
      color: "from-rose-400 to-rose-600",
      increase: "+14%",
      bgLight: "bg-rose-50",
      textDark: "text-rose-700",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-4 w-24 bg-gray-200 mb-2 rounded"></div>
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={item}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className={`p-6 ${stat.bgLight}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className={`${stat.textDark} text-sm font-medium`}>
                  {stat.label}
                </div>
                <div className="mt-2 flex items-baseline">
                  <div className="text-2xl font-semibold">
                    {stat.value}
                  </div>
                  <div className={`ml-2 text-xs font-medium ${
                    stat.increase.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.increase}
                  </div>
                </div>
              </div>
              <div className={`p-2 rounded-lg bg-gradient-to-tr ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full bg-gradient-to-r ${stat.color}`} 
                  style={{ width: `${Math.min(100, stat.value * 5)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardStats;
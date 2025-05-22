// RecentCard.js
import React, { useEffect, useState } from "react";

import API from "../../services/api";

const RecentCard = () => {
   const [recents, setRecents] = useState([]);

  useEffect(() => {
    const fetchTeamLeadsAndTasks = async () => {
      try {
        const usersRes = await API.get("/users");
        const users = usersRes.data.users || usersRes.data;

        const teamLeads = users.filter((u) => u.role === "team-lead");

        const tasksRes = await API.get("/tasks");
        const tasks = tasksRes.data || [];

        const recentList = teamLeads.flatMap((lead) => {
          const leadTasks = tasks.filter(
            (t) =>
              t.assignedTo === lead._id ||
              (Array.isArray(t.assignedTo) && t.assignedTo.includes(lead._id))
          );
          return leadTasks.map((task) => ({
            team: lead.name,
            project: task.title,
            dueDate: task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date",
          }));
        });

        setRecents(recentList);
      } catch {
        setRecents([]);
      }
    };

    fetchTeamLeadsAndTasks();
  }, []);

  return (
    <div
      
      className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200 hover:border-indigo-400 h-full"
    >
      <h2 className="text-xl font-bold mb-4 text-indigo-600">Team Leads & Tasks</h2>
      {recents.length === 0 && (
        <div className="text-gray-400 text-sm">No recent tasks found.</div>
      )}
      {recents.map((item, index) => (
        <div
          key={index}
          className="bg-indigo-50 p-3 rounded mb-3 hover:bg-indigo-100 transition"
        >
          <p className="font-semibold text-gray-800">{item.team}</p>
          <p className="text-sm text-gray-600">{item.project}</p>
          <p className="text-xs text-gray-500">Due: {item.dueDate}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentCard;

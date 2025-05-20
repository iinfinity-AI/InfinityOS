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
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-bold mb-4">Team Leads & Tasks</h2>
      {recents.length === 0 && (
        <div className="text-gray-400 text-sm">No recent tasks found.</div>
      )}
      {recents.map((item, index) => (
        <div key={index} className="border p-3 rounded-lg mb-3">
          <p className="font-semibold">{item.team}</p>
          <p className="text-sm text-gray-500">{item.project}</p>
          <p className="text-xs text-gray-400">Due: {item.dueDate}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentCard;

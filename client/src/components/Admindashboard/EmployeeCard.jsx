import React, { useEffect, useState } from "react";
import { FaEye, FaDownload } from "react-icons/fa";
import API from "../../services/api";

const getMoodEmoji = (mood) => {
  if (!mood) return "🙂";
  if (mood === "happy") return "😊";
  if (mood === "sad") return "😢";
  if (mood === "neutral") return "😐";
  if (mood === "angry") return "😠";
  if (mood === "excited") return "🤩";
  return "🙂";
};

const EmployeeCard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch users, then fetch each employee's mood
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/users");
        const users = res.data.users || res.data;
        const employeeList = await Promise.all(
          users
            .filter((u) => u.role === "employee")
            .map(async (u) => {
              let mood = "";
              try {
                const moodRes = await API.get(`/moods/user/${u._id}`);
                mood = moodRes.data?.mood || "";
              } catch {
                mood = "";
              }
              return {
                name: u.name,
                tags: u.tags || [],
                mood,
              };
            })
        );
        setEmployees(employeeList);
      } catch {
        setEmployees([]);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-bold mb-4">Employees</h2>
      {employees.map((emp, index) => (
        <div key={index} className="flex items-center justify-between mb-3 border p-2 rounded">
          <div>
            <p className="font-semibold">{emp.name}</p>
            <p className="text-sm text-gray-500">
              Tags: {emp.tags.length > 0 ? emp.tags.join(", ") : "No tags"}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Mood Face */}
            <span title="Mood" className="text-2xl">{getMoodEmoji(emp.mood)}</span>
            <button className="text-green-600"><FaEye /></button>
            <button className="text-blue-600"><FaDownload /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeCard;

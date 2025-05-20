import React, { useEffect, useState } from "react";
import { FaEye, FaDownload } from "react-icons/fa";
import API from "../../services/api";

const getMoodEmoji = (mood) => {
  if (!mood) return "🙂";
  if (mood === "happy") return "😊";
  if (mood === "neutral") return "😐";
  if (mood === "sad") return "😢";
  if (mood === "stressed") return "😠";
  if (mood === "frustrated") return "😣";
  if (mood === "satisfied") return "😌";
  return "🙂";
};

const EmployeeCard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployeesAndMoods = async () => {
      try {
        // Get all users
        const res = await API.get("/users");
        const users = res.data.users || res.data;

        // Get all moods
        const moodsRes = await API.get("/allmood");
        const moods = moodsRes.data || [];

        // For each employee, find their latest mood by matching user._id
        const employeeList = users
          .filter((u) => u.role === "employee")
          .map((u) => {
            // Find all moods for this user
            const userMoods = moods.filter((m) => m.user && m.user._id === u._id);
            // Sort moods by createdAt (or updatedAt) descending
            let latestMood = "";
            if (userMoods.length > 0) {
              userMoods.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              latestMood = userMoods[0].mood;
            }
            return {
              name: u.name,
              tags: u.tags || [],
              mood: latestMood,
            };
          });

        setEmployees(employeeList);
      } catch {
        setEmployees([]);
      }
    };
    fetchEmployeesAndMoods();
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
            <span title="Mood" className="text-2xl">{getMoodEmoji(emp.mood)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeCard;

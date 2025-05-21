// EmployeeCard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployeesAndMoods = async () => {
      try {
        const res = await API.get("/users");
        const users = res.data.users || res.data;

        const moodsRes = await API.get("/allmood");
        const moods = moodsRes.data || [];

        const employeeList = users
          .filter((u) => u.role === "employee")
          .map((u) => {
            const userMoods = moods.filter((m) => m.user && m.user._id === u._id);
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
    <div
      onClick={() => navigate("/admin/users")}
      className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200 hover:border-yellow-400 h-full"
    >
      <h2 className="text-xl font-bold mb-4 text-yellow-600">Employees</h2>
      {employees.map((emp, index) => (
        <div
          key={index}
          className="flex items-center justify-between mb-3 bg-yellow-50 rounded p-3 hover:bg-yellow-100 transition"
        >
          <div>
            <p className="font-semibold text-gray-800">{emp.name}</p>
            <p className="text-sm text-gray-500">
              Tags: {emp.tags.length > 0 ? emp.tags.join(", ") : "No tags"}
            </p>
          </div>
          <span title="Mood" className="text-2xl">{getMoodEmoji(emp.mood)}</span>
        </div>
      ))}
    </div>
  );
};

export default EmployeeCard;
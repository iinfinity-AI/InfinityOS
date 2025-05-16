import React, { useState, useEffect } from "react";
import axios from "axios";

const MoodHistory = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState("7"); // last 7 days

  useEffect(() => {
    const fetchMoodHistory = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/mood", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMoods(res.data);
      } catch (error) {
        console.error("Error fetching mood history:", error);
      }
      setLoading(false);
    };
    fetchMoodHistory();
  }, []);

  // Filter moods by date range
  const filteredMoods = moods.filter((mood) => {
    const daysAgo = (new Date() - new Date(mood.date)) / (1000 * 60 * 60 * 24);
    return daysAgo <= Number(dateFilter);
  });

  return (
    <div className="bg-white p-6 rounded shadow mt-8 max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Mood History</h2>

      <label className="block mb-2">
        Show entries from last:{" "}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="7">7 days</option>
          <option value="14">14 days</option>
          <option value="30">30 days</option>
        </select>
      </label>

      {loading ? (
        <p>Loading mood history...</p>
      ) : filteredMoods.length === 0 ? (
        <p>No mood entries found in this range.</p>
      ) : (
        <ul>
          {filteredMoods.map((entry) => (
            <li
              key={entry._id}
              className="border-b py-2"
            >
              <strong>{new Date(entry.date).toLocaleDateString()}</strong>: {entry.mood}
              {entry.note && <p className="text-sm italic">Note: {entry.note}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoodHistory;

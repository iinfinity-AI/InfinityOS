import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { FaSmile, FaMeh, FaFrown, FaAngry, FaGrinStars, FaSpinner } from "react-icons/fa";

const moodIcons = {
  happy: <FaGrinStars className="text-green-600 text-3xl" />,
  satisfied: <FaSmile className="text-blue-600 text-3xl" />,
  neutral: <FaMeh className="text-gray-500 text-3xl" />,
  stressed: <FaFrown className="text-yellow-600 text-3xl" />,
  frustrated: <FaAngry className="text-red-600 text-3xl" />,
};

const moodColors = {
  happy: "bg-green-50 border-green-400",
  satisfied: "bg-blue-50 border-blue-400",
  neutral: "bg-gray-50 border-gray-400",
  stressed: "bg-yellow-50 border-yellow-400",
  frustrated: "bg-red-50 border-red-400",
};

const GetAllMoods = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await API.get("/allmood");
        setMoods(response.data);
      } catch (err) {
        setError(
          err.response?.data?.error || err.message || "Failed to fetch moods"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  const getUserName = (user) => {
    if (typeof user === "object" && user !== null) {
      return user.name || "Unknown";
    }
    return "Loading name...";
  };

  const filteredMoods = moods
    .filter((mood) => filter === "all" || mood.mood === filter)
    .filter(
      (mood) =>
        getUserName(mood.user)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        mood.note?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const moodCounts = moods.reduce((acc, mood) => {
    acc[mood.mood] = (acc[mood.mood] || 0) + 1;
    return acc;
  }, {});

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="text-blue-600 text-4xl animate-spin" />
        <span className="ml-3 text-lg font-medium text-blue-600">
          Loading moods...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-red-600">Error: {error}</span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">User Mood Tracker</h1>
        <p className="text-gray-600 text-lg">
          Monitor and analyze team mood trends in real-time
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-5 rounded-xl shadow mb-8 gap-4">
        <input
          type="text"
          placeholder="🔍 Search by user or note..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full transition ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All ({moods.length})
          </button>
          {Object.entries(moodCounts).map(([mood, count]) => (
            <button
              key={mood}
              onClick={() => setFilter(mood)}
              className={`px-4 py-2 rounded-full capitalize transition ${
                filter === mood
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {mood} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Mood Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {Object.entries(moodCounts).map(([mood, count]) => (
          <div
            key={mood}
            className={`p-4 border-2 rounded-xl text-center shadow-sm hover:shadow-lg transition ${moodColors[mood]}`}
          >
            <div className="mb-2 flex justify-center">{moodIcons[mood]}</div>
            <p className="capitalize text-sm font-semibold">{mood}</p>
            <p className="text-2xl font-bold">{count}</p>
          </div>
        ))}
      </div>

      {/* Mood Cards */}
      {filteredMoods.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-white rounded-lg shadow">
          No moods match your search/filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMoods.map((mood) => (
            <div
              key={mood._id}
              className={`rounded-xl shadow hover:shadow-lg overflow-hidden border ${moodColors[mood.mood]}`}
            >
              <div className="p-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold capitalize text-gray-800">
                    {getUserName(mood.user)}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <span className="capitalize font-medium">{mood.mood}</span>
                    <span className="text-xs text-gray-400">
                      • {new Date(mood.createdAt).toLocaleDateString()}{" "}
                      {new Date(mood.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <div>{moodIcons[mood.mood]}</div>
              </div>
              <div className="p-4 border-t bg-white">
                {mood.note ? (
                  <p className="text-gray-700">{mood.note}</p>
                ) : (
                  <p className="text-gray-400 italic">No note provided</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllMoods;

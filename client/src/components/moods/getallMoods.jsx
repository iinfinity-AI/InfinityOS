import React, { useEffect, useState } from "react";
import API from "../../services/api";

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
    if (typeof user === 'object' && user !== null) {
      return user.name || 'Unknown';
    }
    return 'Loading name...';
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: "bg-green-100 text-green-800",
      satisfied: "bg-blue-100 text-blue-800",
      neutral: "bg-gray-100 text-gray-800",
      stressed: "bg-yellow-100 text-yellow-800",
      frustrated: "bg-red-100 text-red-800",
    };
    return moodColors[mood] || "bg-purple-100 text-purple-800";
  };

  const filteredMoods = moods
    .filter(mood => filter === "all" || mood.mood === filter)
    .filter(mood => 
      getUserName(mood.user).toLowerCase().includes(searchTerm.toLowerCase()) ||
      mood.note?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const moodCounts = moods.reduce((acc, mood) => {
    acc[mood.mood] = (acc[mood.mood] || 0) + 1;
    return acc;
  }, {});

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <span className="text-lg text-blue-600 animate-pulse">
        Loading moods...
      </span>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <span className="text-lg text-red-600">Error: {error}</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          User Mood Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Monitor and analyze team member moods
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search users or notes..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full ${filter === "all" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All ({moods.length})
            </button>
            {Object.entries(moodCounts).map(([mood, count]) => (
              <button
                key={mood}
                onClick={() => setFilter(mood)}
                className={`px-4 py-2 rounded-full ${filter === mood ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {mood} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mood Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {Object.entries(moodCounts).map(([mood, count]) => (
          <div 
            key={mood} 
            className={`p-4 rounded-lg shadow ${getMoodColor(mood)}`}
          >
            <div className="text-sm font-medium capitalize">{mood}</div>
            <div className="text-2xl font-bold">{count}</div>
          </div>
        ))}
      </div>

      {/* Mood Entries */}
      {filteredMoods.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-white rounded-lg shadow">
          No matching moods found
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMoods.map((mood) => (
            <div
              key={mood._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className={`p-4 ${getMoodColor(mood)}`}>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold capitalize">
                    {getUserName(mood.user)}
                  </h3>
                  <span className="text-xs bg-white bg-opacity-30 px-2 py-1 rounded-full">
                    {new Date(mood.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-1 flex items-center">
                  <span className="capitalize font-medium">{mood.mood}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">
                    {new Date(mood.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
              <div className="p-4 border-t">
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
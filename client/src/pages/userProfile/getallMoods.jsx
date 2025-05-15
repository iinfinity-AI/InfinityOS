import React, { useEffect, useState } from "react";
import API from "../../services/api";

const GetAllMoods = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-lg text-blue-600 animate-pulse">
          Loading moods...
        </span>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-lg text-red-600">Error: {error}</span>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
        Admin: User Moods
      </h1>
      <h2 className="text-lg text-gray-500 mb-8 text-center">
        View all users and their moods
      </h2>
      {moods.length === 0 ? (
        <div className="text-center text-gray-500">No moods found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {moods.map((mood) => (
            <div
              key={mood._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Mood:</span>
                <span className="ml-2 text-blue-600 font-medium">
                  {mood.mood}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Note:</span>
                <span className="ml-2 text-gray-600">
                  {mood.note || (
                    <span className="italic text-gray-400">No note</span>
                  )}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">User:</span>
                <span className="ml-2 text-green-700">{mood.user}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Date:</span>
                <span className="ml-2 text-gray-500">
                  {new Date(mood.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllMoods;

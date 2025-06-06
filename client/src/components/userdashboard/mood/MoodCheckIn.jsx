import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import API from "../../../services/api";
import { format, subDays, eachDayOfInterval, isSameDay } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const moodOptions = [
  {
    value: "happy",
    label: "Happy",
    color: "bg-green-500",
    emoji: "😊",
    chartColor: "rgba(16, 185, 129, 0.7)",
  },
  {
    value: "satisfied",
    label: "Satisfied",
    color: "bg-lime-500",
    emoji: "😌",
    chartColor: "rgba(101, 163, 13, 0.7)",
  },
  {
    value: "neutral",
    label: "Neutral",
    color: "bg-yellow-500",
    emoji: "😐",
    chartColor: "rgba(234, 179, 8, 0.7)",
  },
  {
    value: "sad",
    label: "Sad",
    color: "bg-blue-500",
    emoji: "😢",
    chartColor: "rgba(59, 130, 246, 0.7)",
  },
  {
    value: "frustrated",
    label: "Frustrated",
    color: "bg-orange-500",
    emoji: "😤",
    chartColor: "rgba(249, 115, 22, 0.7)",
  },
  {
    value: "stressed",
    label: "Stressed",
    color: "bg-red-500",
    emoji: "😫",
    chartColor: "rgba(239, 68, 68, 0.7)",
  },
];

const MoodHistory = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [moodData, setMoodData] = useState({ mood: "", note: "" });
  const [filter, setFilter] = useState("7days");

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      setLoading(true);
      const response = await API.get("/mood");
      setMoods(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch moods");
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const hasSubmittedToday = moods.some(
      (mood) => format(new Date(mood.createdAt), "yyyy-MM-dd") === today
    );
    if (hasSubmittedToday) {
      setError("You have already checked in today");
      return;
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setMoodData({ mood: "", note: "" });
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMoodData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!moodData.mood) {
      setError("Please select a mood");
      return;
    }
    try {
      await API.post("/mood", moodData);
      setSuccess("Mood saved successfully!");
      fetchMoods();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save mood");
    }
  };

  const getMoodDataForChart = () => {
    let days =
      filter === "30days" ? 30 : filter === "month" ? new Date().getDate() : 7;
    const dateRange = eachDayOfInterval({
      start: subDays(new Date(), days - 1),
      end: new Date(),
    });

    return dateRange.map((date) => {
      const moodEntry = moods.find((mood) =>
        isSameDay(new Date(mood.createdAt), date)
      );
      return {
        date: format(date, "MMM dd"),
        mood: moodEntry?.mood || null,
        note: moodEntry?.note || null,
        color: moodEntry
          ? moodOptions.find((m) => m.value === moodEntry.mood)?.chartColor
          : "rgba(229, 231, 235, 0.7)",
      };
    });
  };

  const chartData = {
    labels: getMoodDataForChart().map((item) => item.date),
    datasets: [
      {
        label: "Mood Level",
        data: getMoodDataForChart().map((item) => {
          switch (item.mood) {
            case "happy":
              return 6;
            case "satisfied":
              return 5;
            case "neutral":
              return 4;
            case "sad":
              return 3;
            case "frustrated":
              return 2;
            case "stressed":
              return 1;
            default:
              return 0;
          }
        }),
        backgroundColor: getMoodDataForChart().map((item) => item.color),
        borderColor: getMoodDataForChart().map((item) =>
          item.color.replace("0.7", "1")
        ),
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const item = getMoodDataForChart().find(
              (i) => i.date === context.label
            );
            const mood = moodOptions.find((m) => m.value === item?.mood);
            return mood
              ? `${mood.label}${item.note ? ` (${item.note})` : ""}`
              : "No mood recorded";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 6,
        ticks: {
          callback: (value) =>
            ({
              6: "😊 Happy",
              5: "😌 Satisfied",
              4: "😐 Neutral",
              3: "😢 Sad",
              2: "😤 Frustrated",
              1: "😫 Stressed",
            }[value] || ""),
        },
      },
    },
  };

  const filteredMoods = () => {
    const now = new Date();
    const cutoff = new Date(
      filter === "30days"
        ? now.setDate(now.getDate() - 30)
        : filter === "month"
        ? new Date(now.getFullYear(), now.getMonth(), 1)
        : now.setDate(now.getDate() - 7)
    );
    return moods.filter((mood) => new Date(mood.createdAt) >= cutoff);
  };

  const closeAlert = () => {
    setError(null);
    setSuccess(null);
  };
  const getMoodLabel = (val) =>
    moodOptions.find((m) => m.value === val)?.label || val;
  const getMoodColor = (val) =>
    moodOptions.find((m) => m.value === val)?.color || "bg-gray-500";
  const getMoodEmoji = (val) =>
    moodOptions.find((m) => m.value === val)?.emoji || "";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mood History</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleOpenModal}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg transition duration-300 shadow-md"
          >
            Add Mood Check-In
          </button>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <p>{error}</p>
            <button
              onClick={closeAlert}
              className="text-red-700 hover:text-red-900 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <p>{success}</p>
            <button
              onClick={closeAlert}
              className="text-green-700 hover:text-green-900 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-10 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Mood Trends
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Your emotional patterns at a glance
            </p>
            <div className="h-80">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Your Mood Entries
            </h2>
            {filteredMoods().length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-md text-center text-gray-500">
                No mood entries found for the selected period
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMoods().map((mood) => (
                  <div
                    key={mood._id}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div
                      className={`${getMoodColor(mood.mood)} h-2 rounded-t-2xl`}
                    ></div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                          <div className="bg-white shadow-sm rounded-full w-9 h-9 flex items-center justify-center text-xl border">
                            {getMoodEmoji(mood.mood)}
                          </div>
                          {getMoodLabel(mood.mood)}
                        </h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {format(new Date(mood.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                      {mood.note && (
                        <p className="mt-3 text-gray-600 text-sm bg-gray-100 p-3 rounded-lg border border-gray-200">
                          {mood.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Daily Mood Check-In
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  How are you feeling today?
                </label>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {moodOptions.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() =>
                        setMoodData({ ...moodData, mood: option.value })
                      }
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                        moodData.mood === option.value
                          ? "border-blue-500"
                          : "border-gray-200"
                      } hover:border-blue-300`}
                    >
                      <span className="text-2xl mb-1">{option.emoji}</span>
                      <span className="text-xs">{option.label}</span>
                    </button>
                  ))}
                </div>
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  Optional note (max 200 characters)
                </label>
                <textarea
                  name="note"
                  value={moodData.note}
                  onChange={handleChange}
                  maxLength={200}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="What's influencing your mood today?"
                />
                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={!moodData.mood}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodHistory;

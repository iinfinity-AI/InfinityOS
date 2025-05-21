import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import API from '../../../services/api';
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const moodOptions = [
  { value: 'happy', label: 'Very Happy', color: 'bg-green-500', emoji: '😄', chartColor: 'rgba(16, 185, 129, 0.7)' },
  { value: 'satisfied', label: 'Satisfied', color: 'bg-lime-500', emoji: '😊', chartColor: 'rgba(101, 163, 13, 0.7)' },
  { value: 'neutral', label: 'Neutral', color: 'bg-yellow-500', emoji: '😐', chartColor: 'rgba(234, 179, 8, 0.7)' },
  { value: 'sad', label: 'Sad', color: 'bg-blue-500', emoji: '😢', chartColor: 'rgba(59, 130, 246, 0.7)' },
  { value: 'frustrated', label: 'Frustrated', color: 'bg-orange-500', emoji: '😤', chartColor: 'rgba(249, 115, 22, 0.7)' },
  { value: 'stressed', label: 'Stressed', color: 'bg-red-500', emoji: '😫', chartColor: 'rgba(239, 68, 68, 0.7)' },
  { value: 'tired', label: 'Tired', color: 'bg-gray-500', emoji: '😴', chartColor: 'rgba(107, 114, 128, 0.7)' },
];

const MoodHistory = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [moodData, setMoodData] = useState({
    mood: '',
    note: ''
  });
  const [filter, setFilter] = useState('7days');

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      setLoading(true);
      const response = await API.get('/mood');
      setMoods(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch moods');
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const hasSubmittedToday = moods.some(mood => 
      format(new Date(mood.createdAt), 'yyyy-MM-dd') === today
    );

    if (hasSubmittedToday) {
      setError('You have already checked in today');
      return;
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setMoodData({ mood: '', note: '' });
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMoodData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!moodData.mood) {
      setError('Please select a mood');
      return;
    }

    try {
      await API.post('/mood', moodData);
      setSuccess('Mood saved successfully!');
      fetchMoods();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save mood');
    }
  };

  const getMoodDataForChart = () => {
    let days;
    switch (filter) {
      case '7days':
        days = 7;
        break;
      case '30days':
        days = 30;
        break;
      case 'month':
        const now = new Date();
        days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        break;
      default:
        days = 7;
    }

    const endDate = new Date();
    const startDate = subDays(endDate, days - 1);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const chartData = dateRange.map(date => {
      const dateStr = format(date, 'MMM dd');
      const moodEntry = moods.find(mood => 
        isSameDay(new Date(mood.createdAt), date)
      );
      
      return {
        date: dateStr,
        mood: moodEntry ? moodEntry.mood : null,
        note: moodEntry ? moodEntry.note : null,
        color: moodEntry ? moodOptions.find(m => m.value === moodEntry.mood)?.chartColor : 'rgba(229, 231, 235, 0.7)'
      };
    });

    return chartData;
  };

  const filteredMoods = () => {
    const now = new Date();
    let cutoffDate = new Date();

    switch (filter) {
      case '7days':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case 'month':
        cutoffDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      default:
        cutoffDate.setDate(now.getDate() - 7);
    }

    return moods.filter(mood => new Date(mood.createdAt) >= cutoffDate);
  };

  const getMoodLabel = (value) => {
    const mood = moodOptions.find(option => option.value === value);
    return mood ? mood.label : value;
  };

  const getMoodColor = (value) => {
    const mood = moodOptions.find(option => option.value === value);
    return mood ? mood.color : 'bg-gray-500';
  };

  const getMoodEmoji = (value) => {
    const mood = moodOptions.find(option => option.value === value);
    return mood ? mood.emoji : '';
  };

  const closeAlert = () => {
    setError(null);
    setSuccess(null);
  };

  // Prepare chart data
  const chartData = {
    labels: getMoodDataForChart().map(item => item.date),
    datasets: [
      {
        label: 'Mood Level',
        data: getMoodDataForChart().map(item => {
          // Assign numerical values to moods for the chart
          if (!item.mood) return 0;
          switch(item.mood) {
            case 'happy': return 7;
            case 'satisfied': return 6;
            case 'neutral': return 5;
            case 'sad': return 4;
            case 'frustrated': return 3;
            case 'stressed': return 2;
            case 'tired': return 1;
            default: return 0;
          }
        }),
        backgroundColor: getMoodDataForChart().map(item => 
          item.mood ? moodOptions.find(m => m.value === item.mood)?.chartColor : 'rgba(229, 231, 235, 0.7)'
        ),
        borderColor: getMoodDataForChart().map(item => 
          item.mood ? moodOptions.find(m => m.value === item.mood)?.chartColor : 'rgba(229, 231, 235, 1)'
        ),
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const date = context.label;
            const data = getMoodDataForChart().find(item => item.date === date);
            if (data && data.mood) {
              const mood = moodOptions.find(m => m.value === data.mood);
              return `${mood.label} ${data.note ? `(${data.note})` : ''}`;
            }
            return 'No mood recorded';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 7,
        ticks: {
          callback: function(value) {
            switch(value) {
              case 7: return '😄 Very Happy';
              case 6: return '😊 Satisfied';
              case 5: return '😐 Neutral';
              case 4: return '😢 Sad';
              case 3: return '😤 Frustrated';
              case 2: return '😫 Stressed';
              case 1: return '😴 Tired';
              default: return '';
            }
          }
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mood History</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleOpenModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors shadow-md"
          >
            Add Mood Check-In
          </button>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <p>{error}</p>
            <button onClick={closeAlert} className="text-red-700 hover:text-red-900 text-xl">
              &times;
            </button>
          </div>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <p>{success}</p>
            <button onClick={closeAlert} className="text-green-700 hover:text-green-900 text-xl">
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
          {/* Mood Trends Section */}
          <div className="mb-10 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mood Trends</h2>
            <div className="h-80">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Mood Entries Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Mood Entries</h2>
            {filteredMoods().length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-md text-center text-gray-500">
                No mood entries found for the selected period
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMoods().map((mood) => (
                  <div key={mood._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`${getMoodColor(mood.mood)} h-3`}></div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800 text-lg flex items-center">
                          <span className="text-xl mr-2">{getMoodEmoji(mood.mood)}</span>
                          {getMoodLabel(mood.mood)}
                        </h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {format(new Date(mood.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                      {mood.note && (
                        <p className="mt-3 text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
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

      {/* Mood Entry Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Daily Mood Check-In</h2>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-3">
                    How are you feeling today?
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {moodOptions.map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        onClick={() => setMoodData({...moodData, mood: option.value})}
                        className={`flex flex-col items-center p-3 rounded-lg border-2 ${moodData.mood === option.value ? 'border-blue-500' : 'border-gray-200'} hover:border-blue-300 transition-colors`}
                      >
                        <span className="text-2xl mb-1">{option.emoji}</span>
                        <span className="text-xs">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-3">
                    Optional note (max 200 characters)
                  </label>
                  <textarea
                    name="note"
                    value={moodData.note}
                    onChange={handleChange}
                    maxLength={200}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What's influencing your mood today?"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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
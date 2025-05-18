import React, { useState, useEffect } from 'react';
import API from '../../../services/api';
import { format } from 'date-fns';

const moodOptions = [
  { value: 'happy', label: 'Very Happy', color: 'bg-green-500' },
  { value: 'satisfied', label: 'Satisfied', color: 'bg-lime-500' },
  { value: 'neutral', label: 'Neutral', color: 'bg-yellow-500' },
  { value: 'sad', label: 'Sad', color: 'bg-blue-500' },
  { value: 'frustrated', label: 'Frustrated', color: 'bg-orange-500' },
  { value: 'stressed', label: 'Stressed', color: 'bg-red-500' },
  { value: 'tired', label: 'Tired', color: 'bg-gray-500' },
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
    // Check if user already submitted mood today
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

  const closeAlert = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mood History</h1>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add Mood Check-In
        </button>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          <div className="flex justify-between items-center">
            <p>{error}</p>
            <button onClick={closeAlert} className="text-red-700 hover:text-red-900">
              &times;
            </button>
          </div>
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
          <div className="flex justify-between items-center">
            <p>{success}</p>
            <button onClick={closeAlert} className="text-green-700 hover:text-green-900">
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
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Mood Trends</h2>
            <div className="h-80">
              {/* Simple bar chart using Tailwind - for a more advanced chart, consider using a library like Chart.js */}
              <div className="flex items-end h-64 space-x-2 mt-4">
                {filteredMoods().slice(0, 7).map((mood, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-full ${getMoodColor(mood.mood)} rounded-t`}
                      style={{ height: `${(index + 1) * 10}%` }}
                    ></div>
                    <span className="text-xs mt-2 text-gray-600">
                      {format(new Date(mood.createdAt), 'MMM dd')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Mood Entries</h2>
          {filteredMoods().length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
              No mood entries found for the selected period
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMoods().map((mood) => (
                <div key={mood._id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className={`${getMoodColor(mood.mood)} h-2`}></div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800">{getMoodLabel(mood.mood)}</h3>
                      <span className="text-sm text-gray-500">
                        {format(new Date(mood.createdAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                    {mood.note && (
                      <p className="mt-2 text-gray-600 text-sm">{mood.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Mood Entry Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Mood Check-In</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    How are you feeling today?
                  </label>
                  <select
                    name="mood"
                    value={moodData.mood}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your mood</option>
                    {moodOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Optional note (max 200 characters)
                  </label>
                  <textarea
                    name="note"
                    value={moodData.note}
                    onChange={handleChange}
                    maxLength={200}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
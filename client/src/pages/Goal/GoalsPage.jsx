import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaHourglassHalf, FaPlus, FaTimes, FaTrash, FaEdit } from 'react-icons/fa';
import API from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GoalsPage = () => {
  // Form state for new goal
  const [formOpen, setFormOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: ''
  });
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentGoalId, setCurrentGoalId] = useState(null);

  // Add this state for the confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  // Fetch all goals on component mount
  useEffect(() => {
    fetchGoals();
  }, []);

  // Fetch goals from API
  const fetchGoals = async () => {
    setLoading(true);
    try {
      const response = await API.get('/goal');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast.error('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission for creating or updating a goal
  const handleSaveGoal = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editMode && currentGoalId) {
        // Update existing goal
        await API.put(`/goal/${currentGoalId}`, newGoal);
        toast.success('Goal updated successfully!');
      } else {
        // Create new goal
        await API.post('/goal', newGoal);
        toast.success('Goal created successfully!');
      }
      
      // Refresh goals list
      fetchGoals();
      
      // Reset form
      setNewGoal({
        title: '',
        description: '',
        deadline: ''
      });
      setFormOpen(false);
      setEditMode(false);
      setCurrentGoalId(null);
    } catch (error) {
      console.error('Error saving goal:', error);
      toast.error(error.response?.data?.error || 'Failed to save goal');
    } finally {
      setLoading(false);
    }
  };

  // Handle goal deletion
  const handleDeleteClick = (goalId) => {
    setGoalToDelete(goalId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await API.delete(`/goal/${goalToDelete}`);
      toast.success('Goal deleted successfully!');
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast.error(error.response?.data?.error || 'Failed to delete goal');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setGoalToDelete(null);
    }
  };

  // Handle goal status toggle
  const handleToggleStatus = async (goal) => {
    const newStatus = goal.status === 'pending' ? 'completed' : 'pending';
    
    setLoading(true);
    try {
      await API.put(`/goal/${goal._id}`, { status: newStatus });
      toast.success(`Goal marked as ${newStatus}!`);
      fetchGoals();
    } catch (error) {
      console.error('Error updating goal status:', error);
      toast.error(error.response?.data?.error || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEditGoal = (goal) => {
    setNewGoal({
      title: goal.title,
      description: goal.description,
      deadline: goal.deadline.split('T')[0] // Format date for input
    });
    setCurrentGoalId(goal._id);
    setEditMode(true);
    setFormOpen(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ToastContainer position="top-center" />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Goals & Objectives</h1>
        <button 
          onClick={() => {
            if (formOpen) {
              // Reset when closing
              setNewGoal({ title: '', description: '', deadline: '' });
              setEditMode(false);
              setCurrentGoalId(null);
            }
            setFormOpen(!formOpen);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {formOpen ? (
            <>
              <FaTimes className="mr-2" /> Cancel
            </>
          ) : (
            <>
              <FaPlus className="mr-2" /> New Goal
            </>
          )}
        </button>
      </div>

      {/* Goal Form */}
      {formOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {editMode ? 'Edit Goal' : 'Create New Goal'}
          </h2>
          <form onSubmit={handleSaveGoal}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newGoal.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={newGoal.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={newGoal.deadline}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : editMode ? 'Update Goal' : 'Save Goal'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Loading State */}
      {loading && !formOpen && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading goals...</p>
        </div>
      )}

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <div key={goal._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
                <span 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer ${
                    goal.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                  onClick={() => handleToggleStatus(goal)}
                >
                  {goal.status === 'completed' ? (
                    <>
                      <FaCheckCircle className="mr-1" /> Completed
                    </>
                  ) : (
                    <>
                      <FaHourglassHalf className="mr-1" /> Pending
                    </>
                  )}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{goal.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">Deadline:</span>
                <span className="ml-2">{formatDate(goal.deadline)}</span>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 flex justify-between">
              <button 
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                onClick={() => handleEditGoal(goal)}
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button 
                className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center"
                onClick={() => handleDeleteClick(goal._id)}
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {!loading && goals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No goals yet. Create your first goal to get started!</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this goal? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
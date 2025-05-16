import React from 'react';
import UserDashboard from './userDashboard';
import AdminDashboard from '../pages/Dashboard/dashboard';

const TeamLeadDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Team Lead Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of tasks and team management</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Tasks Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-600">My Assigned Tasks</h2>
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                {/** Task count could be dynamic */}
                {5} Tasks
              </span>
            </div>
            <UserDashboard />
          </div>

          {/* Team Management Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-purple-600">Team Management</h2>
              <div className="flex space-x-2">
                <button className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full hover:bg-purple-200 transition">
                  Filter
                </button>
                <button className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full hover:bg-purple-200 transition">
                  Sort
                </button>
              </div>
            </div>
            <AdminDashboard />
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500">Pending Tasks</h3>
            <p className="text-2xl font-bold mt-1">12</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
            <p className="text-2xl font-bold mt-1">8</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-2xl font-bold mt-1">24</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
            <h3 className="text-sm font-medium text-gray-500">Overdue</h3>
            <p className="text-2xl font-bold mt-1">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeadDashboard;
import React from 'react';
import UserDashboard from './userDashboard';
import AdminDashboard from '../pages/Admindashboard/dashboard';

const TeamLeadDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-blue-900 flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0V7m0 4l-4-4m0 0l-4 4"></path>
            </svg>
            Team Lead Dashboard
          </h1>
          <p className="text-gray-600 mt-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
            </svg>
            <span>
              Get a quick overview of your tasks, manage your team, and track progress at a glance.
            </span>
          </p>
        </header>

<div className="flex flex-row gap-10">
  <div className="flex-1">
    <div className=" p-10 mb-10">
      <UserDashboard />
    </div>
    <div className=" mb-10 p-10">
      <AdminDashboard />
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default TeamLeadDashboard;
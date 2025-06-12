import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { FaUserTie, FaUsers } from "react-icons/fa";

const OrgChart = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await API.get("/users"); // Endpoint for all users

      if (response.data) {
        setUserData(response.data);
      } else {
        setError("No user data available");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Render user card
  const renderUserCard = (user) => (
    <div
      key={user._id}
      className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow hover:border-blue-300"
    >
      <div className="flex items-center space-x-4">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.name}
            className="h-14 w-14 rounded-full object-cover border-2 border-blue-400"
          />
        ) : (
          <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <FaUserTie size={24} />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-600 capitalize">{user.role}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
          {user.phone && (
            <p className="text-xs text-gray-500">Phone: {user.phone}</p>
          )}
          {user.moodAverage && (
            <p className="text-xs mt-1">
              <span className="font-medium">Mood:</span> {user.moodAverage}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // Render all users by role
  const renderAllUsers = (data) => {
    // If data is an array (directly from API)
    if (Array.isArray(data)) {
      // Group users by role
      const admins = data.filter((user) => user.role.toLowerCase() === "admin");
      const teamLeads = data.filter(
        (user) => user.role.toLowerCase() === "team-lead"
      );
      const employees = data.filter(
        (user) => user.role.toLowerCase() === "employee"
      );

      return (
        <div className="space-y-8">
          {/* Admins */}
          {admins.length > 0 && (
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                <div className="bg-red-100 text-red-600 p-2 rounded-lg mr-2">
                  <FaUsers />
                </div>
                Administrators ({admins.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {admins.map((admin) => renderUserCard(admin))}
              </div>
            </div>
          )}

          {/* Team Leads */}
          {teamLeads.length > 0 && (
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg mr-2">
                  <FaUsers />
                </div>
                Team Leads ({teamLeads.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamLeads.map((lead) => renderUserCard(lead))}
              </div>
            </div>
          )}

          {/* Employees */}
          {employees.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-2">
                  <FaUsers />
                </div>
                Employees ({employees.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.map((employee) => renderUserCard(employee))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // If data is already categorized
    return (
      <div className="space-y-8">
        {/* Admins */}
        {data.admins && data.admins.length > 0 && (
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
              <div className="bg-red-100 text-red-600 p-2 rounded-lg mr-2">
                <FaUsers />
              </div>
              Administrators ({data.admins.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.admins.map((admin) => renderUserCard(admin))}
            </div>
          </div>
        )}

        {/* Team Leads */}
        {data.teamLeads && data.teamLeads.length > 0 && (
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
              <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg mr-2">
                <FaUsers />
              </div>
              Team Leads ({data.teamLeads.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.teamLeads.map((lead) => renderUserCard(lead))}
            </div>
          </div>
        )}

        {/* Employees */}
        {data.employees && data.employees.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-2">
                <FaUsers />
              </div>
              Employees ({data.employees.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.employees.map((employee) => renderUserCard(employee))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-500 text-center p-4 rounded-lg">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Company Directory</h2>
        <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {userData && Array.isArray(userData)
            ? `${userData.length} users`
            : userData
            ? `${
                (userData.admins?.length || 0) +
                (userData.teamLeads?.length || 0) +
                (userData.employees?.length || 0)
              } users`
            : "0 users"}
        </div>
      </div>


      {/* Users List */}
      {userData && renderAllUsers(userData)}
    </div>
  );
};

export default OrgChart;

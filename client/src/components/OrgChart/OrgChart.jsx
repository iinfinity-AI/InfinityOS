import React, { useState, useEffect } from "react";
import { FaUserTie, FaSitemap, FaUsers, FaUserFriends } from "react-icons/fa";

const OrgChart = () => {
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data matching your image structure
  const sampleData = {
    admins: [
      {
        id: "1",
        name: "Kasun putha",
        role: "Admin",
        email: "udayangakasun696@gmail.com",
        phone: "0765855386"
      },
      {
        id: "2",
        name: "DINITHS RUSIRU",
        role: "Admin",
        email: "dinithrusiru4@gmail.com",
        phone: "0773508024"
      }
    ],
    teamLeads: [
      {
        id: "3",
        name: "DINITHid RUSIRUd",
        role: "team-lead",
        email: "dinithrusiru1d@gmail.com",
        phone: "119"
      },
      {
        id: "4",
        name: "DINITHr RUSIRUr",
        role: "team-lead",
        email: "dinithrusiru1@gmail.comm"
      },
      {
        id: "5",
        name: "Kasun Udayanga",
        role: "team-lead",
        email: "udayangakasu696@gmail.com"
      },
      {
        id: "6",
        name: "DINITH RUSIRU",
        role: "team-lead",
        email: "dinithrusiru1@gmail.com",
        phone: "0773508023"
      }
    ],
    employees: [
      {
        id: "7",
        name: "D Udayanga",
        role: "employee",
        email: "kasun2001@gmail.com",
        phone: "0765855386"
      },
      {
        id: "8",
        name: "DINITHr RUSIRUr",
        role: "employee",
        email: "dinithrusiru1@gmail.com",
        phone: "0773508026"
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setOrgData(sampleData);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load organization data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderUserCard = (user) => (
    <div
      key={user.id}
      className="bg-white rounded-lg shadow p-4 border border-gray-200"
    >
      <div className="flex items-center space-x-4">
        <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <FaUserTie size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-600 capitalize">{user.role}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
          {user.phone && (
            <p className="text-xs text-gray-500">Phone: {user.phone}</p>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaSitemap className="mr-2" /> Organization Structure
      </h2>

      <div className="space-y-8">
        {/* Administrators Section */}
        {orgData.admins && orgData.admins.length > 0 && (
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Administrators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orgData.admins.map((admin) => renderUserCard(admin))}
            </div>
          </div>
        )}

        {/* Team Leads Section */}
        {orgData.teamLeads && orgData.teamLeads.length > 0 && (
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Team Leads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orgData.teamLeads.map((lead) => renderUserCard(lead))}
            </div>
          </div>
        )}

        {/* Employees Section */}
        {orgData.employees && orgData.employees.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Employees
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orgData.employees.map((employee) => renderUserCard(employee))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgChart;
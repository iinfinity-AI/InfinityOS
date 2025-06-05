import React, { useState, useEffect } from "react";
import API from "../../services/api";
import {
  FaUserTie,
  FaChevronDown,
  FaChevronRight,
  FaSitemap,
  FaUsers,
  FaUserFriends,
} from "react-icons/fa";

const OrgChart = () => {
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [activeTab, setActiveTab] = useState("org"); // Default tab: org chart view

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (tab) => {
    try {
      setLoading(true);

      let endpoint;
      switch (tab) {
        case "org":
          endpoint = "/org"; // Hierarchical org chart
          break;
        case "team":
          endpoint = "/team"; // User's team
          break;
        case "users":
          endpoint = "/users"; // All users by role
          break;
        default:
          endpoint = "/org";
      }

      const response = await API.get(endpoint);

      if (response.data) {
        setOrgData(response.data);
      } else {
        setError("No organization data available");
      }
    } catch (err) {
      console.error("Error fetching organization data:", err);
      setError("Failed to load organization data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const renderTabs = () => {
    const tabs = [
      { id: "org", label: "Org Chart", icon: <FaSitemap className="mr-2" /> },
      {
        id: "team",
        label: "My Team",
        icon: <FaUserFriends className="mr-2" />,
      },
      { id: "users", label: "All Users", icon: <FaUsers className="mr-2" /> },
    ];

    return (
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center py-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-blue-600 active"
                    : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderOrgNode = (node, level = 0, path = "0") => {
    const hasChildren = node.children && node.children.length > 0;
    const nodeId = path;
    const isExpanded = expandedNodes[nodeId] !== false; // Default to expanded
    const isCurrentUser = node.isCurrentUser; // Highlight the current user

    return (
      <div key={nodeId} className="flex flex-col items-center">
        {/* Node Box */}
        <div className="relative group">
          <div
            className={`border-2 rounded-lg p-3 shadow-md min-w-[200px] flex items-center gap-3 relative z-10 
            ${
              isCurrentUser
                ? "bg-yellow-50 border-yellow-500"
                : "bg-white border-blue-500"
            }`}
          >
            {/* Avatar/Icon */}
            {node.avatar ? (
              <img
                src={node.avatar}
                alt={node.name}
                className={`h-12 w-12 rounded-full object-cover border-2 
                  ${isCurrentUser ? "border-yellow-400" : "border-blue-400"}`}
              />
            ) : (
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center 
                ${
                  isCurrentUser
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                <FaUserTie size={20} />
              </div>
            )}

            {/* Name and Role */}
            <div className="flex-1">
              <div
                className={`font-semibold ${
                  isCurrentUser ? "text-yellow-900" : "text-blue-900"
                }`}
              >
                {node.name} {isCurrentUser && "(You)"}
              </div>
              <div className="text-sm text-gray-600">
                {node.role || "Role not specified"}
              </div>
            </div>

            {/* Expand/Collapse Button */}
            {hasChildren && (
              <button
                className={`rounded-full w-6 h-6 flex items-center justify-center transition-colors
                  ${
                    isCurrentUser
                      ? "bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                  }`}
                onClick={() => toggleNode(nodeId)}
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? (
                  <FaChevronDown size={14} />
                ) : (
                  <FaChevronRight size={14} />
                )}
              </button>
            )}
          </div>

          {/* Tooltip */}
          <div className="absolute z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-sm rounded-md py-2 px-3 shadow-lg top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
            <p>
              <strong>Email:</strong> {node.email || "N/A"}
            </p>
            {node.moodAverage && (
              <p>
                <strong>Mood Average:</strong> {node.moodAverage}
              </p>
            )}
          </div>
        </div>

        {/* Children container with vertical line */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col items-center">
            {/* Vertical connector line */}
            <div className="w-px h-8 bg-blue-500"></div>

            {/* Horizontal line for multiple children */}
            {node.children.length > 1 && (
              <div className="relative flex items-center justify-center">
                <div
                  className="h-px bg-blue-500"
                  style={{ width: `${(node.children.length - 1) * 220}px` }}
                ></div>
              </div>
            )}

            {/* Children nodes */}
            <div className="flex flex-wrap justify-center gap-x-10">
              {node.children.map((child, index) => (
                <div
                  key={`${path}-${index}`}
                  className="flex flex-col items-center"
                >
                  {/* Vertical connector to child */}
                  <div className="w-px h-8 bg-blue-500"></div>
                  {renderOrgNode(child, level + 1, `${path}-${index}`)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render user card for the All Users view
  const renderUserCard = (user) => (
    <div
      key={user._id} // Changed from user.Userid to user._id
      className="bg-white rounded-lg shadow p-4 border border-gray-200"
    >
      <div className="flex items-center space-x-4">
        {user.profilePicture ? ( // Changed from user.avatar to user.profilePicture
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
          <p className="text-sm text-gray-600">{user.role}</p>
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

  // Render team view with sections
  const renderTeamView = (data) => (
    <div className="space-y-8">
      {/* Current User */}
      {data.currentUser && (
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">You</h3>
          {renderUserCard(data.currentUser)}
        </div>
      )}

      {/* Manager */}
      {data.manager && (
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Your Manager
          </h3>
          {renderUserCard(data.manager)}
        </div>
      )}

      {/* Colleagues */}
      {data.colleagues && data.colleagues.length > 0 && (
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Your Colleagues
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.colleagues.map((colleague) => renderUserCard(colleague))}
          </div>
        </div>
      )}

      {/* Direct Reports */}
      {data.directReports && data.directReports.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Your Team Members
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.directReports.map((report) => renderUserCard(report))}
          </div>
        </div>
      )}
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
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Administrators
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {admins.map((admin) => renderUserCard(admin))}
              </div>
            </div>
          )}

          {/* Team Leads */}
          {teamLeads.length > 0 && (
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Team Leads
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamLeads.map((lead) => renderUserCard(lead))}
              </div>
            </div>
          )}

          {/* Employees */}
          {employees.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Employees
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
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Administrators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.admins.map((admin) => renderUserCard(admin))}
            </div>
          </div>
        )}

        {/* Team Leads */}
        {data.teamLeads && data.teamLeads.length > 0 && (
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Team Leads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.teamLeads.map((lead) => renderUserCard(lead))}
            </div>
          </div>
        )}

        {/* Employees */}
        {data.employees && data.employees.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Employees
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.employees.map((employee) => renderUserCard(employee))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render the content based on active tab
  const renderContent = () => {
    if (!orgData) return null;

    switch (activeTab) {
      case "org":
      case "fullOrg":
        return (
          <div className="min-w-fit flex justify-center p-4">
            {renderOrgNode(orgData)}
          </div>
        );
      case "team":
        return renderTeamView(orgData);
      case "users":
        return renderAllUsers(orgData);
      default:
        return <div>Select a view</div>;
    }
  };

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
    <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Organization Structure
      </h2>

      {/* Tabs */}
      {renderTabs()}

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default OrgChart;

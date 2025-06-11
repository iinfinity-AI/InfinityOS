import React, { useState, useEffect } from "react";
import {
  FaUserTie,
  FaChevronDown,
  FaChevronRight,
  FaSitemap,
} from "react-icons/fa";

const OrgChart = () => {
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});

  // Sample data - replace with your API call
  const sampleData = {
    id: "1",
    name: "CEO",
    role: "Chief Executive Officer",
    email: "ceo@company.com",
    avatar: "",
    isCurrentUser: false,
    children: [
      {
        id: "2",
        name: "CTO",
        role: "Chief Technology Officer",
        email: "cto@company.com",
        isCurrentUser: false,
        children: [
          {
            id: "3",
            name: "Dev Manager",
            role: "Development Manager",
            email: "dev@company.com",
            isCurrentUser: true,
            children: [
              {
                id: "4",
                name: "Senior Developer",
                role: "Senior Software Engineer",
                email: "senior@company.com",
                isCurrentUser: false,
              },
              {
                id: "5",
                name: "Junior Developer",
                role: "Software Engineer",
                email: "junior@company.com",
                isCurrentUser: false,
              },
            ],
          },
          {
            id: "6",
            name: "QA Manager",
            role: "Quality Assurance Manager",
            email: "qa@company.com",
            isCurrentUser: false,
          },
        ],
      },
      {
        id: "7",
        name: "CFO",
        role: "Chief Financial Officer",
        email: "cfo@company.com",
        isCurrentUser: false,
      },
    ],
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

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const renderOrgNode = (node, level = 0, path = "0") => {
    const hasChildren = node.children && node.children.length > 0;
    const nodeId = path;
    const isExpanded = expandedNodes[nodeId] !== false; // Default to expanded
    const isCurrentUser = node.isCurrentUser;

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
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaSitemap className="mr-2" /> Organization Chart
      </h2>

      <div className="min-w-fit flex justify-center p-4">
        {orgData && renderOrgNode(orgData)}
      </div>
    </div>
  );
};

export default OrgChart;
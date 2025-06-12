import React, { useEffect, useState } from "react";
import API from "../../../services/api.js";
import { FiClock, FiAlertCircle, FiCheckCircle, FiXCircle, FiActivity, FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";

const statusOptions = ["pending", "in-progress", "completed", "blocked"];

const statusIcons = {
  pending: <FiClock className="mr-1" />,
  "in-progress": <FiActivity className="mr-1" />,
  completed: <FiCheckCircle className="mr-1" />,
  blocked: <FiXCircle className="mr-1" />,
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  blocked: "bg-red-100 text-red-800 border-red-200",
};

const priorityColors = {
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  Critical: "bg-red-100 text-red-800 border-red-200",
};

const DashboardTable = ({ title, tasks, updatingId, handleStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [expandedTask, setExpandedTask] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header with title and search */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-100" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0V7m0 4l-4-4m0 0l-4 4"></path>
              </svg>
              {title}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} available
            </p>
          </div>
          
          <div className="relative">
            <div className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-blue-100 border border-blue-400/30 rounded-lg px-4 py-2 pl-9 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <FiSearch className="absolute left-3 top-3 text-blue-100" />
              </div>
              
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="ml-2 bg-white/10 border border-blue-400/30 rounded-lg p-2 text-white hover:bg-white/20 transition-colors duration-200 flex items-center"
              >
                <FiFilter className="mr-1" />
                <span className="hidden sm:inline">Filter</span>
                <FiChevronDown className={`ml-1 transform transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Filter dropdown */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Filter Tasks</h3>
                
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="all">All Statuses</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Priority</label>
                  <select 
                    value={priorityFilter} 
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="all">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setPriorityFilter("all");
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium mr-4"
                  >
                    Reset All
                  </button>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="text-xs text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        {filteredTasks.length === 0 ? (
          <div className="py-16 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 text-lg">No tasks match your criteria</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setPriorityFilter("all");
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center mx-auto"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Priority</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Due Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Assigned By</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task, idx) => (
                <React.Fragment key={task._id}>
                  <tr className={`${idx % 2 === 0 ? "" : "bg-gray-50"} hover:bg-blue-50 transition-colors duration-150`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 max-w-xs truncate" title={task.description}>
                        {task.description.length > 40 ? task.description.slice(0, 40) + "..." : task.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
                        {statusIcons[task.status]}
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                        <FiAlertCircle className="mr-1" />
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                        {task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed' && (
                          <p className="text-red-600 text-xs mt-1 font-medium">Overdue</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {task.createdBy?.profilePicture ? (
                          <img src={task.createdBy.profilePicture} alt={task.createdBy.name} className="w-6 h-6 rounded-full mr-2" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mr-2 text-xs font-bold">
                            {task.createdBy?.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}
                        <div className="text-sm text-gray-700">{task.createdBy?.name || "-"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <select
                        value={task.status}
                        disabled={updatingId === task._id}
                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </option>
                        ))}
                      </select>
                      {updatingId === task._id && (
                        <div className="ml-2 text-blue-500 flex items-center mt-1">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-xs font-medium">Updating</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setExpandedTask(expandedTask === task._id ? null : task._id)}
                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                      >
                        {expandedTask === task._id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded row for details */}
                  {expandedTask === task._id && (
                    <tr className="bg-indigo-50">
                      <td colSpan="8" className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Full Description</h4>
                            <p className="text-gray-700 whitespace-pre-line">{task.description}</p>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Due Date</h4>
                              <p className="text-gray-700">
                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                }) : "No due date set"}
                              </p>
                            </div>
                            
                            {task.notes && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                                <p className="text-gray-700">{task.notes}</p>
                              </div>
                            )}
                            
                            {task.attachments && task.attachments.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Attachments</h4>
                                <div className="flex flex-wrap gap-2">
                                  {task.attachments.map((attachment, i) => (
                                    <a 
                                      key={i}
                                      href={attachment.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-xs bg-white text-blue-700 hover:text-blue-900 border border-blue-200 rounded-lg px-2 py-1"
                                    >
                                      {attachment.name || `Attachment ${i+1}`}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    API.get("/tasks/get")
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleStatusChange = async (taskId, newStatus) => {
    setUpdatingId(taskId);
    try {
      await API.patch(`/tasks/change/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      alert("Failed to update status", err.message);
    }
    setUpdatingId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 p-8">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-3 text-lg text-gray-600 font-medium">Loading tasks...</span>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="text-xl font-bold text-gray-700 mb-2">No Tasks Found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          You don't have any assigned tasks at the moment. Tasks will appear here when they are assigned to you.
        </p>
      </div>
    );
  }

  return (
    <DashboardTable
      title={role === "team-lead" || role === "Team Lead" ? "My Assigned Tasks" : "My Tasks"}
      tasks={tasks}
      loading={loading}
      updatingId={updatingId}
      handleStatusChange={handleStatusChange}
    />
  );
};

export default UserDashboard;
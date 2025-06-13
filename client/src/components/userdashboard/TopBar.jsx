import React, { useState, useEffect } from "react";
import { FiMenu, FiLogOut, FiCalendar } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const TopBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = React.useRef(null);

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);


    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);


    fetchNotifications();


    const notificationTimer = setInterval(fetchNotifications, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(notificationTimer);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await API.get("/notifications");
      setNotifications(response.data);
      const unread = response.data.filter((note) => !note.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatNotificationTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} day ago`;

    return date.toLocaleDateString();
  };

  const handleLogout = () => {
  localStorage.clear();
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.read) {
        // Mark as read
        await API.patch(`/notifications/${notification._id}/read`);

        // Update local state
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notification._id ? { ...n, read: true } : n
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      // Navigate based on notification type
      if (notification.type === "task_assigned" && notification.relatedTask) {
        navigate("/dashboard/tasks");
      }

      setShowNotifications(false);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await API.post("/notifications/mark-all-read");

      // Update local state
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  return (
    <header className="bg-[#E1EAFE] px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          className="text-3xl font-bold text-gray-700 hover:text-indigo-700 transition-colors"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>

        <div className="hidden md:flex items-center text-gray-700">
          <FiCalendar className="mr-2" />
          <span className="font-medium">{formatDate(currentDate)}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Profile Section */}
        <div className="flex items-center">
          <div
            onClick={goToProfile}
            className="flex items-center cursor-pointer hover:bg-indigo-100 rounded-lg py-1 px-2 transition-colors"
          >
            <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-indigo-300 mr-2">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800 leading-tight">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 leading-tight capitalize">
                {user?.role || "User"}
              </p>
            </div>
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            className="relative p-2 text-gray-700 hover:bg-indigo-100 rounded-lg transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <FaBell className="text-xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50">
              <div className="bg-indigo-50 p-3 border-b border-indigo-100 flex justify-between items-center">
                <h3 className="font-semibold text-indigo-800">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-[350px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications yet
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <div
                        key={notification._id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`p-3 hover:bg-indigo-50 cursor-pointer transition-colors ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex">
                          <div
                            className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                              notification.type === "task_assigned"
                                ? "bg-indigo-100 text-indigo-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {notification.type === "task_assigned" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path
                                  fillRule="evenodd"
                                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <div
                              className={`text-sm ${
                                !notification.read
                                  ? "font-semibold"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.message}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {formatNotificationTime(notification.createdAt)}
                            </div>
                          </div>
                          {!notification.read && (
                            <div className="ml-2 flex-shrink-0">
                              <span className="inline-block h-2 w-2 rounded-full bg-indigo-600"></span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-2 bg-indigo-50 border-t border-indigo-100 text-center">
                <button
                  onClick={() => navigate("/dashboard/notifications")}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          <FiLogOut />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;

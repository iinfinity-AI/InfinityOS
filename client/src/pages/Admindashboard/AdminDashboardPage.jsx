import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Adminsidebar from "../../components/userdashboard/SideBar";
import Topbar from "../../components/userdashboard/TopBar";
import DashboardStats from "../../components/Admindashboard/DashboardStats";
import EmployeeCard from "../../components/Admindashboard/EmployeeCard";
import RecentCard from "../../components/Admindashboard/RecentCard";
import Allusers from "../../components/Admindashboard/rolechangedash";
import Moods from "../../components/moods/getallMoods";
import TaskFilterBar from "../../components/task/dashboard";

const DashboardPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-50">
      <Adminsidebar
        isCollapsed={isCollapsed}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="p-8 flex-1 bg-transparent overflow-y-auto">
          <div className="p-6 flex-1 bg-blue-50 overflow-y-auto relative">
            {/* Edit Profile Button */}
            <button
              onClick={() => navigate("/profile")}
              className="absolute top-6 right-6 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-blue-800 hover:to-blue-600 transition"
            >
              Edit Profile
            </button>

            {selectedTab === "dashboard" && (
              <>
                <h1 className="text-4xl font-extrabold mb-6 text-blue-900">
                  Welcome to Admin Dashboard
                </h1>
                <DashboardStats />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
                  <div>
                    <RecentCard />
                  </div>
                  <div>
                    <EmployeeCard />
                  </div>
                </div>
              </>
            )}

            {selectedTab === "taskboard" && (
              <div className="space-y-6 mt-4">
                <TaskFilterBar />
              </div>
            )}

            {selectedTab === "mood" && (
              <div className="space-y-6 mt-4">
                <Moods />
              </div>
            )}

            {selectedTab === "users" && (
              <div className="space-y-6 mt-4">
                <Allusers />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

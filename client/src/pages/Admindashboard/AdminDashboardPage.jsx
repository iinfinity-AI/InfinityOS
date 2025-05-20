import React, { useState } from "react";
import Adminsidebar from "../../components/userdashboard/SideBar";
import Topbar from "../../components/userdashboard/TopBar";
import DashboardStats from "../../components/Admindashboard/DashboardStats";
import EmployeeCard from "../../components/Admindashboard/EmployeeCard";
import RecentCard from "../../components/Admindashboard/RecentCard";
import TaskBoard from "../../components/Admindashboard/TaskBoard";
import Allusers from "../../components/Admindashboard/rolechangedash";
import Moods from "../../components/Admindashboard/getallMoods";
import TaskFilterBar from "../../components/Admindashboard/dashboard";
const DashboardPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <Adminsidebar
        isCollapsed={isCollapsed}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <div className="flex-1 flex flex-col transition-all duration-300">
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="p-6 flex-1 bg-blue-50 overflow-y-auto">
          {selectedTab === "dashboard" && (
            <>
              <h1 className="text-3xl font-bold mb-6 text-gray-800">
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
  );
};

export default DashboardPage;

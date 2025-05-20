import React, { useState } from "react";
import SideBar from "../../components/userdashboard/SideBar";
import TopBar from "../../components/userdashboard/TopBar";
import GreetingSection from "../../components/userdashboard/GreetingSection";
import AssignedToMeCard from "../../components/userdashboard/AssignedToMeCard";
import AssignedCommentsCard from "../../components/userdashboard/AssignedCommentsCard";
import TaskFilterBar from "../../components/userdashboard/taskboard/TaskFilterBar";
import MoodcheckIN from "../../components/userdashboard/mood/MoodCheckIn";
import NewTask from "../../components/task/dashboard";
import RecentCard from "../../components/Admindashboard/RecentCard";
import DashboardStats from "../../components/Admindashboard/DashboardStats";
import GetAllMoods from "../../components/moods/getallMoods";


const TeamLeadDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-[#E1EAFE]">
      {/* Sidebar */}
      <SideBar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isCollapsed={isSidebarCollapsed}
      />

      <div className="flex-1 flex flex-col overflow-x-hidden">
     
        <TopBar toggleSidebar={toggleSidebar} />

    
        <div className="ml-4 mr-4 mt-4">
          <GreetingSection user={user} />
        </div>

        {/* Main Content */}
        <div className="p-6 mt-4 mx-4 bg-[#E1EAFE] flex-1 overflow-y-auto rounded-lg">
          {selectedTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AssignedToMeCard />
              </div>
              <div className="space-y-6">
                <AssignedCommentsCard />
                 <DashboardStats />
            
                  <RecentCard />
              </div>
            </div>
          )}

          {selectedTab === "taskboard" && (
            <div className="space-y-6 mt-4">
              <TaskFilterBar />
            </div>
          )}

          {selectedTab === "mood" && (
            <div className="space-y-6 mt-4">
              <MoodcheckIN />
            </div>
          )}
           {selectedTab === "assign" && (
            <div className="space-y-6 mt-4">
              <NewTask/>
            </div>
          )}

            {selectedTab === "moods" && (
            <div className="space-y-6 mt-4">
              <GetAllMoods/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamLeadDashboardPage;
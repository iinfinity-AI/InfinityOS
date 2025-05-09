// adjust the path as needed
//import Topbar from "../components/Topbar";

import Adminsidebar from "../../components/admindashboard/Adminsidebar";
import Topbar from "../../components/admindashboard/Topbar";

const DashboardPage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Adminsidebar />

      {/* Main Content */}
      <div className="flex-1 ml-20 sm:ml-64 transition-all duration-300">
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
          {/* Add more content/components here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

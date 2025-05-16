import TopNav from "../components/navbar/TopNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "../pages/signup/SignupPage";
import LoginPage from "../pages/login/LoginPage";
import ResetPassword from "../pages/login/ResetPassword";
import HomePage from "../pages/homepage/HomePage";
import UserProfile from "../pages/userProfile/profile";
import TaskDashboard from "../pages/Dashboard/dashboard";
import MoodHistory from "../pages/userProfile/moodHistory";
import UserDashboard from "../components/userDashboard";
import GetallMoods from "../pages/userProfile/getallMoods";
import ProtectedRoute from "../components/ProtectedRoute";
import TeamLeadDashboard from "../components/teamLead";

function AppRoutes() {
  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["Admin", "employee"]}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mood"
          element={
            <ProtectedRoute allowedRoles={[ "employee"]}>
              <MoodHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin","team-lead"]}>
              <TaskDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moods"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <GetallMoods />
            </ProtectedRoute>
          }
        />

          <Route
          path="/team-lead/dashboard"
          element={
            <ProtectedRoute allowedRoles={["team-lead"]}>
              <TeamLeadDashboard />
            </ProtectedRoute>
          }/>
      </Routes>
    </Router>
  );
}

export default AppRoutes;

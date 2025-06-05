import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupPage from "../pages/signup/SignupPage";
import LoginPage from "../pages/login/LoginPage";
import ResetPassword from "../pages/login/ResetPassword";
import HomePage from "../pages/HomePage";
import UserDashboardPage from "../pages/Userdashboard/UserDashboardPage";
import UserProfile from "../pages/userProfile/profile";
import GetallMoods from "../components/moods/getallMoods";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import About from "../pages/about";
import Services from "../pages/services";
import Contact from "../pages/Contact";
import DashboardPage from "../pages/Admindashboard/AdminDashboardPage";
import TeamLeadDashboardPage from "../pages/TeamLeadDashboard/TeamleadDashboardPage";
import GoalsPage from "../pages/Goal/GoalsPage";
import OrgChart from "../components/OrgChart/OrgChart";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      <Route path="/about" element={<About />} />

      <Route path="/services" element={<Services />} />

      <Route path="/contact" element={<Contact />} />

      <Route
        path="/employee/dashboard"
        element={
           <ProtectedRoute allowedRoles={["employee"]}>
            <UserDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["Admin", "employee", "team-lead"]}>
            <UserProfile />
          </ProtectedRoute>
        }
      />



      <Route
        path="/admin/dashboard"
        element={
           <ProtectedRoute allowedRoles={["Admin", "team-lead"]}>
            <DashboardPage />
           </ProtectedRoute>
        }
      />

      <Route
        path="/moods"
        element={
          <ProtectedRoute allowedRoles={["Admin", "team-lead"]}>
            <GetallMoods />
          </ProtectedRoute>
        }
      />

      <Route
        path="/team-lead/dashboard"
        element={
          <ProtectedRoute allowedRoles={["team-lead"]}>
            <TeamLeadDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Goals"
        element={
          <ProtectedRoute allowedRoles={["team-lead","employee"]}>
            <GoalsPage />
          </ProtectedRoute>
        }
      />
            <Route
        path="/OrgChart"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <OrgChart />
          </ProtectedRoute>
        }
      />
    

    </Routes>



  );
};

export default AppRoutes;

import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import SignupPage from "../pages/signup/SignupPage";
import LoginPage from "../pages/login/LoginPage";
import ResetPassword from "../pages/login/ResetPassword";
import HomePage from "../pages/homepage/HomePage";
import UserDashboardPage from "../pages/dashboard/UserDashboardPage";
import UserProfile from "../pages/userProfile/profile";
import TaskDashboard from "../pages/Dashboard/dashboard";
import MoodHistory from "../pages/userProfile/moodHistory";
import GetallMoods from "../pages/userProfile/getallMoods";
import TeamLeadDashboard from "../components/teamLead";
import RoleChangeDashboard from "../pages/Dashboard/rolechangedash";

// Route Guards
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute"; // <-- Import new component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Public Routes - Restricted when logged in */}
      <Route path="/signup" element={
        <PublicRoute>
          <SignupPage />
        </PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/reset-password" element={
        <PublicRoute>
          <ResetPassword />
        </PublicRoute>
      } />

      {/* User Routes */}
      <Route path="/user/dashboard" element={
        <ProtectedRoute allowedRoles={["employee"]}>
          <UserDashboardPage />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={["Admin", "employee", "team-lead"]}>
          <UserProfile />
        </ProtectedRoute>
      } />
      
      <Route path="/mood" element={
        <ProtectedRoute allowedRoles={["employee", "team-lead"]}>
          <MoodHistory />
        </ProtectedRoute>
      } />
      
      {/* Admin and Team Lead Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={["Admin", "team-lead"]}>
          <TaskDashboard />
        </ProtectedRoute>
      } />

      <Route path="/moods" element={
        <ProtectedRoute allowedRoles={["Admin", "team-lead"]}>
          <GetallMoods />
        </ProtectedRoute>
      } />

      <Route path="/team-lead/dashboard" element={
        <ProtectedRoute allowedRoles={["team-lead"]}>
          <TeamLeadDashboard />
        </ProtectedRoute>
      } />

      <Route path="/admin/dashboard/changeRole" element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <RoleChangeDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;

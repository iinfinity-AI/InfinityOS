import React from "react";
import { Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import About from "../pages/about";
import Services from "../pages/services";
import Contact from "../pages/Contact";
import { AdminPrivate } from './../../../server/node_modules/mongodb/src/admin';
import DashboardPage from "../pages/dashboard/AdminDashboardPage";
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
        path="/mood"
        element={
          <ProtectedRoute allowedRoles={["employee", "team-lead"]}>
            <MoodHistory />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["Admin", "team-lead"]}>
            <TaskDashboard />
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
            <TeamLeadDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard/changeRole"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <RoleChangeDashboard />
          </ProtectedRoute>
        }
      />



{/* // new Admin Dashboard */}

      <Route path="/admindash" element={<DashboardPage/>}/>
    </Routes>



  );
};

export default AppRoutes;

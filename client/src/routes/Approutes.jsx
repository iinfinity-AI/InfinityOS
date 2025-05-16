import TopNav from '../components/navbar/TopNav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "../pages/signup/SignupPage";
import LoginPage from "../pages/login/LoginPage";
import ResetPassword from "../pages/login/ResetPassword";
import HomePage from '../pages/homepage/HomePage';
import UserProfile from '../pages/userProfile/profile';
import TaskDashboard from '../pages/Dashboard/dashboard';
import MoodHistory from '../pages/userProfile/moodHistory';
import UserDashboard from '../components/userDashboard';
import GetallMoods from '../pages/userProfile/getallMoods';

function AppRoutes() {
  return (
    <Router>
      <TopNav />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/mood" element={<MoodHistory />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<TaskDashboard />} />
        <Route path="/moods" element={<GetallMoods />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
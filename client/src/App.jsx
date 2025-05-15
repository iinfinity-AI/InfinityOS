import TopNav from './components/navbar/TopNav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import ResetPassword from "./pages/login/ResetPassword";
import HomePage from './pages/homepage/HomePage';
import UserProfile from './pages/userProfile/profile';
import TaskDashboard from './pages/Dashboard/dashboard';
import MoodHistory from './pages/userProfile/moodHistory';
function App() {
  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<TaskDashboard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/mood" element={<MoodHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

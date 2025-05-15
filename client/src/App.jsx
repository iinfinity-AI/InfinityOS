import TopNav from './components/navbar/TopNav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import ResetPassword from "./pages/login/ResetPassword";
import HomePage from './pages/homepage/HomePage';
import UserProfile from './pages/userProfile/profile';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;

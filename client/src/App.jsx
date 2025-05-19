import React from "react";
import HomeNav from './components/navbar/HomeNav';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import ResetPassword from "./pages/login/ResetPassword";
import HomePage from './pages/homepage/HomePage';
import UserDashboardPage from './pages/dashboard/UserDashboardPage';
import DashboardPage from "./pages/Admindash/DashboardPage";


const AppContent = () => {
  const location = useLocation();

  // Add any routes here where you want to hide nav and footer
  const noNavFooterRoutes = ['/dashboard', '/taskboard','/admindash'];
  
  

  const hideNavFooter = noNavFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <HomeNav />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/admindash" element={<DashboardPage/>}/>
      </Routes>

      {!hideNavFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

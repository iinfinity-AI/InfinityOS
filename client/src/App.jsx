import React from "react";
import HomeNav from './components/navbar/HomeNav';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import ResetPassword from "./pages/login/ResetPassword";
import HomePage from './pages/homepage/HomePage';
import UserDashboardPage from './pages/dashboard/UserDashboardPage';

// Wrap Routes and conditional layout in a separate component so we can use useLocation
const AppContent = () => {
  const location = useLocation();

  // Define routes where navbar/footer should NOT be shown
  const noNavFooterRoutes = ['/dashboard'];

  const hideNavFooter = noNavFooterRoutes.includes(location.pathname);

  return (
    <>
      {/* Show navbar only if NOT on excluded routes */}
      {!hideNavFooter && <HomeNav />}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
      </Routes>

      {/* Show footer only if NOT on excluded routes */}
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

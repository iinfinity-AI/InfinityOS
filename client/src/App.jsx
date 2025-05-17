import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

// Components for navigation
import HomeNav from './components/navbar/HomeNav';
import TopNav from "./components/navbar/TopNav";
import Footer from './components/footer/Footer';

// Import AppRoutes
import AppRoutes from '../src/routes/Approutes';

const AppContent = () => {
  const location = useLocation();
  const noNavFooterRoutes = ['/user/dashboard', '/taskboard'];

  const hideNavFooter = noNavFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <HomeNav />}
      
      <AppRoutes />
      
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

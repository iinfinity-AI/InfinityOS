import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import HomeNav from "./components/navbar/HomeNav";
import Footer from "./components/footer/Footer";
import AppRoutes from "./routes/Approutes";

const noNavFooterRoutes = ["/employee/dashboard", "/taskboard","/admin/dashboard"];

const AppContent = () => {
  const location = useLocation();
  const hideNavFooter = noNavFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavFooter && <HomeNav />}
      
      <main className="flex-grow">
        <AppRoutes />
      </main>
      
      {!hideNavFooter && <Footer />}
    </div>
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

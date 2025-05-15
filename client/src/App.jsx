import HomeNav from './components/navbar/HomeNav';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import ResetPassword from "./pages/login/ResetPassword";
import HomePage from './pages/homepage/HomePage';
// import ContactPage, ServicesPage, AboutPage if you have them

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <HomeNav />

      {/* Main content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Add your other routes here */}
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </Router>
  );
}

export default App;

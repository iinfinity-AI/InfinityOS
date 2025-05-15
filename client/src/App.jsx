import TopNav from './components/navbar/TopNav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import ResetPassword from "./pages/login/ResetPassword";
import HomePage from './pages/homepage/HomePage';


function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element ={<LoginPage/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    </Router>

   </div>
      
    
  );
}

export default App;

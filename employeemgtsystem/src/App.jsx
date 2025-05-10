// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import ResetPassword from "./pages/login/ResetPassword";



function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element ={<LoginPage/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;

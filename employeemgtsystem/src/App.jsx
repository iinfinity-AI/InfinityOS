import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from './components/navbar/TopNav';
import AvatarPage from "./pages/avatarpage/AvatarPage";

function App() {
  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/profile" element={<AvatarPage />} /> 
        
      </Routes>
    </Router>
  );
}

export default App;

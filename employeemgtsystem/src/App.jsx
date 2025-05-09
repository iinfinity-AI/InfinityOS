// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/Admin/DashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Dashboard Page */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;

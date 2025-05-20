import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
<<<<<<< HEAD
  const user = JSON.parse(localStorage.getItem("user")); // or get from context/store
=======
  const user = JSON.parse(localStorage.getItem("user")); 
>>>>>>> newFrontend

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
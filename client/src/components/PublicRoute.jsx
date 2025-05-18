// src/components/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return children;
};

export default PublicRoute;

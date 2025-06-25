// components/ProtectedRoute/UserRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Partner should not access user routes
  if (token && role === "partner") {
    return <Navigate to="/partner/dashboard" />;
  }

  return children;
};

export default UserRoute;


import React from "react";
import { Navigate } from "react-router-dom";

const PartnerRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  if (role !== "partner") return <Navigate to="/" />;

  return children;
};

export default PartnerRoute;

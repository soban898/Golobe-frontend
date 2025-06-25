import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "partner") {
      navigate("/partner/dashboard");
    } else {
      navigate("/landing");
    }
  }, [navigate]);

  return null;
};

export default RedirectHome;

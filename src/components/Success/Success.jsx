// Success.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../../styles/success.css"; // CSS styling ke liye

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <FaCheckCircle className="success-icon" />
      <h2>Payment Successful!</h2>
      <p>Thank you for your payment. Your booking is confirmed.</p>
      <button className="home-button" onClick={() => navigate("/landing")}>
        Back to Home
      </button>
    </div>
  );
};

export default Success;

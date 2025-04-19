import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import Logo from '../assets/img/Logo.png';
import DefaultProfile from '../assets/img/Profile.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(DefaultProfile);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
  
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,  // ✅ correct
          },
        });
  
        if (!res.ok) {
          setUser(null);
          setLoading(false);
          return;
        }
  
        const data = await res.json();
        setUser(data); // full user object
        setUserName(`${data.firstName} ${data.lastName}`);
        if (data.profileImage) setProfileImage(data.profileImage);
      } catch (err) {
        console.log("Navbar Error:", err);
        setUser(null);
      }
      setLoading(false);
    };
  
    fetchUser();
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-item">
          <span className="stays">Find Stays</span>
        </div>
      </div>

      <div className="nav-center">
        <img src={Logo} alt="Golobe" className="nav-logo" />
      </div>

      <div className="nav-right">
        {loading ? null : user ? (
          <div className="nav-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img src={user?.profilePic} alt="Profile" className="profile-img" />
            <span>{userName}</span>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <img src={user?.profilePic} alt="Profile" className="dropdown-profile-img" />
                  <div>
                    <p className="dropdown-name">{userName}</p>
                    <p className="dropdown-status">Online</p>
                  </div>
                </div>
                <div className="dropdown-item" onClick={() => navigate("/myprofile")}>My Account</div>
            <div className="dropdown-item">Payments</div>
            <div className="dropdown-item">Settings</div>
            <hr />
            <div className="dropdown-item">Support</div>
            <div className="dropdown-item logout" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

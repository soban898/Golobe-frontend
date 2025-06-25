import React, { useState, useEffect } from "react";
import Logo from "../../assets/img/Logo.png";
import DefaultProfile from "../../assets/img/Profile.png";
import { useNavigate } from "react-router-dom";

const Navbar2 = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("Partner");
  const [profileImage, setProfileImage] = useState(DefaultProfile);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setUserName(`${data.firstName} ${data.lastName}`);
          if (data.profilePic) setProfileImage(data.profilePic);
        }
      } catch (err) {
        console.error("Navbar2 Error:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={Logo} alt="Logo" className="nav-logo" />
      </div>

      <div className="nav-right">
        <div className="nav-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src={profileImage} alt="Profile" className="profile-img" />
          <span>{userName}</span>

          {dropdownOpen && (
            <div className="dropdown-menu dropdown-show">
              <div className="dropdown-header">
                <img src={profileImage} alt="Profile" className="dropdown-profile-img" />
                <div>
                  <p className="dropdown-name">{userName}</p>
                  <p className="dropdown-status">Online</p>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => navigate("/partner/profile")}>
                My Account
              </div>
              <div className="dropdown-item logout" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;

import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../../styles/partner-css/partnerlayout.css"; // Create and link this CSS file

import Navbar from "../../Layout/Navbar";

const PartnerLayout = () => {
  const navigate = useNavigate();

  

  return (
    <>
    <Navbar/>
    <div className="partner-container10">
      <aside className="sidebar10">
        <h2 className="sidebar-heading10">Partner Panel</h2>
        <ul className="nav-list10">
          <li onClick={() => navigate("/partner/dashboard")} className="nav-item10">Dashboard</li>
          <li onClick={() => navigate("/partner/hotels")} className="nav-item10">Hotels</li>
          <li onClick={() => navigate("/partner/bookings")} className="nav-item10">Bookings</li>
        </ul>
      </aside>

      <section className="content10">
        <Outlet />
      </section>
    </div>
    </>
  );
};

export default PartnerLayout;
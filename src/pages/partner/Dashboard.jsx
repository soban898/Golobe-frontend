import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/partner-css/dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalApartments: 0,
    totalBookings: 0,
    bookingsLast7Days: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/partners/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats({
          totalApartments: res.data.totalApartments,
          totalBookings: res.data.totalBookings,
          bookingsLast7Days: res.data.recentBookings,
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="partner-dashboard199">
      <h2>📊 Partner Dashboard</h2>
      <div className="dashboard-cards199">
        <div className="card199">
          <h3>🏘️ Total Apartments</h3>
          <p>{stats.totalApartments}</p>
        </div>
        <div className="card199">
          <h3>📦 Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>
        <div className="card199">
          <h3>📅 Bookings (Last 7 Days)</h3>
          <p>{stats.bookingsLast7Days}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


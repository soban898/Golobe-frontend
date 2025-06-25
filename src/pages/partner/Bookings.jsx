import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/partner-css/bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/partners/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bookings-wrapper">
      <h2 className="bookings-title">📋 Bookings for Your Apartments</h2>

      {bookings.length === 0 ? (
        <p className="bookings-empty">No bookings found.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>Booked By</th>
              <th>Price</th>
              <th>Check-In</th>
              <th>Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.name}</td>
                <td>{booking.user?.firstName} {booking.user?.lastName}</td>
                <td>${booking.price}</td>
                <td>{formatDate(booking.checkInDate)}</td>
                <td>{formatDate(booking.checkOutDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;


import React from "react";
import "../../styles/rooms.css";
import Hotel1 from "../../assets/img/Hotel1.png";
import Hotel2 from "../../assets/img/Hotel2.png";
import Hotel3 from "../../assets/img/Hotel3.png";
import Hotel4 from "../../assets/img/Hotel4.png";

import { useLocation, useNavigate } from "react-router-dom";

const AvailableRooms = () => {
  const location = useLocation();  // ✅ Hotel data yahan se aa raha hai
  const navigate = useNavigate();

  const rooms = [
    { id: 1, name: "Superior room - 1 double bed or 2 twin beds", price: 240, image: Hotel1 },
    { id: 2, name: "Superior room - City view - 1 double bed or 2 twin beds", price: 280, image: Hotel2 },
    { id: 3, name: "Deluxe room - 1 king bed", price: 320, image: Hotel3 },
    { id: 4, name: "Suite - City view - 1 king bed", price: 350, image: Hotel4 },
  ];
 const handleBookNow = (room) => {
    navigate("/payment", { 
      state: { 
        room, 
        hotel: { 
          name: location.state?.name || "Unnamed Hotel",
          rating: location.state?.rating || 4.5, 
          reviewsCount: location.state?.reviewsCount || 100 
        } 
      } 
    });
  };

  return (
    <div className="rooms-container">
      <h2>Available Rooms</h2>
      {rooms.map((room) => (
        <div key={room.id} className="room-card">
          <img src={room.image} alt={room.name} className="room-image" />
          <div className="room-info">
            <p>{room.name}</p>
          </div>
          <div className="room-price">
            <p><strong>${room.price}</strong>/night</p>
            <button className="book-btn"  onClick={() => {
    handleBookNow(room); // Ye function call karega
    
  }}>Book now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableRooms;

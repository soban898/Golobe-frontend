import React from "react";
import noHotelImg from "../../assets/img/HotelError.png"; 
import "../../styles/nohotels.css"; 

const NoHotelsFound = () => {
  return (
    <div className="no-hotels-container">
      <img src={noHotelImg} alt="No Hotels" className="no-hotels-image" />
      <h3 className="no-hotels-heading">No Hotels Found</h3>
      <p className="no-hotels-subtext">
        We couldn't find any hotels in this location. <br />
        Try searching for another city ✨
      </p>
    </div>
  );
};

export default NoHotelsFound;

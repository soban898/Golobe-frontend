import React from "react";
import "../../styles/hero.css"; // CSS file ka import
import heroimg from "../../assets/img/heroimg.png";

const HeroSection = () => {
  return (
    <div className="hero-container">
      {/* Dummy Image */}
      <img src={heroimg} alt="Travel Destination" className="hero-image" />
      
     
    </div>
  );
};

export default HeroSection;




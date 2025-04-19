import React from "react";
import '../../styles/grid.css'
import scene1 from '../../assets/img/scene1.png'
import scene2 from '../../assets/img/scene2.png'
import scene3 from '../../assets/img/scene3.png'
import scene4 from '../../assets/img/scene4.png'

const TravelCardGrid = () => {
  return (
    <div className="travel-container1">
      <div className="main-card1">
        <h2>Backpacking Sri Lanka</h2>
       
        <p className="travel-description">
          Traveling is a unique experience as it's the best way to unplug from
          the pushes and pulls of daily life. It helps us forget about our
          problems, frustrations, and fears at home. During our journey, we
          experience life in different ways. We explore new places, cultures,
          cuisines, traditions, and ways of living.
        </p>
        <button className="book-hotel-btn">Book Hotel</button>
      </div>
      <div className="image-grid1">
        <img src={scene1} alt="Travel 1" />
        <img src={scene2} alt="Travel 2" />
        <img src={scene3} alt="Travel 3" />
        <img src={scene4} alt="Travel 4" />
      </div>
    </div>
  );
};

export default TravelCardGrid;

import React from "react";
import "../../styles/review.css";
import Profile from "../../assets/img/Profile.png"
import Profile1 from "../../assets/img/Profile1.png"
import Profile2 from "../../assets/img/Profile2.png"
import Profile3 from "../../assets/img/Profile3.png"
import Profile4 from "../../assets/img/Profile4.png"

const ReviewSection = () => {
  return (
    <section className="review-section">
      <div className="review-header">
        <h2>Reviews</h2>
        <button className="review-button">Give your review</button>
      </div>

      <div className="rating-summary">
        <h1>4.2</h1>
        <div>
          <p><strong>Very good</strong></p>
          <p>371 verified reviews</p>
        </div>
      </div>

      <div className="review-list">
        <div className="review-card">
          <div className="review-user">
            <img src={Profile} alt="Omar Siphron" />
            <div>
              <p className="review-rating">5.0 Amazing</p>
              <p className="review-name">Omar Siphron</p>
            </div>
          </div>
          <p className="review-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className="review-card">
          <div className="review-user">
            <img src={Profile1} alt="Cristofer Ekstrom Bothman" />
            <div>
              <p className="review-rating">5.0 Amazing</p>
              <p className="review-name">Chris Henry</p>
            </div>
          </div>
          <p className="review-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className="review-card">
          <div className="review-user">
            <img src={Profile2} alt="Kaiya Lubin" />
            <div>
              <p className="review-rating">5.0 Amazing</p>
              <p className="review-name">Kaiya Lubin</p>
            </div>
          </div>
          <p className="review-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className="review-card">
          <div className="review-user">
            <img src={Profile3} alt="Erin Septimus" />
            <div>
              <p className="review-rating">5.0 Amazing</p>
              <p className="review-name">Erin Septimus</p>
            </div>
          </div>
          <p className="review-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className="review-card">
          <div className="review-user">
            <img src={Profile4} alt="Terry George" />
            <div>
              <p className="review-rating">5.0 Amazing</p>
              <p className="review-name">Terry George</p>
            </div>
          </div>
          <p className="review-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      <div className="pagination">
        <span>◀</span>
        <span>1 of 40</span>
        <span>▶</span>
      </div>
    </section>
  );
};

export default ReviewSection;

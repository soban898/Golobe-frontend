import { useLocation } from "react-router-dom";
import Hotel1 from "../../assets/img/Hotel1.png";
import Hotel2 from "../../assets/img/Hotel2.png";
import Hotel3 from "../../assets/img/Hotel3.png";
import Hotel4 from "../../assets/img/Hotel4.png";
import Hotel5 from "../../assets/img/Hotel5.png";
import "../../styles/book.css";

const randomImages = [Hotel1, Hotel2, Hotel3, Hotel4, Hotel5];

const generateStars = (rating) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  let stars = "";
  for (let i = 0; i < totalStars; i++) {
    stars += i < filledStars ? "★" : "☆";
  }
  return stars;
};

const Bookingdetails = () => {
  const location = useLocation();
  const hotel = location.state || {}; // Received hotel data

  return (
    <div className="booking-container">
      {/* Hotel Name and Price */}
      <div className="hotel-header">
        <h2 className="hotel-name ">{hotel.name || "Hotel Name"}</h2>
        <span className="star-rating1">{generateStars(hotel.rating)}</span>
        <div className="hotel-price">${hotel.price || 100}/night</div>
      </div>
      <div className="hotel-details">
       
        
        {/* ⭐ Updated Review Box */}
        <div className="review-box">
         
          <span className="rating-box1">{hotel.rating || 4.5}</span>
          <span className="rating-text1">{hotel.reviewText || "Very Good"}</span>
          <span className="review-count">{hotel.reviewsCount || 100} reviews</span>
        </div>
      </div>
      <div className="buttons-container">
      <div className="share-heart">
      <svg className="heart1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M13.7863 3.125C11.2504 3.125 10.0004 5.625 10.0004 5.625C10.0004 5.625 8.7504 3.125 6.21446 3.125C4.15352 3.125 2.52149 4.84922 2.5004 6.90664C2.45743 11.1773 5.88829 14.2145 9.64884 16.7668C9.75251 16.8373 9.87501 16.8751 10.0004 16.8751C10.1258 16.8751 10.2483 16.8373 10.352 16.7668C14.1121 14.2145 17.543 11.1773 17.5004 6.90664C17.4793 4.84922 15.8473 3.125 13.7863 3.125V3.125Z" stroke="#112211" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg><svg className="share" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M13.187 13.9149L13.2029 13.9238L13.2155 13.9107C13.446 13.6696 13.723 13.4778 14.0297 13.3467C14.3364 13.2157 14.6665 13.1482 15.0001 13.1484C15.5173 13.1483 16.0216 13.3102 16.4422 13.6114C16.8627 13.9125 17.1784 14.3378 17.3449 14.8274C17.5115 15.3171 17.5206 15.8467 17.3708 16.3418C17.2211 16.8369 16.9201 17.2727 16.5101 17.588C16.1001 17.9034 15.6017 18.0824 15.0848 18.1C14.5678 18.1177 14.0583 17.973 13.6278 17.6864C13.1972 17.3997 12.8673 16.9855 12.6841 16.5017C12.501 16.018 12.4739 15.489 12.6067 14.9891L12.6114 14.9716L12.5956 14.9627L6.81432 11.71L6.79849 11.7011L6.78591 11.7142C6.44382 12.0709 6.00283 12.317 5.51967 12.421C5.03651 12.525 4.53329 12.4821 4.07474 12.2977C3.61618 12.1134 3.22328 11.7961 2.94656 11.3866C2.66984 10.9771 2.52197 10.4941 2.52197 9.99992C2.52197 9.5057 2.66984 9.02278 2.94656 8.61329C3.22328 8.2038 3.61618 7.88646 4.07474 7.70211C4.53329 7.51776 5.03651 7.47481 5.51967 7.57881C6.00283 7.68281 6.44382 7.92899 6.78591 8.28568L6.79849 8.29879L6.81432 8.28988L12.5956 5.03715L12.6114 5.02824L12.6067 5.01069C12.4521 4.43023 12.5144 3.81331 12.782 3.2755C13.0496 2.73769 13.5041 2.3159 14.0604 2.08914C14.6166 1.86239 15.2365 1.84622 15.8038 2.04368C16.3711 2.24114 16.847 2.63867 17.1422 3.1618C17.4375 3.68493 17.5319 4.29776 17.4077 4.88549C17.2836 5.47322 16.9494 5.99552 16.4678 6.35455C15.9862 6.71357 15.3902 6.88467 14.7915 6.83581C14.1928 6.78695 13.6324 6.52148 13.2154 6.08912L13.2028 6.07608L13.187 6.08497L7.40579 9.3377L7.38996 9.34661L7.39463 9.36416C7.50557 9.78074 7.50557 10.2191 7.39463 10.6357L7.38996 10.6532L7.40579 10.6621L13.187 13.9149Z" fill="black" stroke="#112211" stroke-width="0.046875"/>
</svg>
      </div>
     <button className="book-now-btn">Book Now</button>
      </div>

      {/* Hotel Images (Main Image + Random Images) */}
      <div className="hotel-images">
        <img src={hotel.image || Hotel1} alt="Hotel Main" className="main-hotel-img" />
        {randomImages.slice(0, 4).map((img, index) => (
          <img key={index} src={img} alt={`Random Hotel ${index + 1}`} className="random-hotel-img" />
        ))}
      </div>

    </div>
  );
};

export default Bookingdetails;

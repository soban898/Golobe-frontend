import { useEffect, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import "../../styles/results.css";
// React Router ka hook import karo



// Import local images
import Hotel1 from "../../assets/img/Hotel1.png";
import Hotel2 from "../../assets/img/Hotel2.png";
import Hotel3 from "../../assets/img/Hotel3.png";
import Hotel4 from "../../assets/img/Hotel4.png";
import Hotel5 from "../../assets/img/Hotel5.png";
import Hotel6 from "../../assets/img/Hotel6.png";
import Hotel7 from "../../assets/img/Hotel7.png";
import Loader from "../Loader/Loader";
import NoHotelsFound from "../NoHotels/NoHotelsFound";

const imageArray = [Hotel1, Hotel2, Hotel3, Hotel4, Hotel5, Hotel6, Hotel7];
const prices = [50, 75, 100, 120, 150, 180, 200, 220, 250, 300];

// ⭐ Reviews Array
const reviewsArray = [
  { rating: 4.8, text: "Excellent" },
  { rating: 4.5, text: "Very Good" },
  { rating: 4.2, text: "Good" },
  { rating: 3.8, text: "Satisfactory" },
  { rating: 3.5, text: "Average" },
  { rating: 3.0, text: "Below Average" },
  { rating: 2.0, text: "Very Bad" },
];



const generateStars = (rating) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  let stars = "";
  for (let i = 0; i < totalStars; i++) {
    stars += i < filledStars ? "★" : "☆";
  }
  return stars;
};

const ResultList = () => {
  const [hotels, setHotels] = useState([]);
  const [visibleHotels, setVisibleHotels] = useState(10); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lat = params.get("lat");
  const lon = params.get("lon");

  const API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY;

  const cityName = params.get("city") || "Selected City";

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchHotels = async () => {
      if (!lat || !lon) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&kinds=accomodations&apikey=${API_KEY}`
        );
        const data = await res.json();

        if (data.features) {
          const hotelsData = data.features.map((hotel, index) => ({
            ...hotel,
            imageUrl: imageArray[index % imageArray.length],
          }));
          setHotels(hotelsData);
        } else {
          setHotels([]);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Failed to load hotels. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [lat, lon]);

  const getRandomPrice = () => prices[Math.floor(Math.random() * prices.length)];
  const getRandomReview = () => reviewsArray[Math.floor(Math.random() * reviewsArray.length)];

  // 🔥 Load More Function
  const handleShowMore = () => {
    setVisibleHotels((prev) => prev + 10); // Har dafa 5 hotels aur show karo
  };

  return (
    <div className="result-container">
      <h2 className="result-title">Hotels in {cityName}</h2>

      {loading && <Loader/>}
      {error && <NoHotelsFound/>}

      {hotels.length > 0 ? (
        <>
          <ul className="hotel-grid">
            {hotels.slice(0, visibleHotels).map((hotel) => {
              const { rating, text } = getRandomReview();

              return (
                <li key={hotel.id} className="hotel-card">
                  <img src={hotel.imageUrl} alt="Hotel" className="hotel-image" />
                  <div className="hotel-info">
                    <h3 className="hotel-name">{hotel.properties.name || "Unnamed Hotel"}</h3>
                    <p className="hotel-type">Type: {hotel.properties.kinds.replace(/_/g, " ")}</p>
                    <div className="pricing">
                    <p className="hotel-price-start"> Starting from</p>
                    <p className="hotel-price"> ${getRandomPrice()}/night</p>
                    </div>


                    <div className="review-box">
                      <span className="star-rating">{generateStars(rating)}</span>
                      <div className="rating-box">{rating}</div>
                      <span className="rating-text">{text}</span>
                      <span className="review-count">{Math.floor(Math.random() * 500) + 50} reviews</span>
                    </div>
                    <div className="heart-btn">
                    <svg className="heart" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M11.9995 21.5C11.6985 21.4996 11.4045 21.4086 11.1558 21.2389C7.47189 18.7381 5.87673 17.0234 4.99689 15.9514C3.12189 13.6663 2.22423 11.3202 2.24954 8.77953C2.27908 5.86813 4.61486 3.5 7.45642 3.5C9.52267 3.5 10.9538 4.66391 11.7872 5.63328C11.8136 5.66368 11.8462 5.68805 11.8829 5.70476C11.9195 5.72146 11.9593 5.73011 11.9995 5.73011C12.0398 5.73011 12.0796 5.72146 12.1162 5.70476C12.1529 5.68805 12.1855 5.66368 12.2119 5.63328C13.0453 4.66297 14.4764 3.5 16.5427 3.5C19.3842 3.5 21.72 5.86812 21.7495 8.78C21.7749 11.3211 20.8763 13.6672 19.0022 15.9519C18.1224 17.0239 16.5272 18.7386 12.8433 21.2394C12.5946 21.4089 12.3006 21.4998 11.9995 21.5Z" fill="#112211"/>
</svg>
                    <button className="view-place-btn" onClick={() => navigate(`/booking `, { state: { 
        name: hotel.properties.name || "Unnamed Hotel",
        image: hotel.imageUrl,
        price: getRandomPrice(),
        rating: rating,
        reviewText: text,
        reviewsCount: Math.floor(Math.random() * 500) + 50
    } })}
   >View Place</button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* ✅ Show More Button */}
          {visibleHotels < hotels.length && (
            <button className="show-more-btn" onClick={handleShowMore}>
              Show More Results
            </button>
          )}
        </>
      ) : (
        !loading && <NoHotelsFound/>
      )}
    </div>
  );
};

export default ResultList;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import "../../styles/city.css"; 
// import Melbourne from "../../assets/img/Melbourne.png";
// import Paris from "../../assets/img/Paris.png";
// import London from "../../assets/img/London.png";
// import Columbia from "../../assets/img/Columbia.png";

// const destinations = [
//   {
//     id: 1,
//     city: "Melbourne",
//     tagline: "An amazing journey",
//     price: "$700",
//     image: Melbourne,
//   },
//   {
//     id: 2,
//     city: "Paris",
//     tagline: "A Paris Adventure",
//     price: "$600",
//     image: Paris,
//   },
//   {
//     id: 3,
//     city: "London",
//     tagline: "London eye adventure",
//     price: "$350",
//     image: London,
//   },
//   {
//     id: 4,
//     city: "Columbia",
//     tagline: "Amazing streets",
//     price: "$700",
//     image: Columbia,
//   },
// ];

// const City = () => {
//   const navigate = useNavigate();

//    const [city, setCity] = useState("");
//     const [loading, setLoading] = useState(false);
  
//     const API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY;

  

//     useEffect(() => {
//       const params = new URLSearchParams(location.search);
//       const queryCity = params.get("city") || "";
//       setCity(queryCity);
//     }, [location.search]);
  
//     const fetchCityCoordinates = async (selectedCity) => {
//       if (!selectedCity) return alert("Please enter a city name!");
//       setLoading(true);
    
//       try {
//         const res = await fetch(
//           `https://api.opentripmap.com/0.1/en/places/geoname?name=${selectedCity}&apikey=${API_KEY}`
//         );
//         const data = await res.json();
    
//         if (data.lat && data.lon) {
//           navigate(`/results?lat=${data.lat}&lon=${data.lon}&city=${encodeURIComponent(selectedCity)}`);
//         } else {
//           alert("City not found!");
//         }
//       } catch (error) {
//         console.error("Error fetching city:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
    

//   return (
//     <div className="container">
//       <h2 className="title">Fall into travel</h2>
//       <p className="subtitle">
//         Going somewhere to celebrate this season? Whether you're going home or somewhere to roam, we've got the travel tools to get you to your destination.
//       </p>
//       <div className="card-container">
//         {destinations.map((destination) => (
//           <div key={destination.id} className="card">
//             <img src={destination.image} alt={destination.city} className="card-image" />
//             <div className="card-content">
//               <h3 className="card-title">{destination.city}</h3>
//               <p className="card-text">{destination.tagline}</p>
//               <p className="card-price">{destination.price}</p>
//               <button 
//                 className="card-button" 
//                 onClick={() => fetchCityCoordinates(destination.city)} 
//                 disabled={loading}
//               >
//                 Book a Hotel
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default City;






import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/city.css"; 
import Melbourne from "../../assets/img/Melbourne.png";
import Paris from "../../assets/img/Paris.png";
import London from "../../assets/img/London.png";
import Columbia from "../../assets/img/Columbia.png";

const destinations = [
  {
    id: 1,
    city: "Melbourne",
    tagline: "An amazing journey",
    price: "$700",
    image: Melbourne,
  },
  {
    id: 2,
    city: "Paris",
    tagline: "A Paris Adventure",
    price: "$600",
    image: Paris,
  },
  {
    id: 3,
    city: "London",
    tagline: "London eye adventure",
    price: "$350",
    image: London,
  },
  {
    id: 4,
    city: "Columbia",
    tagline: "Amazing streets",
    price: "$700",
    image: Columbia,
  },
];

const City = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCitySearch = (selectedCity) => {
    if (!selectedCity) return alert("Please enter a city name!");
    setLoading(true);

    // Navigate to your own results route, partner-based only
    navigate(`/results?city=${encodeURIComponent(selectedCity)}&guests=1`);
    setLoading(false);
  };

  return (
    <div className="container">
      <h2 className="title">Fall into travel</h2>
      <p className="subtitle">
        Going somewhere to celebrate this season? Whether you're going home or somewhere to roam, we've got the travel tools to get you to your destination.
      </p>
      <div className="card-container">
        {destinations.map((destination) => (
          <div key={destination.id} className="card">
            <img src={destination.image} alt={destination.city} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{destination.city}</h3>
              <p className="card-text">{destination.tagline}</p>
              <p className="card-price">{destination.price}</p>
              <button 
                className="card-button" 
                onClick={() => handleCitySearch(destination.city)}
                disabled={loading}
              >
                Book a Hotel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default City;

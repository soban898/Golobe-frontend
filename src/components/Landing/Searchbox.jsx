// import React, { useState, useEffect } from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import "../../styles/search.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import NoHotelsFound from "../NoHotels/NoHotelsFound";

// const SearchBox = ({ isResultsPage }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [city, setCity] = useState("");
//   const [loading, setLoading] = useState(false);

//   const API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY;



//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const queryCity = params.get("city") || "";
//     setCity(queryCity);
//   }, [location.search]);

//   const fetchCityCoordinates = async () => {
//     if (!city) return alert("Please enter a city name!");
//     setLoading(true);

//     try {
//       const res = await fetch(
//         `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${API_KEY}`
//       );
//       const data = await res.json();

//       if (data.lat && data.lon) {
//         navigate(`/results?lat=${data.lat}&lon=${data.lon}&city=${encodeURIComponent(city)}`);
//       } else {
//         alert("City not found!");
//       }
//     } catch (error) {
//       console.error("Error fetching city:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`search-container ${isResultsPage ? "results-page" : ""}`}>
//       <div className="search-box">

//         <div className="mobile-header">
//           <h3 className="destination">Where are you flying?</h3>
//           <Dialog.Root>
//             <Dialog.Trigger asChild>
//               <button className="hamburger-button">☰</button>
//             </Dialog.Trigger>
//             <Dialog.Portal>
//               <Dialog.Overlay className="dialog-overlay" />
//               <Dialog.Content className="dialog-content">

//                 {/* ❌ Close Button */}
//                 <Dialog.Close asChild>
//                   <button className="close-button">✖</button>
//                 </Dialog.Close>

//                 <Dialog.Title className="dialog-title">Search Details</Dialog.Title>
//                 <div className="input-group">
//                   <label>Enter Destination</label>
//                   <input 
//                     type="text" 
//                     placeholder="Istanbul, Turkey" 
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)} 
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label>Check In</label>
//                   <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
//                 </div>
//                 <div className="input-group">
//                   <label>Check Out</label>
//                   <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
//                 </div>
//                 <div className="input-group">
//                   <label>Rooms & Guests</label>
//                   <select>
//                     <option>1 room, 2 guests</option>
//                   </select>
//                 </div>
//                 <button 
//                   className="search-button" 
//                   onClick={fetchCityCoordinates}
//                   disabled={loading}
//                 >
//                   {loading ? "Searching..." : "Search"}
//                 </button>
//               </Dialog.Content>
//             </Dialog.Portal>
//           </Dialog.Root>
//         </div>


//         <div className="desktop-view">
//           <h3 className="destination">Where are you flying?</h3>
//           <div className="search-fields">
//             <div className="input-group">
//               <label>Enter Destination</label>
//               <input 
//                 type="text" 
//                 placeholder="Istanbul, Turkey" 
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)} 
//               />
//             </div>
//             <div className="input-group">
//               <label>Check In</label>
//               <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
//             </div>
//             <div className="input-group">
//               <label>Check Out</label>
//               <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
//             </div>
//             <div className="input-group">
//               <label>Rooms & Guests</label>
//               <select>
//                 <option>1 room, 2 guests</option>
//               </select>
//             </div>
//             <button 
//               className="search-button"  
//               onClick={fetchCityCoordinates}
//               disabled={loading}
//             >
//               {loading ? "Searching..." : "Search"}
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default SearchBox;



import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../styles/search.css";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBox = ({ isResultsPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryCity = params.get("city") || "";
    const queryGuests = params.get("guests") || 1;
    setCity(queryCity);
    setGuests(queryGuests);
  }, [location.search]);

  const handleSearch = () => {
    if (!city.trim() || !checkIn || !checkOut || !guests) {
      return alert("Please fill in all the fields.");
    }

   navigate(
  `/results?city=${encodeURIComponent(city)}&guests=${guests}&checkIn=${checkIn}&checkOut=${checkOut}`
);

  };

  return (
    <div className={`search-container ${isResultsPage ? "results-page" : ""}`}>
      <div className="search-box">
        {/* Mobile View */}
        <div className="mobile-header">
          <h3 className="destination">Where are you flying?</h3>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="hamburger-button">☰</button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="dialog-content">
                <Dialog.Close asChild>
                  <button className="close-button">✖</button>
                </Dialog.Close>
                <Dialog.Title className="dialog-title">Search Details</Dialog.Title>

                <div className="input-group">
                  <label>Enter Destination</label>
                  <input
                    type="text"
                    placeholder="Istanbul, Turkey"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Check In</label>
                  <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                </div>
                <div className="input-group">
                  <label>Check Out</label>
                  <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                </div>
                <div className="input-group">
                  <label>Guests</label>
                  <input
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
                <button
                  className="search-button"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {/* Desktop View */}
        <div className="desktop-view">
          <h3 className="destination">Where are you staying?</h3>
          <div className="search-fields">
            <div className="input-group">
              <label>Enter Destination</label>
              <input
                type="text"
                placeholder="Istanbul, Turkey"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Check In</label>
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Check Out</label>
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Guests</label>
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
            <button
              className="search-button"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;









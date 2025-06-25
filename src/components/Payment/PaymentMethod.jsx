// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import "../../styles/payment.css";
// import Visa from "../../assets/img/Visa.png"
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const PaymentMethod = () => {
//   const location = useLocation();
//   const { hotel, room } = location.state || {};
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [cardData, setCardData] = useState({
//       cardNumber: '',
//       expDate: '',
//       cvc: '',
//       nameOnCard: '',
//       country: 'United States',
//     });
//     const [cards, setCards] = useState([]); 

//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCardData({ ...cardData, [e.target.name]: e.target.value });
//   };
  
  
//   const handleAddCard = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
  
//     try {
//       const res = await axios.post("http://localhost:5000/api/cards", cardData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("New card to add:", res.data); 

  
// setCards(prevCards => [...(prevCards || []), res.data]);
//       setIsModalOpen(false);
//       setCardData({ cardNumber: '', expDate: '', cvc: '', nameOnCard: '', country: 'United States' }); 
//     } catch (error) {
//       console.error("Card Save Error:", error);
//     }
//   };
    

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
  
//     const fetchCards = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/cards", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log("Fetched cards:", res.data); 
//         setCards(res.data); 
//       } catch (error) {
//         console.error("Fetch Cards Error:", error);
//       }
//     };
  
//     fetchCards();
//   }, []);

//   return (
//     <div className="Payment-container">
      
//       <div className="left-section">
        
//         <div className="room-box">
//           <p className="breadcrumb">Turkey &gt; Istanbul &gt; CVK Park Bosphorus Hotel Istanbul</p>

//           <h2 className="room-title">{room?.name}</h2>
//           <span className="price">$ {room?.price || 240}/night</span>

//           <div className="hotel-info">
//             <p className="hotel-name">{hotel?.name}</p>
//             <p className="hotel-location"> Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
//           </div>

//           <div className="date-info">
//             <div>
//               <p>Thursday, Dec 8</p>
//               <span>Check-in</span>
//             </div>
//             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
//   <path d="M40.5 17L30 17L30 6.5C30 5.30653 29.5259 4.16193 28.682 3.31802C27.8381 2.47411 26.6935 2 25.5 2L7.5 2C6.30653 2 5.16193 2.47411 4.31802 3.31802C3.47411 4.16193 3 5.30653 3 6.5L3 45.5C3 45.8978 3.15804 46.2794 3.43934 46.5607C3.72064 46.842 4.10218 47 4.5 47H14.25C14.4489 47 14.6397 46.921 14.7803 46.7803C14.921 46.6397 15 46.4489 15 46.25L15 39.5422C15 38.735 15.6206 38.0422 16.4278 38.0019C16.6306 37.9921 16.8333 38.0236 17.0236 38.0945C17.2139 38.1654 17.3878 38.2741 17.5348 38.4142C17.6818 38.5543 17.7988 38.7227 17.8788 38.9094C17.9587 39.096 18 39.297 18 39.5L18 46.25C18 46.4489 18.079 46.6397 18.2197 46.7803C18.3603 46.921 18.5511 47 18.75 47L43.5 47C43.8978 47 44.2794 46.842 44.5607 46.5607C44.842 46.2794 45 45.8978 45 45.5L45 21.5C45 20.3065 44.5259 19.1619 43.682 18.318C42.8381 17.4741 41.6935 17 40.5 17ZM9.195 40.9878C8.88434 41.0284 8.56875 40.9708 8.29254 40.8229C8.01632 40.675 7.79334 40.4444 7.65489 40.1633C7.51644 39.8823 7.46946 39.5649 7.52057 39.2558C7.57167 38.9467 7.71828 38.6614 7.93982 38.4398C8.16136 38.2183 8.44671 38.0717 8.75582 38.0206C9.06493 37.9695 9.38228 38.0164 9.66334 38.1549C9.94439 38.2933 10.175 38.5163 10.3229 38.7925C10.4708 39.0688 10.5284 39.3843 10.4878 39.695C10.4449 40.0228 10.2949 40.3273 10.0611 40.5611C9.82734 40.7949 9.52285 40.9449 9.195 40.9878ZM9.195 33.4878C8.88434 33.5284 8.56875 33.4708 8.29254 33.3229C8.01632 33.175 7.79334 32.9444 7.65489 32.6633C7.51644 32.3823 7.46946 32.0649 7.52057 31.7558C7.57167 31.4467 7.71828 31.1614 7.93982 30.9398C8.16136 30.7183 8.44671 30.5717 8.75582 30.5206C9.06493 30.4695 9.38228 30.5164 9.66334 30.6549C9.94439 30.7933 10.175 31.0163 10.3229 31.2925C10.4708 31.5688 10.5284 31.8843 10.4878 32.195C10.4449 32.5228 10.2949 32.8273 10.0611 33.0611C9.82734 33.2949 9.52285 33.4449 9.195 33.4878ZM9.195 25.9878C8.88434 26.0284 8.56875 25.9708 8.29254 25.8229C8.01632 25.675 7.79334 25.4444 7.65489 25.1633C7.51644 24.8823 7.46946 24.5649 7.52057 24.2558C7.57167 23.9467 7.71828 23.6614 7.93982 23.4398C8.16136 23.2183 8.44671 23.0717 8.75582 23.0206C9.06493 22.9695 9.38228 23.0164 9.66334 23.1549C9.94439 23.2933 10.175 23.5163 10.3229 23.7925C10.4708 24.0688 10.5284 24.3843 10.4878 24.695C10.4449 25.0228 10.2949 25.3273 10.0611 25.5611C9.82734 25.7949 9.52285 25.9449 9.195 25.9878ZM9.195 18.4878C8.88434 18.5284 8.56875 18.4708 8.29254 18.3229C8.01632 18.175 7.79334 17.9444 7.65489 17.6633C7.51644 17.3823 7.46946 17.0649 7.52057 16.7558C7.57167 16.4467 7.71828 16.1614 7.93982 15.9398C8.16136 15.7183 8.44671 15.5717 8.75582 15.5206C9.06493 15.4695 9.38228 15.5164 9.66334 15.6549C9.94439 15.7933 10.175 16.0163 10.3229 16.2925C10.4708 16.5688 10.5284 16.8843 10.4878 17.195C10.4449 17.5228 10.2949 17.8273 10.0611 18.0611C9.82734 18.2949 9.52285 18.4449 9.195 18.4878ZM9.195 10.9878C8.88434 11.0284 8.56875 10.9708 8.29254 10.8229C8.01632 10.675 7.79334 10.4444 7.65489 10.1633C7.51644 9.88228 7.46946 9.56493 7.52057 9.25582C7.57167 8.94671 7.71828 8.66136 7.93982 8.43982C8.16136 8.21828 8.44671 8.07167 8.75582 8.02057C9.06493 7.96946 9.38228 8.01644 9.66334 8.15489C9.94439 8.29334 10.175 8.51632 10.3229 8.79254C10.4708 9.06875 10.5284 9.38434 10.4878 9.695C10.4449 10.0228 10.2949 10.3273 10.0611 10.5611C9.82734 10.7949 9.52285 10.9449 9.195 10.9878ZM16.695 33.4878C16.3843 33.5284 16.0688 33.4708 15.7925 33.3229C15.5163 33.175 15.2933 32.9444 15.1549 32.6633C15.0164 32.3823 14.9695 32.0649 15.0206 31.7558C15.0717 31.4467 15.2183 31.1614 15.4398 30.9398C15.6614 30.7183 15.9467 30.5717 16.2558 30.5206C16.5649 30.4695 16.8823 30.5164 17.1633 30.6549C17.4444 30.7933 17.675 31.0163 17.8229 31.2925C17.9708 31.5688 18.0284 31.8843 17.9878 32.195C17.9449 32.5228 17.7949 32.8273 17.5611 33.0611C17.3273 33.2949 17.0228 33.4449 16.695 33.4878ZM16.695 25.9878C16.3843 26.0284 16.0688 25.9708 15.7925 25.8229C15.5163 25.675 15.2933 25.4444 15.1549 25.1633C15.0164 24.8823 14.9695 24.5649 15.0206 24.2558C15.0717 23.9467 15.2183 23.6614 15.4398 23.4398C15.6614 23.2183 15.9467 23.0717 16.2558 23.0206C16.5649 22.9695 16.8823 23.0164 17.1633 23.1549C17.4444 23.2933 17.675 23.5163 17.8229 23.7925C17.9708 24.0688 18.0284 24.3843 17.9878 24.695C17.9449 25.0228 17.7949 25.3273 17.5611 25.5611C17.3273 25.7949 17.0228 25.9449 16.695 25.9878ZM16.695 18.4878C16.3843 18.5284 16.0688 18.4708 15.7925 18.3229C15.5163 18.175 15.2933 17.9444 15.1549 17.6633C15.0164 17.3823 14.9695 17.0649 15.0206 16.7558C15.0717 16.4467 15.2183 16.1614 15.4398 15.9398C15.6614 15.7183 15.9467 15.5717 16.2558 15.5206C16.5649 15.4695 16.8823 15.5164 17.1633 15.6549C17.4444 15.7933 17.675 16.0163 17.8229 16.2925C17.9708 16.5688 18.0284 16.8843 17.9878 17.195C17.9449 17.5228 17.7949 17.8273 17.5611 18.0611C17.3273 18.2949 17.0228 18.4449 16.695 18.4878ZM16.695 10.9878C16.3843 11.0284 16.0688 10.9708 15.7925 10.8229C15.5163 10.675 15.2933 10.4444 15.1549 10.1633C15.0164 9.88228 14.9695 9.56493 15.0206 9.25582C15.0717 8.94671 15.2183 8.66136 15.4398 8.43982C15.6614 8.21828 15.9467 8.07167 16.2558 8.02057C16.5649 7.96946 16.8823 8.01644 17.1633 8.15489C17.4444 8.29334 17.675 8.51632 17.8229 8.79254C17.9708 9.06875 18.0284 9.38434 17.9878 9.695C17.9449 10.0228 17.7949 10.3273 17.5611 10.5611C17.3273 10.7949 17.0228 10.9449 16.695 10.9878ZM24.195 40.9878C23.8843 41.0284 23.5688 40.9708 23.2925 40.8229C23.0163 40.675 22.7933 40.4444 22.6549 40.1633C22.5164 39.8823 22.4695 39.5649 22.5206 39.2558C22.5717 38.9467 22.7183 38.6614 22.9398 38.4398C23.1614 38.2183 23.4467 38.0717 23.7558 38.0206C24.0649 37.9695 24.3823 38.0164 24.6633 38.1549C24.9444 38.2933 25.175 38.5163 25.3229 38.7925C25.4708 39.0688 25.5284 39.3843 25.4878 39.695C25.4449 40.0228 25.2949 40.3273 25.0611 40.5611C24.8273 40.7949 24.5228 40.9449 24.195 40.9878ZM24.195 33.4878C23.8843 33.5284 23.5688 33.4708 23.2925 33.3229C23.0163 33.175 22.7933 32.9444 22.6549 32.6633C22.5164 32.3823 22.4695 32.0649 22.5206 31.7558C22.5717 31.4467 22.7183 31.1614 22.9398 30.9398C23.1614 30.7183 23.4467 30.5717 23.7558 30.5206C24.0649 30.4695 24.3823 30.5164 24.6633 30.6549C24.9444 30.7933 25.175 31.0163 25.3229 31.2925C25.4708 31.5688 25.5284 31.8843 25.4878 32.195C25.4449 32.5228 25.2949 32.8273 25.0611 33.0611C24.8273 33.2949 24.5228 33.4449 24.195 33.4878ZM24.195 25.9878C23.8843 26.0284 23.5688 25.9708 23.2925 25.8229C23.0163 25.675 22.7933 25.4444 22.6549 25.1633C22.5164 24.8823 22.4695 24.5649 22.5206 24.2558C22.5717 23.9467 22.7183 23.6614 22.9398 23.4398C23.1614 23.2183 23.4467 23.0717 23.7558 23.0206C24.0649 22.9695 24.3823 23.0164 24.6633 23.1549C24.9444 23.2933 25.175 23.5163 25.3229 23.7925C25.4708 24.0688 25.5284 24.3843 25.4878 24.695C25.4449 25.0228 25.2949 25.3273 25.0611 25.5611C24.8273 25.7949 24.5228 25.9449 24.195 25.9878ZM24.195 18.4878C23.8843 18.5284 23.5688 18.4708 23.2925 18.3229C23.0163 18.175 22.7933 17.9444 22.6549 17.6633C22.5164 17.3823 22.4695 17.0649 22.5206 16.7558C22.5717 16.4467 22.7183 16.1614 22.9398 15.9398C23.1614 15.7183 23.4467 15.5717 23.7558 15.5206C24.0649 15.4695 24.3823 15.5164 24.6633 15.6549C24.9444 15.7933 25.175 16.0163 25.3229 16.2925C25.4708 16.5688 25.5284 16.8843 25.4878 17.195C25.4449 17.5228 25.2949 17.8273 25.0611 18.0611C24.8273 18.2949 24.5228 18.4449 24.195 18.4878ZM24.195 10.9878C23.8843 11.0284 23.5688 10.9708 23.2925 10.8229C23.0163 10.675 22.7933 10.4444 22.6549 10.1633C22.5164 9.88228 22.4695 9.56493 22.5206 9.25582C22.5717 8.94671 22.7183 8.66136 22.9398 8.43982C23.1614 8.21828 23.4467 8.07167 23.7558 8.02057C24.0649 7.96946 24.3823 8.01644 24.6633 8.15489C24.9444 8.29334 25.175 8.51632 25.3229 8.79254C25.4708 9.06875 25.5284 9.38434 25.4878 9.695C25.4449 10.0228 25.2949 10.3273 25.0611 10.5611C24.8273 10.7949 24.5228 10.9449 24.195 10.9878ZM41.625 44L30 44L30 20L40.5 20C40.8978 20 41.2794 20.158 41.5607 20.4393C41.842 20.7206 42 21.1022 42 21.5L42 43.625C42 43.7245 41.9605 43.8198 41.8902 43.8902C41.8198 43.9605 41.7245 44 41.625 44Z" fill="#112211"/>
//   <path d="M37.5 38C37.2033 38 36.9133 38.088 36.6666 38.2528C36.42 38.4176 36.2277 38.6519 36.1142 38.926C36.0006 39.2001 35.9709 39.5017 36.0288 39.7926C36.0867 40.0836 36.2296 40.3509 36.4393 40.5607C36.6491 40.7704 36.9164 40.9133 37.2074 40.9712C37.4983 41.0291 37.7999 40.9993 38.074 40.8858C38.3481 40.7723 38.5824 40.58 38.7472 40.3334C38.912 40.0867 39 39.7967 39 39.5C39 39.1022 38.842 38.7206 38.5607 38.4393C38.2794 38.158 37.8978 38 37.5 38ZM37.5 30.5C37.2033 30.5 36.9133 30.588 36.6666 30.7528C36.42 30.9176 36.2277 31.1519 36.1142 31.426C36.0006 31.7001 35.9709 32.0017 36.0288 32.2926C36.0867 32.5836 36.2296 32.8509 36.4393 33.0607C36.6491 33.2704 36.9164 33.4133 37.2074 33.4712C37.4983 33.5291 37.7999 33.4993 38.074 33.3858C38.3481 33.2723 38.5824 33.08 38.7472 32.8334C38.912 32.5867 39 32.2967 39 32C39 31.6022 38.842 31.2206 38.5607 30.9393C38.2794 30.658 37.8978 30.5 37.5 30.5ZM37.5 23C37.2033 23 36.9133 23.088 36.6666 23.2528C36.42 23.4176 36.2277 23.6519 36.1142 23.926C36.0006 24.2001 35.9709 24.5017 36.0288 24.7926C36.0867 25.0836 36.2296 25.3509 36.4393 25.5607C36.6491 25.7704 36.9164 25.9133 37.2074 25.9712C37.4983 26.0291 37.7999 25.9994 38.074 25.8858C38.3481 25.7723 38.5824 25.58 38.7472 25.3334C38.912 25.0867 39 24.7967 39 24.5C39 24.1022 38.842 23.7206 38.5607 23.4393C38.2794 23.158 37.8978 23 37.5 23ZM31.5 38C31.2033 38 30.9133 38.088 30.6666 38.2528C30.42 38.4176 30.2277 38.6519 30.1142 38.926C30.0006 39.2001 29.9709 39.5017 30.0288 39.7926C30.0867 40.0836 30.2296 40.3509 30.4393 40.5607C30.6491 40.7704 30.9164 40.9133 31.2074 40.9712C31.4983 41.0291 31.7999 40.9993 32.074 40.8858C32.3481 40.7723 32.5824 40.58 32.7472 40.3334C32.912 40.0867 33 39.7967 33 39.5C33 39.1022 32.842 38.7206 32.5607 38.4393C32.2794 38.158 31.8978 38 31.5 38ZM31.5 30.5C31.2033 30.5 30.9133 30.588 30.6666 30.7528C30.42 30.9176 30.2277 31.1519 30.1142 31.426C30.0006 31.7001 29.9709 32.0017 30.0288 32.2926C30.0867 32.5836 30.2296 32.8509 30.4393 33.0607C30.6491 33.2704 30.9164 33.4133 31.2074 33.4712C31.4983 33.5291 31.7999 33.4993 32.074 33.3858C32.3481 33.2723 32.5824 33.08 32.7472 32.8334C32.912 32.5867 33 32.2967 33 32C33 31.6022 32.842 31.2206 32.5607 30.9393C32.2794 30.658 31.8978 30.5 31.5 30.5ZM31.5 23C31.2033 23 30.9133 23.088 30.6666 23.2528C30.42 23.4176 30.2277 23.6519 30.1142 23.926C30.0006 24.2001 29.9709 24.5017 30.0288 24.7926C30.0867 25.0836 30.2296 25.3509 30.4393 25.5607C30.6491 25.7704 30.9164 25.9133 31.2074 25.9712C31.4983 26.0291 31.7999 25.9994 32.074 25.8858C32.3481 25.7723 32.5824 25.58 32.7472 25.3334C32.912 25.0867 33 24.7967 33 24.5C33 24.1022 32.842 23.7206 32.5607 23.4393C32.2794 23.158 31.8978 23 31.5 23Z" fill="black"/>
// </svg>
//             <div>
//               <p>Friday, Dec 9</p>
//               <span>Check-out</span>
//             </div>
//           </div>
//         </div>

        
//         <div className="payment-box">
//           <div className="option selected">
//             <input type="radio" checked readOnly />
//             <div>
//               <h4>Pay in full</h4>
//               <p>Pay the total now and you are all set!</p>
//             </div>
//           </div>
//           <div className="option">
//             <input type="radio" readOnly />
//             <div>
//               <h4>Pay part now, part later</h4>
//               <p>Pay $107.45 now, and the rest $127.45 will be charged automatically.</p>
//             </div>
//           </div>
//         </div>

        
//         <div className="saved-cards">
//         {token ? (
//     <>
//       {Array.isArray(cards) && cards.length > 0 ? (
//         cards.map((card, index) => (
//           <div key={index} className="saved-card">
//             <div className="card-info5">
//               <img src={Visa} alt="Visa" className="card-logo5" />
//               <span className="card-number">**** {card.cardNumber.slice(-4)}</span>
//               <span className="expiry">{card.expDate}</span>
//             </div>
//             <input type="radio" className="card-radio" />
//           </div>
//         ))
//       ) : (
//         <p className="no-cards">No cards added yet.</p>
//       )}

      
//       <div className="add-card" onClick={() => setIsModalOpen(true)}>
//         <div className="add-icon">+</div>
//         <p className="add-text">Add a new card</p>
//       </div>
//     </>
//   ) : (
    
//     <div className="login-box5">
//       <h2 className="login-heading5">Please Login</h2>
//       <p className="login-subtext5">You need to be logged in to Add your cards.</p>
//       <button className="login-button5" onClick={() => navigate("/login")}>
//         Login
//       </button>
//     </div>
//   )}
//     </div>
//       </div>

      
//       <div className="right-section">
//         <div className="summary-box">
//           <div className="hotel-cards">
//             <img src={room?.image || hotel?.image} alt="Hotel" />
//             <div className="hotel-detail">
//               <p className="hotel-title">{room?.name}</p>
//               <span className="hotel-rating">{hotel?.reviewText || "Very Good"}</span>
//             </div>
//           </div>

//           <p className="booking-confirm">Your booking is protected by <b>golobe</b></p>

//           <div className="price-details">
//             <p><span>Base Fare:</span> <strong>${room?.price || 100}</strong></p>
//             <p><span>Taxes:</span> <strong>$20</strong></p>
//             <p><span>Service Fee:</span> <strong>$5</strong></p>
//             <hr />
//             <p><span>Total:</span> <strong>${(room?.price || 100) + 25}</strong></p>
//           </div>
//         </div>
//       </div>
        
//         {isModalOpen && (
//   <div className="modal-overlay">
//     <div className="modal-content">
//       <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
//       <h2>Add a new Card</h2>

//       <form>
//         <label>Card Number</label>
//         <input
//           type="text"
//           className="input-field"
//           placeholder="4321 4321 4321 4321"
//           name="cardNumber"
//           value={cardData.cardNumber}
//           onChange={handleChange}
//         />

//         <div className="card-row">
//           <div>
//             <label className="modal-label">Exp. Date</label>
//             <input
//               type="text"
//               className="input-field"
//               placeholder="02/27"
//               name="expDate"
//               value={cardData.expDate}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label className="modal-label">CVC</label>
//             <input
//               type="text"
//               className="input-field"
//               placeholder="123"
//               name="cvc"
//               value={cardData.cvc}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <label className="modal-label">Name on Card</label>
//         <input
//           type="text"
//           className="input-field"
//           placeholder="John Doe"
//           name="nameOnCard"
//           value={cardData.nameOnCard}
//           onChange={handleChange}
//         />

//         <label className="modal-label">Country or Region</label>
//         <select
//           className="select-field"
//           name="country"
//           value={cardData.country}
//           onChange={handleChange}
//         >
//           <option>United States</option>
//           <option>Pakistan</option>
//           <option>India</option>
//           <option>UK</option>
//         </select>

//         <div className="checkbox1">
//           <input type="checkbox" checked readOnly />
//           <label>Securely save my information for 1-click checkout</label>
//         </div>

//         <button className="add-card-btn" onClick={handleAddCard}>Add Card</button>
//       </form>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };


// export default PaymentMethod;




// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../../styles/payment.css";
// import Visa from "../../assets/img/Visa.png";
// import axios from "axios";

// const PaymentMethod = () => {
//   const location = useLocation();
//   const { apartment } = location.state || {};
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPaying, setIsPaying] = useState(false);
//   const [cardData, setCardData] = useState({
//     cardNumber: '',
//     expDate: '',
//     cvc: '',
//     nameOnCard: '',
//     country: 'United States',
//   });
//   const [cards, setCards] = useState([]);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user")); 

//   const handleChange = (e) => {
//     setCardData({ ...cardData, [e.target.name]: e.target.value });
//   };

//   const handleAddCard = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/cards", cardData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCards(prev => [...prev, res.data]);
//       setIsModalOpen(false);
//       setCardData({
//         cardNumber: '',
//         expDate: '',
//         cvc: '',
//         nameOnCard: '',
//         country: 'United States',
//       });
//     } catch (error) {
//       console.error("Card Save Error:", error);
//     }
//   };

//  const handlePayment = async () => {
//   try {
//      setIsPaying(true);
     
//     await axios.post("http://localhost:5000/api/payment/pay", { apartment }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     navigate("/success");
//   } catch (err) {
//     console.error("Payment failed", err);
//     alert("Something went wrong. Please try again.");
//   }  finally {
//       setIsPaying(false);
//     }
// };





//   useEffect(() => {
//     if (!token) return;
//     const fetchCards = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/cards", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCards(res.data);
//       } catch (error) {
//         console.error("Fetch Cards Error:", error);
//       }
//     };
//     fetchCards();
//   }, []);

//   const basePrice = apartment?.price || 0;
//   const totalPrice = basePrice + 25;

//   return (
//     <div className="Payment-container">

//       <div className="left-section">
//         <div className="room-box">
//           <p className="breadcrumb">{apartment?.city} &gt; {apartment?.location}</p>
//           <h2 className="room-title">{apartment?.name}</h2>
//           <span className="price">${apartment?.price}/night</span>
//           <div className="date-info">
//             <div>
//               <p>Thursday, Dec 8</p>
//               <span>Check-in</span>
//             </div>
//             <div>
//               <p>Friday, Dec 9</p>
//               <span>Check-out</span>
//             </div>
//           </div>
//         </div>


//         <div className="payment-box">
//           <div className="option selected">
//             <input type="radio" checked readOnly />
//             <div>
//               <h4>Pay in full</h4>
//               <p>Pay the total now and you are all set!</p>
//             </div>
//           </div>
//           <div className="option">
//             <input type="radio" readOnly />
//             <div>
//               <h4>Pay part now, part later</h4>
//               <p>Pay $107.45 now, and the rest will be charged later.</p>
//             </div>
//           </div>
//         </div>


//         <div className="saved-cards">
//           {token ? (
//             <>
//               {Array.isArray(cards) && cards.length > 0 ? (
//                 cards.map((card, index) => (
//                   <div key={index} className="saved-card">
//                     <div className="card-info5">
//                       <img src={Visa} alt="Visa" className="card-logo5" />
//                       <span className="card-number">**** {card.cardNumber.slice(-4)}</span>
//                       <span className="expiry">{card.expDate}</span>
//                     </div>
//                     <input type="radio" className="card-radio" />
//                   </div>
//                 ))
//               ) : (
//                 <p className="no-cards">No cards added yet.</p>
//               )}
//               <div className="add-card" onClick={() => setIsModalOpen(true)}>
//                 <div className="add-icon">+</div>
//                 <p className="add-text">Add a new card</p>
//               </div>
//             </>
//           ) : (
//             <div className="login-box5">
//               <h2 className="login-heading5">Please Login</h2>
//               <p className="login-subtext5">You need to be logged in to add your cards.</p>
//               <button className="login-button5" onClick={() => navigate("/login")}>Login</button>
//             </div>
//           )}
//         </div>
//       </div>


//       <div className="right-section">
//         <div className="summary-box">
//           <div className="hotel-cards">
//             <img src={`http://localhost:5000${apartment?.images?.[0]}`} alt="Apartment" />
//             <div className="hotel-detail">
//               <p className="hotel-title">{apartment?.name}</p>
//               <span className="hotel-rating">Very Good</span>
//             </div>
//           </div>
//           <p className="booking-confirm">Your booking is protected by <b>golobe</b></p>
//           <div className="price-details">
//             <p><span>Base Fare:</span> <strong>${basePrice}</strong></p>
//             <p><span>Taxes:</span> <strong>$20</strong></p>
//             <p><span>Service Fee:</span> <strong>$5</strong></p>
//             <hr />
//             <p><span>Total:</span> <strong>${totalPrice}</strong></p>
//           </div>

//           {cards.length > 0 ? (
//         <button
//           className="pay-now-btn"
//           onClick={handlePayment}
//           disabled={isPaying}
//         >
//           {isPaying ? (
//             <>
//               <span className="spinner"></span> Processing...
//             </>
//           ) : (
//             "Pay Now"
//           )}
//         </button>
//       ) : (
//         <p className="please-add-card-note">
//           💳 Please add a card to proceed with the payment.
//         </p>
//       )}
//         </div>
//       </div>


//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
//             <h2>Add a new Card</h2>
//             <form>
//               <label>Card Number</label>
//               <input
//                 type="text"
//                 className="input-field"
//                 placeholder="4321 4321 4321 4321"
//                 name="cardNumber"
//                 value={cardData.cardNumber}
//                 onChange={handleChange}
//               />
//               <div className="card-row">
//                 <div>
//                   <label className="modal-label">Exp. Date</label>
//                   <input
//                     type="text"
//                     className="input-field"
//                     placeholder="02/27"
//                     name="expDate"
//                     value={cardData.expDate}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <label className="modal-label">CVC</label>
//                   <input
//                     type="text"
//                     className="input-field"
//                     placeholder="123"
//                     name="cvc"
//                     value={cardData.cvc}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//               <label className="modal-label">Name on Card</label>
//               <input
//                 type="text"
//                 className="input-field"
//                 placeholder="John Doe"
//                 name="nameOnCard"
//                 value={cardData.nameOnCard}
//                 onChange={handleChange}
//               />
//               <label className="modal-label">Country or Region</label>
//               <select
//                 className="select-field"
//                 name="country"
//                 value={cardData.country}
//                 onChange={handleChange}
//               >
//                 <option>United States</option>
//                 <option>Pakistan</option>
//                 <option>India</option>
//                 <option>UK</option>
//               </select>
//               <div className="checkbox1">
//                 <input type="checkbox" checked readOnly />
//                 <label>Securely save my information for 1-click checkout</label>
//               </div>
//               <button className="add-card-btn" onClick={handleAddCard}>Add Card</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentMethod;





import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/payment.css";
import Visa from "../../assets/img/Visa.png";
import axios from "axios";

const PaymentMethod = () => {
  const location = useLocation();
  const { apartment, checkInDate, checkOutDate } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expDate: "",
    cvc: "",
    nameOnCard: "",
    country: "United States",
  });
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!/^\d{16}$/.test(cardData.cardNumber)) {
      errs.cardNumber = "Card number must be 16 digits";
    }
    if (!/^\d{3}$/.test(cardData.cvc)) {
      errs.cvc = "CVC must be 3 digits";
    }
    if (!cardData.expDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      errs.expDate = "Exp. date must be MM/YY";
    }
    if (!cardData.nameOnCard.trim()) {
      errs.nameOnCard = "Name is required";
    }
    return errs;
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/cards", cardData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCards((prev) => [...prev, res.data]);
      setIsModalOpen(false);
      setCardData({
        cardNumber: "",
        expDate: "",
        cvc: "",
        nameOnCard: "",
        country: "United States",
      });
    } catch (error) {
      console.error("Card Save Error:", error);
    }
  };

  const handlePayment = async () => {
    try {
      setIsPaying(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!apartment?._id || !user?._id) {
        alert("Missing apartment or user info. Please try again.");
        setIsPaying(false);
        return;
      }

      const payload = {
        apartment: {
          ...apartment,
          checkInDate,
          checkOutDate,
        },
      };

      const res = await axios.post("http://localhost:5000/api/payment/pay", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success) {
        navigate("/success");
      } else {
        alert("Payment succeeded, but booking was not saved.");
      }
    } catch (err) {
      console.error("❌ Payment failed", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    const fetchCards = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCards(res.data);
      } catch (error) {
        console.error("Fetch Cards Error:", error);
      }
    };
    fetchCards();
  }, []);

  const basePrice = apartment?.price || 0;
  const totalPrice = basePrice + 25;

  return (
    <div className="Payment-container">
      <div className="left-section">
        <div className="room-box">
          <p className="breadcrumb">
            {apartment?.city} &gt; {apartment?.location}
          </p>
          <h2 className="room-title">{apartment?.name}</h2>
          <span className="price">${apartment?.price}/night</span>
        </div>

       

        <div className="saved-cards">
          {token ? (
            <>
              {cards.length > 0 ? (
                cards.map((card, index) => (
                  <div key={index} className="saved-card">
                    <div className="card-info5">
                      <img src={Visa} alt="Visa" className="card-logo5" />
                      <span className="card-number">**** {card.cardNumber.slice(-4)}</span>
                      <span className="expiry">{card.expDate}</span>
                    </div>
                    <input type="radio" className="card-radio" />
                  </div>
                ))
              ) : (
                <p className="no-cards">No cards added yet.</p>
              )}
              <div className="add-card" onClick={() => setIsModalOpen(true)}>
                <div className="add-icon">+</div>
                <p className="add-text">Add a new card</p>
              </div>
            </>
          ) : (
            <div className="login-box5">
              <h2 className="login-heading5">Please Login</h2>
              <p className="login-subtext5">You need to be logged in to add your cards.</p>
              <button className="login-button5" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="right-section">
        <div className="summary-box">
          <div className="hotel-cards">
            <img src={`http://localhost:5000${apartment?.images?.[0]}`} alt="Apartment" />
            <div className="hotel-detail">
              <p className="hotel-title">{apartment?.name}</p>
              <span className="hotel-rating">Very Good</span>
            </div>
          </div>
          <p className="booking-confirm">
            Your booking is protected by <b>golobe</b>
          </p>
          <div className="price-details">
            <p>
              <span>Base Fare:</span> <strong>${basePrice}</strong>
            </p>
            <p>
              <span>Taxes:</span> <strong>$20</strong>
            </p>
            <p>
              <span>Service Fee:</span> <strong>$5</strong>
            </p>
            <hr />
            <p>
              <span>Total:</span> <strong>${totalPrice}</strong>
            </p>
          </div>

          {cards.length > 0 ? (
            <button className="pay-now-btn" onClick={handlePayment} disabled={isPaying}>
              {isPaying ? (
                <>
                  <span className="spinner"></span> Processing...
                </>
              ) : (
                "Pay Now"
              )}
            </button>
          ) : (
            <p className="please-add-card-note">💳 Please add a card to proceed with the payment.</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              ×
            </button>
            <h2>Add a new Card</h2>
            <form onSubmit={handleAddCard}>
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                className="input-field input-field-198"
                value={cardData.cardNumber}
                onChange={handleChange}
                maxLength={16}
              />
              {errors.cardNumber && <p className="error-msg">{errors.cardNumber}</p>}

              <div className="card-row">
                <div>
                  <label>Exp. Date</label>
                  <input
                    type="text"
                    name="expDate"
                    className="input-field input-field-198"
                    value={cardData.expDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                  />
                  {errors.expDate && <p className="error-msg">{errors.expDate}</p>}
                </div>
                <div>
                  <label>CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    className="input-field input-field-198"
                    value={cardData.cvc}
                    onChange={handleChange}
                    maxLength={3}
                  />
                  {errors.cvc && <p className="error-msg">{errors.cvc}</p>}
                </div>
              </div>

              <label>Name on Card</label>
              <input
                type="text"
                name="nameOnCard"
                className="input-field input-field-198"
                value={cardData.nameOnCard}
                onChange={handleChange}
              />
              {errors.nameOnCard && <p className="error-msg">{errors.nameOnCard}</p>}

              <label>Country or Region</label>
              <select
                name="country"
                className="select-field input-field-198"
                value={cardData.country}
                onChange={handleChange}
              >
                <option>United States</option>
                <option>Pakistan</option>
                <option>India</option>
                <option>UK</option>
              </select>

              <div className="checkbox1">
                <input type="checkbox" checked readOnly />
                <label>Securely save my information for 1-click checkout</label>
              </div>
              <button className="add-card-btn" type="submit">Add Card</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;

import React, { useState, useEffect, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import "../../styles/account.css";
import Profile from "../../assets/img/Profile.png";
import CoverPic from "../../assets/img/CoverPic.png";
import Upload from "../../assets/img/Upload.svg";
import Edit from "../../assets/img/Edit.svg";
import Visa from "../../assets/img/Visa.png";
import Bin from "../../assets/img/Bin.svg"
import axios from "axios";




const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/duhgfqdgt/image/upload";
const UPLOAD_PRESET = "profile_pics";


const ImageModal = ({ src, alt, onClose }) => {
  if (!src) return null;

  return (
    <div className="modal-overlay4" onClick={onClose}>
      <div className="modal-content4" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="modal-image4" />
        <button className="close-btn4" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};




const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState(Profile);
  const [coverPic, setCoverPic] = useState(CoverPic);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [isCover, setIsCover] = useState(false); // Check which is being uploaded
  const [modalImage, setModalImage] = useState(null); // For Image View
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expDate: '',
    cvc: '',
    nameOnCard: '',
    country: 'United States',
  });
  const [cards, setCards] = useState([]); // For displaying saved cards  
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [scale, setScale] = useState(1.2);
  const editorRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
  
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setUser(res.data);
        setUserData(res.data); // ✅ This line is necessary
      } catch (err) {
        console.log("MyAccount Error:", err);
        setUser(null);
      }
      setLoading(false);
    };
  
    fetchUser();
  }, []);
  


  useEffect(() => {
    if (isPhoneModalOpen && user) {
      setPhoneNumber( user.phoneNumber || ""); // safe fallback
    }

    if (isNameModalOpen && user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  
    if (isAddressModalOpen && user) {
      setAddress(user.address || "");
    }
  }, [isPhoneModalOpen, isNameModalOpen, isAddressModalOpen, user]);
  
  

  const uploadCroppedImage = async () => {
    const token = localStorage.getItem("token");
    if (!editorRef.current) return;
  
    const canvas = editorRef.current.getImageScaledToCanvas();
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", UPLOAD_PRESET);
  
      try {
        setLoading(true); // 👈 show uploading state
  
        const cloudRes = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
        const imageUrl = cloudRes.data.secure_url;
  
        const updatePayload = isCover
          ? { coverPic: imageUrl }
          : { profilePic: imageUrl };
  
        const res = await axios.put("/api/users/me", updatePayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const updatedUser = res.data.user;
        setUser(updatedUser);
        setUserData(updatedUser);
        setIsCropModalOpen(false);
      } catch (err) {
        console.error("Upload or update failed", err);
      } finally {
        setLoading(false); // 👈 hide uploading state
      }
    });
  };
  
  
  const handleNameUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put('/api/users/me', {
        firstName,
        lastName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const updatedUser = res.data.user;
      setUser(updatedUser);
      setUserData(updatedUser);
      setIsNameModalOpen(false);
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };
  
  const handlePhoneUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put('/api/users/me', { phoneNumber }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const updatedUser = res.data.user;
      setUser(updatedUser);
      setUserData(updatedUser);
      setIsPhoneModalOpen(false);
    } catch (error) {
      console.error("Error updating phone:", error);
    }
  };
  
  const handleAddressUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put('/api/users/me', { address }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const updatedUser = res.data.user;
      setUser(updatedUser);
      setUserData(updatedUser);
      setIsAddressModalOpen(false);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };
  
  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };
  
  
  const handleAddCard = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    try {
      const res = await axios.post("http://localhost:5000/api/cards", cardData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("New card to add:", res.data); // this is correct

  
setCards(prevCards => [...(prevCards || []), res.data]);// Add new card to list
      setIsModalOpen(false); // Close modal
      setCardData({ cardNumber: '', expDate: '', cvc: '', nameOnCard: '', country: 'United States' }); // Reset
    } catch (error) {
      console.error("Card Save Error:", error);
    }
  };
    

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    const fetchCards = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched cards:", res.data); // Just res.data
        setCards(res.data); // ✅ Corrected line
      } catch (error) {
        console.error("Fetch Cards Error:", error);
      }
    };
  
    fetchCards();
  }, []);



  const handleDeleteCard = async (cardId) => {
    const token = localStorage.getItem("token");
  
    try {
      await axios.delete(`http://localhost:5000/api/cards/${cardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // UI se card hata do
      setCards(prevCards => prevCards.filter(card => card._id !== cardId));
      console.log("Card deleted successfully!");
    } catch (error) {
      console.error("Card Delete Error:", error);
    }
  };
  
  
  
  
  
  

  return (
    <div className="profile-container">
      <div className="cover">
        <img src={user?.coverPic} alt="Cover" className="cover-image" onClick={() => setModalImage(coverPic)} />
        <label className="upload-cover" onClick={() => document.getElementById('coverUpload').click()}>
          <img src={Upload} alt="" className="upload" /> Upload
        </label>
        <input
          type="file"
          id="coverUpload"
          hidden
          onChange={(e) => {
            setSelectedCoverImage(URL.createObjectURL(e.target.files[0]));
            setIsCover(true); // Mark that cover is being uploaded
            setIsCropModalOpen(true);
          }}
        />

      </div>

      <div className="profile-info">
        <div className="profile-image-container" >
          <img src={user?.profilePic} alt="Profile" className="profile-image" onClick={() => setModalImage(profilePic)} />
          <label className="edit-profile" onClick={() => document.getElementById('profileUpload').click()}>
            ✏️
          </label>
          <input
            type="file"
            id="profileUpload"
            hidden
            onChange={(e) => {
              setSelectedProfileImage(URL.createObjectURL(e.target.files[0]));
              setIsCover(false); // Mark that profile is being uploaded
              setIsCropModalOpen(true);
            }}
          />
          {modalImage && <ImageModal src={modalImage} alt="Preview" onClose={() => setModalImage(null)} />}
        </div>

        {loading ? (
        <h2>Loading...</h2>
      ) : user ? (
        <>
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          <p>{user.email || "No email available"}</p>
        </>
      ) : (
        <>
          <h2>Guest User</h2>
          <p>Please log in</p>
        </>
      )}
      </div>

      {isCropModalOpen && (
        <div className="modal-overlay3">
          <div className="modal-content3">
            <h2>{isCover ? "Crop Cover Photo" : "Crop Profile Picture"}</h2>
            <AvatarEditor
              ref={editorRef}
              image={isCover ? selectedCoverImage : selectedProfileImage}
              width={isCover ? window.innerWidth * 0.8 : 200} // ✅ Cover ke liye screen width ka 80%, Profile fixed
              height={isCover ? (window.innerWidth * 0.8) / 3 : 200} // ✅ Cover ka 3:1 ratio, Profile 1:1
              border={isCover ? 25 : 50} // ✅ Cover border kam, Profile zyada
              scale={scale}
              borderRadius={isCover ? 0 : 100} // ✅ Profile pic circular
            />

            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
            />
            <button className="crop-upload-btn" onClick={uploadCroppedImage} disabled={loading}>
  {loading ? "Uploading..." : "Crop & Upload"}
</button>
            <button onClick={() => setIsCropModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}


      <div className="tabs">
        <button className={`tab ${activeTab === "account" ? "active" : ""}`} onClick={() => setActiveTab("account")}>Account</button>
        <button className={`tab ${activeTab === "history" ? "active" : ""}`} onClick={() => setActiveTab("history")}>History</button>
        <button className={`tab ${activeTab === "payment" ? "active" : ""}`} onClick={() => setActiveTab("payment")}>Payment methods</button>
        <div className={`active-tab-indicator ${activeTab}`} />
      </div>

      {activeTab === "account" && (
        <div className="account-details">
          <h3>Account</h3>
          <div className="info-box">
            <div className="info-item">
              <strong>Name</strong>
              <p>{user ? `${user.firstName} ${user.lastName}` : "Guest User"}</p>
              <button className="change-btn" onClick={() => setIsNameModalOpen(true)}>
                <img src={Edit} alt="" className="Edit-chnage-btn" /> Change
              </button>
            </div>
            {/* <div className="info-item">
              <strong>Email</strong>
              <p>{user?.email || "No email available"}</p>
              <button className="change-btn">
                <img src={Edit} alt="" className="Edit-chnage-btn" /> Change
              </button>
            </div>
            <div className="info-item">
              <strong>Password</strong>
              <p>*********</p>
              <button className="change-btn">
                <img src={Edit} alt="" className="Edit-chnage-btn" /> Change
              </button>
            </div> */}
            <div className="info-item">
              <strong>Phone number</strong>
              <p>{userData?.phoneNumber || "+1 000-000-0000"}</p>
              <button className="change-btn" onClick={() => setIsPhoneModalOpen(true)}>
                <img src={Edit} alt="" className="Edit-chnage-btn" /> Change
              </button>
            </div>
            <div className="info-item">
              <strong>Address</strong>
              <p>{userData?.address || "No address provided"}</p>
  <button className="change-btn" onClick={() => setIsAddressModalOpen(true)}>
                <img src={Edit} alt="" className="Edit-chnage-btn" /> Change
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "payment" && (
        <div className="payment-methods2">
          <h3 className="p-method-haiding">Payment methods</h3>
          <div className="payment-container2">
          {Array.isArray(cards) && cards.length > 0 ? (
  cards.map((card, index) => (
    <div key={index} className="card2">
      <img className="bin" src={Bin} alt="bin"  onClick={() => handleDeleteCard(card._id)} />
      <div className="card-top2">
        <p className="card-number2">**** **** **** {card.cardNumber.slice(-4)}</p>
        <span></span>
      </div>
      <p className="valid-thru2">Valid<strong> {card.expDate}</strong></p>
      <img src={Visa} alt="Visa" className="card-logo2" />
    </div>
  ))
) : (
  <p className="no-account">No cards added yet.</p>
)}

            <div className="add-card2">
              <div className="add-icon2" onClick={() => setIsModalOpen(true)}>+</div>
              <p>Add a new card</p>
            </div>
          </div>
        </div>
      )}

{isNameModalOpen && (
  <div className="modal-overlay2">
    <div className="modal-content2">
      <button className="close-btn2" onClick={() => setIsNameModalOpen(false)}>×</button>
      <h2 className="Edit-Name-haiding">Edit Name</h2>
      
      <input
        type="text"
        className="input-field2"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      
      <input
        type="text"
        className="input-field3"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      
      <button className="save-btn2" onClick={handleNameUpdate}>Save</button>
    </div>
  </div>
)}



{isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
      <h2>Add a new Card</h2>

      <form>
        <label>Card Number</label>
        <input
          type="text"
          className="input-field"
          placeholder="4321 4321 4321 4321"
          name="cardNumber"
          value={cardData.cardNumber}
          onChange={handleChange}
        />

        <div className="card-row">
          <div>
            <label className="modal-label">Exp. Date</label>
            <input
              type="text"
              className="input-field"
              placeholder="02/27"
              name="expDate"
              value={cardData.expDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="modal-label">CVC</label>
            <input
              type="text"
              className="input-field"
              placeholder="123"
              name="cvc"
              value={cardData.cvc}
              onChange={handleChange}
            />
          </div>
        </div>

        <label className="modal-label">Name on Card</label>
        <input
          type="text"
          className="input-field"
          placeholder="John Doe"
          name="nameOnCard"
          value={cardData.nameOnCard}
          onChange={handleChange}
        />

        <label className="modal-label">Country or Region</label>
        <select
          className="select-field"
          name="country"
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

        <button className="add-card-btn" onClick={handleAddCard}>Add Card</button>
      </form>
    </div>
  </div>
)}


      {isPhoneModalOpen && (
  <div className="modal-overlay-a">
    <div className="modal-content-a">
      <button className="close-btn-a" onClick={() => setIsPhoneModalOpen(false)}>×</button>
      <h2 className="Edit-Name-haiding-a">Edit Phone Number</h2>
      <input type="text" className="input-field-a" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button className="save-btn-a" onClick={handlePhoneUpdate}>Save</button>
    </div>
  </div>
)}


{isAddressModalOpen && (
  <div className="modal-overlay-a">
    <div className="modal-content-a">
      <button className="close-btn-a" onClick={() => setIsAddressModalOpen(false)}>×</button>
      <h2 className="Edit-Name-haiding-a">Edit Address</h2>
      <input type="text" className="input-field-a" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button className="save-btn-a" onClick={handleAddressUpdate}>Save</button>
    </div>
  </div>
)}


    </div>
  );
};

export default MyAccount;


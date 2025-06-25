import React, { useState, useEffect, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import "../../styles/account.css";
import Profile from "../../assets/img/Profile.png";
import CoverPic from "../../assets/img/CoverPic.png";
import Upload from "../../assets/img/Upload.svg";
import Edit from "../../assets/img/Edit.svg";
import Visa from "../../assets/img/Visa.png";
import Bin from "../../assets/img/Bin.svg";
import axios from "axios";

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/duhgfqdgt/image/upload";
const UPLOAD_PRESET = "profile_pics";

// Inline-image modal component
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
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Profile/update modals
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  // Avatar/Cover crop modals
  const [profilePic, setProfilePic] = useState(Profile);
  const [coverPic, setCoverPic] = useState(CoverPic);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [isCover, setIsCover] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [scale, setScale] = useState(1.2);
  const editorRef = useRef(null);

  // Card modal state, data, errors
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expDate: "",
    cvc: "",
    nameOnCard: "",
    country: "United States",
  });
  const [cardErrors, setCardErrors] = useState({});

  // Fetch user details
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setLoading(false); return; }
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Pre-fill modals when opened
  useEffect(() => {
    if (isNameModalOpen && user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
    if (isPhoneModalOpen && user) {
      setPhoneNumber(user.phoneNumber || "");
    }
    if (isAddressModalOpen && user) {
      setAddress(user.address || "");
    }
  }, [isNameModalOpen, isPhoneModalOpen, isAddressModalOpen, user]);

  // Crop & upload function
  const uploadCroppedImage = () => {
    const token = localStorage.getItem("token");
    if (!editorRef.current) return;
    const canvas = editorRef.current.getImageScaledToCanvas();
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", UPLOAD_PRESET);
      try {
        setLoading(true);
        const cloudRes = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
        const imageUrl = cloudRes.data.secure_url;
        const updatePayload = isCover ? { coverPic: imageUrl } : { profilePic: imageUrl };
        const res = await axios.put("http://localhost:5000/api/users/me", updatePayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setUserData(res.data.user);
        setIsCropModalOpen(false);
      } catch (err) {
        console.error("Upload error:", err);
      } finally {
        setLoading(false);
      }
    });
  };

  // Update handlers
  const handleNameUpdate = async () => {
    const token = localStorage.getItem("token");
    await axios.put("http://localhost:5000/api/users/me", { firstName, lastName }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser({ ...user, firstName, lastName });
    setUserData({ ...userData, firstName, lastName });
    setIsNameModalOpen(false);
  };

  const handlePhoneUpdate = async () => {
    const token = localStorage.getItem("token");
    await axios.put("http://localhost:5000/api/users/me", { phoneNumber }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUserData({ ...userData, phoneNumber });
    setIsPhoneModalOpen(false);
  };

  const handleAddressUpdate = async () => {
    const token = localStorage.getItem("token");
    await axios.put("http://localhost:5000/api/users/me", { address }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUserData({ ...userData, address });
    setIsAddressModalOpen(false);
  };

  // Fetch saved cards
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/cards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCards(res.data);
      } catch (err) {
        console.error("Fetch cards error:", err);
      }
    })();
  }, []);

  // Delete card
  const handleDeleteCard = async (cardId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/cards/${cardId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCards(cards.filter(c => c._id !== cardId));
  };

  // Card validation
  const validateCard = () => {
    const errs = {};
    if (!/^\d{16}$/.test(cardData.cardNumber)) errs.cardNumber = "Card must be 16 digits";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expDate)) errs.expDate = "Expiry must be MM/YY";
    if (!/^\d{3}$/.test(cardData.cvc)) errs.cvc = "CVC must be 3 digits";
    if (!cardData.nameOnCard.trim()) errs.nameOnCard = "Name required";
    return errs;
  };

  // Add card handler
  const handleAddCard = async (e) => {
    e.preventDefault();
    const errs = validateCard();
    if (Object.keys(errs).length) {
      setCardErrors(errs);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/cards", cardData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCards(prev => [...prev, res.data]);
      setCardData({ cardNumber: "", expDate: "", cvc: "", nameOnCard: "", country: "United States" });
      setCardErrors({});
      setIsCardModalOpen(false);
    } catch (err) {
      console.error("Error adding card:", err);
    }
  };

  // Update card inputs
  const handleCardChange = (e) => {
    setCardErrors({ ...cardErrors, [e.target.name]: "" });
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  // Render
  return (
    <div className="profile-container">
      {/* Cover + Profile display */}
      <div className="cover">
        <img src={user?.coverPic || coverPic} alt="Cover" className="cover-image"
          onClick={() => setModalImage(user?.coverPic || coverPic)} />
        <label className="upload-cover" onClick={() => document.getElementById("coverUpload").click()}>
          <img src={Upload} alt="" className="upload" /> Upload
        </label>
        <input type="file" id="coverUpload" hidden onChange={(e) => {
          setSelectedCoverImage(URL.createObjectURL(e.target.files[0]));
          setIsCover(true);
          setIsCropModalOpen(true);
        }} />
      </div>

      <div className="profile-info">
        <div className="profile-image-container">
          <img src={user?.profilePic || profilePic} alt="Profile" className="profile-image"
            onClick={() => setModalImage(user?.profilePic || profilePic)} />
          <label className="edit-profile" onClick={() => document.getElementById("profileUpload").click()}>
            ✏️
          </label>
          <input type="file" id="profileUpload" hidden onChange={(e) => {
            setSelectedProfileImage(URL.createObjectURL(e.target.files[0]));
            setIsCover(false);
            setIsCropModalOpen(true);
          }} />
        </div>
        {loading ? (
          <h2>Loading...</h2>
        ) : user ? (
          <>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>{user.email}</p>
          </>
        ) : (
          <><h2>Guest User</h2><p>Please log in</p></>
        )}
        {modalImage && (
          <ImageModal src={modalImage} alt="Enlarged" onClose={() => setModalImage(null)} />
        )}
      </div>

      {/* Avatar crop modal */}
      {isCropModalOpen && (
        <div className="modal-overlay3">
          <div className="modal-content3">
            <h2>{isCover ? "Crop Cover Photo" : "Crop Profile Picture"}</h2>
            <AvatarEditor
              ref={editorRef}
              image={isCover ? selectedCoverImage : selectedProfileImage}
              width={isCover ? window.innerWidth * 0.8 : 200}
              height={isCover ? (window.innerWidth * 0.8) / 3 : 200}
              border={isCover ? 25 : 50}
              scale={scale}
              borderRadius={isCover ? 0 : 100}
            />
            <input type="range" min="1" max="3" step="0.1" value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))} />
            <button className="crop-upload-btn" onClick={uploadCroppedImage} disabled={loading}>
              {loading ? "Uploading..." : "Crop & Upload"}
            </button>
            <button onClick={() => setIsCropModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Tab buttons */}
      <div className="tabs">
        <button className={`tab ${activeTab === "account" ? "active" : ""}`} onClick={() => setActiveTab("account")}>Account</button>
        <button className={`tab ${activeTab === "history" ? "active" : ""}`} onClick={() => setActiveTab("history")}>History</button>
        <button className={`tab ${activeTab === "payment" ? "active" : ""}`} onClick={() => setActiveTab("payment")}>Payment methods</button>
      </div>

      {/* Account tab */}
      {activeTab === "account" && (
        <div className="account-details">
          <h3>Account</h3>
          <div className="info-box">
            {/* Name */}
            <div className="info-item">
              <strong>Name</strong>
              <p>{user ? `${user.firstName} ${user.lastName}` : "Guest User"}</p>
              <button className="change-btn" onClick={() => setIsNameModalOpen(true)}>
                <img src={Edit} alt="Edit" /> Change
              </button>
            </div>
            {/* Phone */}
            <div className="info-item">
              <strong>Phone number</strong>
              <p>{userData?.phoneNumber || "+1 000-000-0000"}</p>
              <button className="change-btn" onClick={() => setIsPhoneModalOpen(true)}>
                <img src={Edit} alt="Edit" /> Change
              </button>
            </div>
            {/* Address */}
            <div className="info-item">
              <strong>Address</strong>
              <p>{userData?.address || "No address provided"}</p>
              <button className="change-btn" onClick={() => setIsAddressModalOpen(true)}>
                <img src={Edit} alt="Edit" /> Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Name modal */}
      {isNameModalOpen && (
        <div className="modal-overlay2"><div className="modal-content2">
          <button className="close-btn2" onClick={() => setIsNameModalOpen(false)}>×</button>
          <h2>Edit Name</h2>
          <input type="text" className="input-field2" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" className="input-field2" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <button className="save-btn2" onClick={handleNameUpdate}>Save</button>
        </div></div>
      )}

      {/* Phone modal */}
      {isPhoneModalOpen && (
        <div className="modal-overlay2"><div className="modal-content2">
          <button className="close-btn2" onClick={() => setIsPhoneModalOpen(false)}>×</button>
          <h2>Edit Phone Number</h2>
          <input type="text" className="input-field2" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <button className="save-btn2" onClick={handlePhoneUpdate}>Save</button>
        </div></div>
      )}

      {/* Address modal */}
      {isAddressModalOpen && (
        <div className="modal-overlay2"><div className="modal-content2">
          <button className="close-btn2" onClick={() => setIsAddressModalOpen(false)}>×</button>
          <h2>Edit Address</h2>
          <input type="text" className="input-field2" value={address} onChange={(e) => setAddress(e.target.value)} />
          <button className="save-btn2" onClick={handleAddressUpdate}>Save</button>
        </div></div>
      )}

      {/* Payment methods tab */}
      {activeTab === "payment" && (
        <div className="payment-methods2">
          <h3>Payment methods</h3>
          <div className="payment-container2">
            {cards.length ? cards.map(card => (
              <div key={card._id} className="card2">
                <img className="bin" src={Bin} alt="Delete" onClick={() => handleDeleteCard(card._id)} />
                <div className="card-top2">
                  <p className="card-number2">**** **** **** {card.cardNumber.slice(-4)}</p>
                </div>
                <p className="valid-thru2">Valid <strong>{card.expDate}</strong></p>
                <img src={Visa} alt="Visa" className="card-logo2" />
              </div>
            )) : (
              <p className="no-account">No cards added yet.</p>
            )}
            <div className="add-card2" onClick={() => setIsCardModalOpen(true)}>
              <div className="add-icon2">+</div>
              <p>Add a new card</p>
            </div>
          </div>
          {/* Card-add modal */}
          {isCardModalOpen && (
            <div className="modal-overlay"><div className="modal-content">
              <button className="close-btn" onClick={() => setIsCardModalOpen(false)}>×</button>
              <h2>Add a new Card</h2>
              <form onSubmit={handleAddCard}>
                <label>Card Number</label>
                <input
                  name="cardNumber"
                  className="input-field-198"
                  value={cardData.cardNumber}
                  onChange={handleCardChange}
                  placeholder="1234123412341234"
                  maxLength={16}
                />
                {cardErrors.cardNumber && <p className="error-msg">{cardErrors.cardNumber}</p>}

                <div className="card-row">
                  <div>
                    <label>Exp. Date</label>
                    <input
                      name="expDate"
                      className="input-field-198"
                      value={cardData.expDate}
                      onChange={handleCardChange}
                      placeholder="MM/YY"
                    />
                    {cardErrors.expDate && <p className="error-msg">{cardErrors.expDate}</p>}
                  </div>
                  <div>
                    <label>CVC</label>
                    <input
                      name="cvc"
                      className="input-field-198"
                      value={cardData.cvc}
                      onChange={handleCardChange}
                      placeholder="123"
                      maxLength={3}
                    />
                    {cardErrors.cvc && <p className="error-msg">{cardErrors.cvc}</p>}
                  </div>
                </div>

                <label>Name on Card</label>
                <input
                  name="nameOnCard"
                  className="input-field-198"
                  value={cardData.nameOnCard}
                  onChange={handleCardChange}
                  placeholder="John Doe"
                />
                {cardErrors.nameOnCard && <p className="error-msg">{cardErrors.nameOnCard}</p>}

                <label>Country</label>
                <select
                  name="country"
                  className="input-field-198"
                  value={cardData.country}
                  onChange={handleCardChange}
                >
                  <option>United States</option>
                  <option>Pakistan</option>
                  <option>India</option>
                  <option>UK</option>
                </select>

                <button type="submit" className="add-card-btn">Add Card</button>
              </form>
            </div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAccount;

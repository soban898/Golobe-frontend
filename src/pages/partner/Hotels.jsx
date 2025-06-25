import React, { useState, useEffect } from "react";
import "../../styles/partner-css/hotel.css";
import HotelError from "../../assets/img/HotelError.png";
import axios from "axios";


const Hotels = () => {
  const [apartments, setApartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
 const [newApartment, setNewApartment] = useState({
  _id: null,
  name: "",
  city: "",
  description: "",
  guests: "",
  price: "",
  location: "",
  images: [],
});


  useEffect(() => {
    const fetchApartments = async () => {
      try {
       const token = localStorage.getItem("token");
const res = await axios.get("http://localhost:5000/api/apartments/my", {
  headers: { Authorization: `Bearer ${token}` },
});

        setApartments(res.data);
      } catch (err) {
        console.error("Fetch apartments error", err);
      }
    };
    fetchApartments();
  }, []);

 const handleSave = async () => {
  const { _id, name, city, description, guests, price, location, images } = newApartment;

  if (!name || !city || !description || !guests || !price || !location) {
    return alert("Please fill all fields.");
  }

  if (images.length < 4) {
    return alert("Please upload at least 4 images.");
  }

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("city", city);
    formData.append("description", description);
    formData.append("guests", guests);
    formData.append("price", price);
    formData.append("location", location);

    const newImages = images.filter((img) => typeof img !== "string");
    const existingImages = images.filter((img) => typeof img === "string");

    newImages.forEach((file) => formData.append("images", file));
    formData.append("existingImages", JSON.stringify(existingImages));

    const token = localStorage.getItem("token"); // ✅ Get JWT token

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // ✅ Attach token
      },
    };

    let res;

    if (_id) {
      // Editing existing apartment
      res = await axios.put(`http://localhost:5000/api/apartments/${_id}`, formData, config);
      const updated = [...apartments];
      updated[editingIndex] = res.data;
      setApartments(updated);
    } else {
      // Creating new apartment
      res = await axios.post("http://localhost:5000/api/apartments", formData, config);
      setApartments((prev) => [...prev, res.data]);
    }

    // Reset form
    setShowModal(false);
    setEditingIndex(null);
    setNewApartment({
      _id: null,
      name: "",
      city: "",
      description: "",
      guests: "",
      price: "",
      location: "",
      images: [],
    });
  } catch (error) {
    console.error("Error saving apartment:", error);
    alert("Failed to save apartment.");
  }
};

  const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token"); // ✅ Grab token

    await axios.delete(`http://localhost:5000/api/apartments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Send token
      },
    });

    setApartments(apartments.filter((apt) => apt._id !== id));
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete apartment.");
  }
};


  const handleEdit = (index) => {
  const apt = apartments[index];
  setEditingIndex(index);
  setNewApartment({ ...apt, _id: apt._id });
  setShowModal(true);
};

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewApartment({ ...newApartment, images: files });
  };

  return (
    <div className="hotels10-wrapper">
      {apartments.length === 0 ? (
        <div className="hotels10-empty">
          <img src={HotelError} alt="No Apartments" />
          <h2>No Apartments Listed</h2>
          <p>You haven't listed any apartments yet.</p>
          <button className="hotels10-btn" onClick={() => setShowModal(true)}>
            Add Apartment
          </button>
        </div>
      ) : (
        <>
          <h2 className="hotels10-title">Your Apartments</h2>
          <table className="hotels10-table">
            <thead>
              <tr>
                <th>Apartment Name</th>
                <th>Location</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apt, index) => (
                <tr key={apt._id}>
                  <td className="hotel10-name-cell">
                    <div className="hotel10-name-wrapper">
                      <img
                        src={`http://localhost:5000${apt.images[0]}`} // first image
                        alt="apartment"
                        className="hotel10-thumb"
                      />
                      <span>{apt.name}</span>
                    </div>
                  </td>

                  <td>{apt.location}</td>
                  <td>${apt.price}</td>
                  <td className="hotels10-actions-cell">
                    <div className="hotels10-action-wrapper">
    <button className="hotels10-edit-btn" onClick={() => handleEdit(index)}>Edit</button>
    <button className="hotels10-delete-btn" onClick={() => handleDelete(apt._id)}>Delete</button>
  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="hotels10-btn hotels10-btn-bottom" onClick={() => setShowModal(true)}>
            Add Apartment
          </button>
        </>
      )}

      {showModal && (
        <div className="hotels10-modal">
          <div className="hotels10-modal-content">
            <h2>{editingIndex !== null ? "Edit Apartment" : "Add Apartment"}</h2>

            <label>Apartment Name</label>
            <input type="text" value={newApartment.name} onChange={(e) => setNewApartment({ ...newApartment, name: e.target.value })} />

            <label>City</label>
            <input type="text" value={newApartment.city} onChange={(e) => setNewApartment({ ...newApartment, city: e.target.value })} />

            <label>Description</label>
            <textarea value={newApartment.description} onChange={(e) => setNewApartment({ ...newApartment, description: e.target.value })}></textarea>

            <label>Number of Guests</label>
            <input type="number" value={newApartment.guests} onChange={(e) => setNewApartment({ ...newApartment, guests: e.target.value })} />

            <label>Price per Night</label>
            <input type="number" value={newApartment.price} onChange={(e) => setNewApartment({ ...newApartment, price: e.target.value })} />

            <label>Location</label>
            <input type="text" value={newApartment.location} onChange={(e) => setNewApartment({ ...newApartment, location: e.target.value })} />

            <label>Upload Images (Min 4)</label>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} />
{newApartment.images.length > 0 && (
  <div className="image-preview-container">
    {newApartment.images.map((file, idx) => {
      const imageSrc =
        typeof file === "string"
          ? `http://localhost:5000${file}` // image from backend
          : URL.createObjectURL(file);     // image from File input
      return (
        <img
          key={idx}
          src={imageSrc}
          alt={`Preview ${idx}`}
          className="image-preview"
        />
      );
    })}
  </div>
)}


            <div className="hotels10-actions">
              <button className="hotels10-btn cancel" onClick={() => {
                setShowModal(false);
                setEditingIndex(null);
                setNewApartment({
                  name: "",
                  city: "",
                  description: "",
                  guests: "",
                  price: "",
                  location: "",
                  images: [],
                });
              }}>Cancel</button>

              <button className="hotels10-btn" onClick={handleSave}>
                Save Apartment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;


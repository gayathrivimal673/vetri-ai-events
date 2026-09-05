import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddGuest.css";

function AddGuest() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Family",
    side: "Bride",
    plusOne: "No",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert("Please enter guest name and phone number");
      return;
    }

    alert("Guest added successfully!");
    navigate("/dashboard/guests");
  };

  return (
    <div className="add-guest-page">

      <div className="add-guest-header">
        <div>
          <span className="guest-kicker">GUEST MANAGEMENT</span>
          <h1>Add Guest</h1>
          <p>Add a new guest to your event guest list.</p>
        </div>

        <button
          className="guest-back-btn"
          onClick={() => navigate("/dashboard/guests")}
        >
          ← Back to Guests
        </button>
      </div>

      <form className="guest-form-card" onSubmit={handleSubmit}>

        <div className="form-section">
          <h2>Guest Information</h2>
          <p>Enter the basic details of the guest.</p>

          <div className="guest-form-grid">

            <div className="guest-field">
              <label>Guest Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter guest name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="guest-field">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="guest-field">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="guest@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="guest-field">
              <label>Guest Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option>Family</option>
                <option>Friends</option>
                <option>Corporate</option>
                <option>VIP</option>
                <option>Close Friends</option>
                <option>Other</option>
              </select>
            </div>

            <div className="guest-field">
              <label>Guest Side</label>
              <select
                name="side"
                value={form.side}
                onChange={handleChange}
              >
                <option>Bride</option>
                <option>Groom</option>
                <option>Both</option>
                <option>Common</option>
              </select>
            </div>

            <div className="guest-field">
              <label>Plus One</label>
              <select
                name="plusOne"
                value={form.plusOne}
                onChange={handleChange}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

          </div>
        </div>

        <div className="form-section">
          <h2>Additional Notes</h2>

          <div className="guest-field">
            <label>Notes</label>
            <textarea
              name="notes"
              rows="5"
              placeholder="Add special requirements or notes..."
              value={form.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="guest-form-actions">
          <button
            type="button"
            className="cancel-guest-btn"
            onClick={() => navigate("/dashboard/guests")}
          >
            Cancel
          </button>

          <button type="submit" className="save-guest-btn">
            + Add Guest
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddGuest;
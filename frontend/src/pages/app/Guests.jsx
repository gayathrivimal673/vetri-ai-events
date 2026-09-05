import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Guests.css";


const guestData = [
  {
    id: 1,
    name: "Priya's Family",
    phone: "+91 98765 43210",
    category: "Family",
    guests: 5,
    rsvp: "Confirmed",
    invitation: "Sent",
  },
  {
    id: 2,
    name: "Arjun's Friends",
    phone: "+91 98765 12345",
    category: "Friends",
    guests: 8,
    rsvp: "Pending",
    invitation: "Sent",
  },
  {
    id: 3,
    name: "Vimal Family",
    phone: "+91 91234 56789",
    category: "Family",
    guests: 4,
    rsvp: "Confirmed",
    invitation: "Accepted",
  },
  {
    id: 4,
    name: "Corporate Guests",
    phone: "+91 99887 66554",
    category: "Corporate",
    guests: 12,
    rsvp: "Pending",
    invitation: "Pending",
  },
  {
    id: 5,
    name: "Close Friends",
    phone: "+91 90000 11223",
    category: "Friends",
    guests: 6,
    rsvp: "Declined",
    invitation: "Accepted",
  },
];

function Guests() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredGuests = guestData.filter((guest) => {
    const searchMatch =
      guest.name.toLowerCase().includes(search.toLowerCase()) ||
      guest.phone.includes(search);

    const categoryMatch =
      category === "All" || guest.category === category;

    const statusMatch =
      status === "All" || guest.rsvp === status;

    return searchMatch && categoryMatch && statusMatch;
  });

  const totalGuests = guestData.reduce(
    (total, guest) => total + guest.guests,
    0
  );

  const confirmed = guestData
    .filter((guest) => guest.rsvp === "Confirmed")
    .reduce((total, guest) => total + guest.guests, 0);

  const pending = guestData
    .filter((guest) => guest.rsvp === "Pending")
    .reduce((total, guest) => total + guest.guests, 0);

  const declined = guestData
    .filter((guest) => guest.rsvp === "Declined")
    .reduce((total, guest) => total + guest.guests, 0);

  return (
    <div className="guests-page">
      <div className="guests-topbar">
        <div>
          <span className="page-kicker">EVENT OPERATIONS</span>
          <h1>Guest Management</h1>
          <p>Manage guests, invitations and RSVP responses.</p>
        </div>

        <button
          className="add-guest-btn"
          onClick={() => navigate("/dashboard/guests/add")}
        >
          + Add Guest
        </button>
      </div>

      <div className="guest-stats">
        <div className="guest-stat-card">
          <div className="stat-icon blue">👥</div>
          <div>
            <span>Total Guests</span>
            <strong>{totalGuests}</strong>
          </div>
        </div>

        <div className="guest-stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <span>Confirmed</span>
            <strong>{confirmed}</strong>
          </div>
        </div>

        <div className="guest-stat-card">
          <div className="stat-icon orange">◷</div>
          <div>
            <span>Pending RSVP</span>
            <strong>{pending}</strong>
          </div>
        </div>

        <div className="guest-stat-card">
          <div className="stat-icon pink">×</div>
          <div>
            <span>Declined</span>
            <strong>{declined}</strong>
          </div>
        </div>
      </div>

      <div className="guest-toolbar">
        <div className="guest-search">
          🔍
          <input
            type="text"
            placeholder="Search guest or phone number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Family">Family</option>
          <option value="Friends">Friends</option>
          <option value="Corporate">Corporate</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All RSVP</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Declined">Declined</option>
        </select>
      </div>

      <div className="guest-card">
        <div className="guest-card-header">
          <div>
            <h2>Arjun & Priya Wedding</h2>
            <span>18 September 2026 • Chennai</span>
          </div>
<button
  className="invite-btn"
  onClick={() => navigate("/dashboard/guests/invitations")}
>
  💌 Send Invitations
</button>
          
        </div>

        <div className="guest-table-wrapper">
          <table className="guest-table">
            <thead>
              <tr>
                <th>Guest / Group</th>
                <th>Phone</th>
                <th>Category</th>
                <th>Guests</th>
                <th>RSVP</th>
                <th>Invitation</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredGuests.map((guest) => (
                <tr key={guest.id}>
                  <td>
                    <div className="guest-name">
                      <div className="guest-avatar">
                        {guest.name.charAt(0)}
                      </div>

                      <strong>{guest.name}</strong>
                    </div>
                  </td>

                  <td>{guest.phone}</td>

                  <td>
                    <span className="category-badge">
                      {guest.category}
                    </span>
                  </td>

                  <td>
                    <strong>{guest.guests}</strong>
                  </td>

                  <td>
                    <span
                      className={`rsvp-badge ${guest.rsvp.toLowerCase()}`}
                    >
                      {guest.rsvp}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`invitation-status ${guest.invitation
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {guest.invitation}
                    </span>
                  </td>

                  <td>
                    <button className="more-btn">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredGuests.length === 0 && (
            <div className="no-guests">
              No guests found.
            </div>
          )}
        </div>
      </div>

      <div className="guest-bottom-grid">
        <div className="guest-info-card">
          <div className="info-icon">💌</div>
          <div>
            <h3>Invitation Tracking</h3>
            <p>
              Track invitation delivery, acceptance and RSVP
              responses from one place.
            </p>
          </div>
        </div>
<button
  className="add-guest-btn"
  onClick={() => navigate("/dashboard/guests/add")}
>
  + Add Guest
</button>
        <div className="guest-info-card">
          <div className="info-icon purple">📱</div>
          <div>
            <button
  className="whatsapp-btn"
  onClick={() => navigate("/dashboard/guests/whatsapp")}
>
  💬 WhatsApp RSVP
</button>
            <p>
              Share event invitations and collect RSVP responses
              through WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guests;
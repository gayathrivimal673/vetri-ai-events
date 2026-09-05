import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InvitationManagement.css";

const invitations = [
  {
    id: 1,
    name: "Priya's Family",
    phone: "+91 98765 43210",
    guests: 5,
    channel: "WhatsApp",
    status: "Delivered",
  },
  {
    id: 2,
    name: "Arjun's Friends",
    phone: "+91 98765 12345",
    guests: 8,
    channel: "WhatsApp",
    status: "Pending",
  },
  {
    id: 3,
    name: "Vimal Family",
    phone: "+91 91234 56789",
    guests: 4,
    channel: "Email",
    status: "Accepted",
  },
  {
    id: 4,
    name: "Corporate Guests",
    phone: "+91 99887 66554",
    guests: 12,
    channel: "WhatsApp",
    status: "Delivered",
  },
];

function InvitationManagement() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState(
    "You're invited to celebrate the beautiful wedding of Arjun & Priya. We would love to have you with us!"
  );

  const toggleGuest = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selected.length === invitations.length) {
      setSelected([]);
    } else {
      setSelected(invitations.map((guest) => guest.id));
    }
  };

  const sendInvitations = () => {
    if (selected.length === 0) {
      alert("Please select at least one guest.");
      return;
    }

    alert(
      `Invitation sent to ${selected.length} guest group(s) successfully!`
    );
  };

  return (
    <div className="invitation-page">
      <div className="invitation-header">
        <div>
          <button
            className="back-btn"
            onClick={() => navigate("/dashboard/guests")}
          >
            ← Back to Guests
          </button>

          <span className="invitation-kicker">GUEST MANAGEMENT</span>

          <h1>Invitation Management</h1>

          <p>
            Send invitations, track delivery and manage guest responses.
          </p>
        </div>

        <button
          className="whatsapp-main-btn"
          onClick={() => navigate("/dashboard/guests/whatsapp")}
        >
          💬 WhatsApp RSVP
        </button>
      </div>

      <div className="invitation-layout">
        <div className="invitation-main-card">
          <div className="card-heading">
            <div>
              <h2>Guest Invitations</h2>
              <p>Arjun & Priya Wedding • 18 September 2026</p>
            </div>

            <button className="select-all-btn" onClick={selectAll}>
              {selected.length === invitations.length
                ? "Clear All"
                : "Select All"}
            </button>
          </div>

          <div className="invitation-list">
            {invitations.map((guest) => (
              <div
                className={`invitation-row ${
                  selected.includes(guest.id) ? "selected" : ""
                }`}
                key={guest.id}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(guest.id)}
                  onChange={() => toggleGuest(guest.id)}
                />

                <div className="inv-avatar">
                  {guest.name.charAt(0)}
                </div>

                <div className="inv-person">
                  <strong>{guest.name}</strong>
                  <span>{guest.phone}</span>
                </div>

                <div className="inv-guests">
                  <strong>{guest.guests}</strong>
                  <span>Guests</span>
                </div>

                <div className="inv-channel">
                  <span>{guest.channel === "WhatsApp" ? "💬" : "✉️"}</span>
                  {guest.channel}
                </div>

                <span
                  className={`inv-status ${guest.status.toLowerCase()}`}
                >
                  {guest.status}
                </span>
              </div>
            ))}
          </div>

          <div className="send-section">
            <div>
              <strong>{selected.length} guest groups selected</strong>
              <span>
                Choose the channel and send your invitation.
              </span>
            </div>

            <button
              className="send-invitation-btn"
              onClick={sendInvitations}
            >
              💌 Send Invitation
            </button>
          </div>
        </div>

        <div className="message-card">
          <div className="message-title">
            <span className="message-icon">💌</span>
            <div>
              <h2>Invitation Message</h2>
              <p>Customize your invitation</p>
            </div>
          </div>

          <label>Message</label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="8"
          />

          <div className="message-preview">
            <span>PREVIEW</span>

            <h3>💐 You're Invited!</h3>

            <p>{message}</p>

            <strong>Arjun & Priya</strong>

            <small>
              18 September 2026
              <br />
              Chennai
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationManagement;
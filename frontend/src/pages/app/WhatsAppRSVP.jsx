import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WhatsAppRSVP.css";

function WhatsAppRSVP() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    "Hello! You are invited to our special event. Please confirm your RSVP."
  );

  const sendWhatsApp = () => {
    const cleanNumber = phone.replace(/\D/g, "");

    if (!cleanNumber) {
      alert("Please enter WhatsApp number");
      return;
    }

    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="whatsapp-page">
      <div className="whatsapp-header">
        <div>
          <p className="page-kicker">GUEST COMMUNICATION</p>
          <h1>WhatsApp RSVP</h1>
          <p>
            Send event invitations and collect RSVP responses through WhatsApp.
          </p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard/guests/invitations")}
        >
          ← Back
        </button>
      </div>

      <div className="whatsapp-grid">
        <div className="whatsapp-card">
          <h2>Send WhatsApp Invitation</h2>

          <label>WhatsApp Number</label>
          <input
            type="text"
            placeholder="Example: 919876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Invitation Message</label>
          <textarea
            rows="8"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="send-whatsapp-btn" onClick={sendWhatsApp}>
            💬 Send on WhatsApp
          </button>
        </div>

        <div className="whatsapp-preview">
          <div className="phone-top">
            <span>WhatsApp</span>
            <span>•••</span>
          </div>

          <div className="chat-area">
            <div className="message-bubble">
              {message}
            </div>
          </div>

          <div className="phone-bottom">
            Type a message...
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsAppRSVP;
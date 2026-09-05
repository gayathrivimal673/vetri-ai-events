import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [whatsapp, setWhatsapp] = useState(true);
  const [email, setEmail] = useState(true);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <span className="settings-label">SYSTEM</span>
          <h1>Settings</h1>
          <p>Manage your Vetri EventOS preferences and account settings.</p>
        </div>

        <button className="settings-save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>

      <div className="settings-layout">

        {/* PROFILE */}
        <section className="settings-card">
          <div className="settings-card-title">
            <div className="settings-icon profile-icon">👤</div>
            <div>
              <h2>Profile Settings</h2>
              <p>Update your personal information</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="settings-avatar">
              <div>GV</div>
              <button>Change Photo</button>
            </div>

            <div className="settings-grid">
              <div className="field-group">
                <label>First Name</label>
                <input type="text" defaultValue="Gayathri" />
              </div>

              <div className="field-group">
                <label>Last Name</label>
                <input type="text" defaultValue="Vimal" />
              </div>

              <div className="field-group">
                <label>Email Address</label>
                <input
                  type="email"
                  defaultValue="gayathri@example.com"
                />
              </div>

              <div className="field-group">
                <label>Phone Number</label>
                <input type="text" defaultValue="+91 98765 43210" />
              </div>

              <div className="field-group full-width">
                <label>Role</label>
                <input
                  type="text"
                  defaultValue="Event Manager"
                  disabled
                />
              </div>
            </div>
          </div>
        </section>

        {/* NOTIFICATIONS */}
        <section className="settings-card">
          <div className="settings-card-title">
            <div className="settings-icon notification-icon">🔔</div>
            <div>
              <h2>Notifications</h2>
              <p>Choose how you receive event updates</p>
            </div>
          </div>

          <div className="settings-options">

            <div className="setting-option">
              <div>
                <strong>Push Notifications</strong>
                <span>Receive important event updates</span>
              </div>

              <button
                className={`toggle ${notifications ? "active" : ""}`}
                onClick={() => setNotifications(!notifications)}
              >
                <span></span>
              </button>
            </div>

            <div className="setting-option">
              <div>
                <strong>Email Notifications</strong>
                <span>Receive event summaries by email</span>
              </div>

              <button
                className={`toggle ${email ? "active" : ""}`}
                onClick={() => setEmail(!email)}
              >
                <span></span>
              </button>
            </div>

            <div className="setting-option">
              <div>
                <strong>WhatsApp Notifications</strong>
                <span>Receive RSVP and event alerts</span>
              </div>

              <button
                className={`toggle ${whatsapp ? "active" : ""}`}
                onClick={() => setWhatsapp(!whatsapp)}
              >
                <span></span>
              </button>
            </div>

          </div>
        </section>

        {/* EVENT PREFERENCES */}
        <section className="settings-card">
          <div className="settings-card-title">
            <div className="settings-icon event-icon">🎯</div>
            <div>
              <h2>Event Preferences</h2>
              <p>Customize your event management experience</p>
            </div>
          </div>

          <div className="settings-grid">

            <div className="field-group">
              <label>Default Event Type</label>
              <select defaultValue="Wedding">
                <option>Wedding</option>
                <option>Engagement</option>
                <option>Reception</option>
                <option>Birthday</option>
                <option>Corporate Event</option>
                <option>Conference</option>
              </select>
            </div>

            <div className="field-group">
              <label>Default City</label>
              <input type="text" defaultValue="Salem" />
            </div>

            <div className="field-group">
              <label>Currency</label>
              <select defaultValue="INR">
                <option>INR - Indian Rupee</option>
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
              </select>
            </div>

            <div className="field-group">
              <label>Date Format</label>
              <select defaultValue="DD/MM/YYYY">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>

          </div>
        </section>

        {/* SECURITY */}
        <section className="settings-card">
          <div className="settings-card-title">
            <div className="settings-icon security-icon">🔐</div>
            <div>
              <h2>Security</h2>
              <p>Protect your account</p>
            </div>
          </div>

          <div className="security-row">
            <div>
              <strong>Password</strong>
              <span>Last changed recently</span>
            </div>

            <button
              className="secondary-btn"
              onClick={() => alert("Password change screen")}
            >
              Change Password
            </button>
          </div>

          <div className="security-row">
            <div>
              <strong>Two-Factor Authentication</strong>
              <span>Add an extra layer of account security</span>
            </div>

            <button
              className="secondary-btn"
              onClick={() => alert("2FA setup")}
            >
              Enable
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Settings;
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">

      <div className="profile-header">
        <div>
          <span className="profile-kicker">ACCOUNT</span>
          <h1>My Profile</h1>
          <p>Manage your personal and professional information.</p>
        </div>

        <Link to="/dashboard/settings" className="profile-settings-btn">
          ⚙ Settings
        </Link>
      </div>

      <div className="profile-main-grid">

        <div className="profile-card">
          <div className="profile-cover"></div>

          <div className="profile-avatar-large">
            GV
          </div>

          <div className="profile-card-content">
            <h2>Gayathri</h2>
            <p className="profile-role">Event Manager</p>
            <p className="profile-email">
              ✉ gayathri@example.com
            </p>

            <div className="profile-status">
              <span></span>
              Account Active
            </div>
          </div>
        </div>

        <div className="profile-details-card">

          <div className="details-heading">
            <div>
              <span>PERSONAL INFORMATION</span>
              <h2>Profile Details</h2>
            </div>

            <button type="button">
              Edit Profile
            </button>
          </div>

          <div className="profile-details-grid">

            <div className="detail-item">
              <small>Full Name</small>
              <strong>Gayathri</strong>
            </div>

            <div className="detail-item">
              <small>Email Address</small>
              <strong>gayathri@example.com</strong>
            </div>

            <div className="detail-item">
              <small>Phone Number</small>
              <strong>+91 XXXXX XXXXX</strong>
            </div>

            <div className="detail-item">
              <small>Role</small>
              <strong>Event Manager</strong>
            </div>

            <div className="detail-item">
              <small>Company</small>
              <strong>Vetri AI Event Management</strong>
            </div>

            <div className="detail-item">
              <small>Location</small>
              <strong>India</strong>
            </div>

          </div>
        </div>

      </div>

      <div className="profile-stats">

        <div className="profile-stat-card">
          <span>📅</span>
          <div>
            <strong>12</strong>
            <small>Events Managed</small>
          </div>
        </div>

        <div className="profile-stat-card">
          <span>✓</span>
          <div>
            <strong>8</strong>
            <small>Completed</small>
          </div>
        </div>

        <div className="profile-stat-card">
          <span>👥</span>
          <div>
            <strong>36</strong>
            <small>Vendors</small>
          </div>
        </div>

        <div className="profile-stat-card">
          <span>⭐</span>
          <div>
            <strong>4.9</strong>
            <small>Rating</small>
          </div>
        </div>

      </div>

      <div className="profile-security-card">

        <div>
          <span className="security-icon">🔐</span>

          <div>
            <h3>Account Security</h3>
            <p>
              Your account is protected with secure authentication.
            </p>
          </div>
        </div>

        <Link to="/dashboard/settings">
          Manage Security →
        </Link>

      </div>

    </div>
  );
}

export default Profile;
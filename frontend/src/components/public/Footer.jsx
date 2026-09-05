import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">V</div>

              <div>
                <strong>Vetri</strong>
                <span>EventOS</span>
              </div>
            </Link>

            <p>
              Plan beautiful moments, coordinate every detail,
              and create unforgettable events with intelligent
              event management.
            </p>

            <div className="footer-social">
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Twitter">𝕏</a>
            </div>
          </div>

          {/* Company */}
          <div className="footer-column">
            <h4>Company</h4>

            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Platform */}
          <div className="footer-column">
            <h4>Platform</h4>

            <Link to="/events">Event Management</Link>
            <Link to="/vendors">Vendor Management</Link>
            <Link to="/guests">Guest & RSVP</Link>
            <Link to="/budget">Budget & Payments</Link>
            <Link to="/ai-planner">AI Event Planner</Link>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4>Stay in the loop ✦</h4>

            <p>
              Get event planning tips, ideas and updates
              from Vetri EventOS.
            </p>

            <form className="footer-form">
              <input
                type="email"
                placeholder="Your email address"
              />

              <button type="submit">
                →
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom">

          <p>
            © 2026 Vetri EventOS. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
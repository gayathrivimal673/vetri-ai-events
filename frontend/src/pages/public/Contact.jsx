import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import "./Contact.css";

function Contact() {
  return (
    <>
      <Navbar />

      <main className="contact-page">

        {/* HERO */}
        <section className="contact-hero">
          <div className="contact-hero-content">
            <span className="contact-badge">✦ LET'S CREATE SOMETHING BEAUTIFUL</span>

            <h1>
              Let's Plan Your
              <span> Perfect Event.</span>
            </h1>

            <p>
              Have an event in mind? Tell us what you're planning and
              our team will help turn your vision into an unforgettable experience.
            </p>
          </div>

          <div className="contact-hero-orbit">
            <div className="orbit-card orbit-card-one">
              <span>💍</span>
              <div>
                <strong>Wedding</strong>
                <small>Beautiful moments</small>
              </div>
            </div>

            <div className="orbit-card orbit-card-two">
              <span>🎉</span>
              <div>
                <strong>Celebration</strong>
                <small>Made memorable</small>
              </div>
            </div>

            <div className="orbit-center">V</div>
          </div>
        </section>

        {/* CONTACT AREA */}
        <section className="contact-main">

          <div className="contact-info">

            <span className="section-label">GET IN TOUCH</span>

            <h2>
              Your next
              <span> unforgettable moment</span>
              starts here.
            </h2>

            <p className="contact-description">
              Whether you're planning an intimate celebration, a grand wedding,
              or a corporate event, Vetri EventOS brings everything together
              in one intelligent platform.
            </p>

            <div className="contact-details">

              <div className="contact-detail-card">
                <div className="detail-icon">✉</div>
                <div>
                  <small>Email us</small>
                  <strong>hello@vetrieventos.com</strong>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="detail-icon">☎</div>
                <div>
                  <small>Call us</small>
                  <strong>+91 98765 43210</strong>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="detail-icon">⌖</div>
                <div>
                  <small>Our location</small>
                  <strong>Salem, Tamil Nadu, India</strong>
                </div>
              </div>

            </div>

            <div className="contact-social">
              <span>Follow our journey</span>

              <div className="social-buttons">
                <a href="#instagram">◎</a>
                <a href="#facebook">f</a>
                <a href="#linkedin">in</a>
              </div>
            </div>

          </div>

          {/* FORM */}
          <div className="contact-form-card">

            <div className="form-top">
              <div>
                <span>START A CONVERSATION</span>
                <h3>Tell us about your event</h3>
              </div>

              <div className="form-sparkle">✦</div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Our team will contact you soon.");
              }}
            >

              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="form-group">
                  <label>Event Type</label>
                  <select defaultValue="">
                    <option value="" disabled>
                      Select event type
                    </option>
                    <option>Wedding</option>
                    <option>Engagement</option>
                    <option>Reception</option>
                    <option>Birthday</option>
                    <option>Corporate Event</option>
                    <option>Conference</option>
                    <option>Product Launch</option>
                    <option>Baby Shower</option>
                    <option>Cultural Event</option>
                    <option>Private Party</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Event Date</label>
                  <input type="date" />
                </div>

                <div className="form-group">
                  <label>Expected Guests</label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    min="1"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tell us about your event</label>
                <textarea
                  rows="5"
                  placeholder="Share your event vision, location, budget or anything you'd like us to know..."
                ></textarea>
              </div>

              <button type="submit" className="contact-submit">
                Send Enquiry
                <span>→</span>
              </button>

              <p className="form-note">
                ✦ Our event team will get back to you shortly.
              </p>

            </form>

          </div>

        </section>

        {/* CTA */}
        <section className="contact-cta">

          <div className="cta-decoration cta-left">✦</div>
          <div className="cta-decoration cta-right">✧</div>

          <span>READY WHEN YOU ARE</span>

          <h2>
            Your dream event
            <br />
            deserves a smarter beginning.
          </h2>

          <p>
            Start planning, manage every detail and create memories
            that last forever.
          </p>

          <Link to="/dashboard" className="cta-button">
            Start Planning
            <span>→</span>
          </Link>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Contact;
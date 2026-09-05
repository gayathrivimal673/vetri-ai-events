import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import "./About.css";

const steps = [
  {
    number: "01",
    title: "Plan",
    text: "Create events, functions, timelines, tasks and budgets in one place.",
  },
  {
    number: "02",
    title: "Coordinate",
    text: "Manage venues, vendors, crew, guests and every event requirement.",
  },
  {
    number: "03",
    title: "Manage",
    text: "Track schedules, payments, approvals and event-day operations.",
  },
  {
    number: "04",
    title: "Celebrate",
    text: "Deliver beautiful events and preserve unforgettable memories.",
  },
];

const stats = [
  { value: "100+", label: "Events Planned" },
  { value: "500+", label: "Guests Managed" },
  { value: "360°", label: "Event Visibility" },
  { value: "24/7", label: "Event Support" },
];

function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">

        {/* HERO */}
        <section className="about-hero">
          <div className="about-orb orb-one"></div>
          <div className="about-orb orb-two"></div>

          <div className="about-hero-inner">

            <div className="about-hero-copy">
              <div className="about-eyebrow">
                ✦ ABOUT VETRI EVENTOS
              </div>

              <h1>
                Where Every Event
                <span> Becomes a Story.</span>
              </h1>

              <p>
                Vetri EventOS is an intelligent event management platform
                designed to bring clients, coordinators, vendors, guests and
                event teams together in one beautiful workspace.
              </p>

              <div className="about-buttons">
                <Link to="/services" className="about-btn primary">
                  Explore Our Services <span>→</span>
                </Link>

                <Link to="/contact" className="about-btn secondary">
                  Talk to Us
                </Link>
              </div>

              <div className="about-mini-trust">
                <div className="trust-dots">
                  <span>V</span>
                  <span>✦</span>
                  <span>+</span>
                </div>
                <p>
                  Smart planning <b>•</b> Human coordination <b>•</b> AI assistance
                </p>
              </div>
            </div>

            <div className="about-hero-visual">

              <div className="hero-image-main">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85"
                  alt="Luxury event"
                />
              </div>

              <div className="hero-image-small">
                <img
                  src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=700&q=85"
                  alt="Wedding celebration"
                />
              </div>

              <div className="floating-info card-guests">
                <div className="float-icon">♢</div>
                <div>
                  <small>EVENT CAPACITY</small>
                  <strong>500+ Guests</strong>
                </div>
              </div>

              <div className="floating-info card-ai">
                <div className="float-icon purple">✦</div>
                <div>
                  <small>SMART PLANNING</small>
                  <strong>AI Assisted</strong>
                </div>
              </div>

              <div className="floating-info card-events">
                <strong>100+</strong>
                <span>Events Planned</span>
              </div>

            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="about-stats-section">
          <div className="about-stats">
            {stats.map((stat, index) => (
              <div className="stat-box" key={index}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* STORY */}
        <section className="about-story">
          <div className="story-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1100&q=85"
              alt="Event table"
            />

            <div className="story-image-label">
              <span>✦</span>
              <div>
                <strong>Beautifully Planned</strong>
                <small>Every detail matters.</small>
              </div>
            </div>
          </div>

          <div className="story-content">
            <div className="section-tag">OUR STORY</div>

            <h2>
              Events should feel
              <span> beautiful, not complicated.</span>
            </h2>

            <p>
              Planning an event involves hundreds of small decisions.
              Venues, vendors, guests, schedules, budgets, payments and
              last-minute changes can quickly become difficult to manage.
            </p>

            <p>
              Vetri EventOS brings everything together into one intelligent
              platform so event teams can spend less time managing
              spreadsheets and more time creating unforgettable experiences.
            </p>

            <div className="story-points">
              <div>
                <span>✓</span>
                <p>One Connected Platform</p>
              </div>

              <div>
                <span>✓</span>
                <p>Smart Event Operations</p>
              </div>

              <div>
                <span>✓</span>
                <p>AI Assisted Planning</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section">
          <div className="how-heading">
            <div className="section-tag">HOW IT WORKS</div>

            <h2>
              Plan. Coordinate.
              <span> Manage. Celebrate.</span>
            </h2>

            <p>
              From the first idea to the final unforgettable memory,
              Vetri EventOS keeps every moving part connected.
            </p>
          </div>

          <div className="steps-wrapper">
            {steps.map((step, index) => (
              <div className="step-card" key={step.number}>

                <div className="step-top">
                  <span>{step.number}</span>
                  <i>
                    {index === 0
                      ? "✦"
                      : index === 1
                      ? "◇"
                      : index === 2
                      ? "◉"
                      : "★"}
                  </i>
                </div>

                <h3>{step.title}</h3>

                <p>{step.text}</p>

                {index !== steps.length - 1 && (
                  <div className="step-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* COLORFUL PLATFORM SECTION */}
        <section className="platform-section">
          <div className="platform-inner">

            <div className="platform-copy">
              <div className="section-tag light">
                THE VETRI EVENTOS DIFFERENCE
              </div>

              <h2>
                One platform.
                <br />
                <span>Every moving part.</span>
              </h2>

              <p>
                Bring event planning, vendors, guests, budgets, schedules,
                tasks and event-day operations together in one connected
                experience.
              </p>

              <Link to="/services" className="platform-link">
                Discover the platform →
              </Link>
            </div>

            <div className="platform-visual">

              <div className="dashboard-card main-dashboard">
                <div className="dashboard-top">
                  <div>
                    <small>EVENT OVERVIEW</small>
                    <strong>Royal Wedding</strong>
                  </div>
                  <span className="live-pill">LIVE</span>
                </div>

                <div className="progress-row">
                  <div>
                    <small>Planning Progress</small>
                    <strong>82%</strong>
                  </div>

                  <div className="progress-bar">
                    <span></span>
                  </div>
                </div>

                <div className="dashboard-items">
                  <div>
                    <span>✓</span>
                    Vendors Confirmed
                    <b>18</b>
                  </div>

                  <div>
                    <span>✓</span>
                    Tasks Completed
                    <b>42</b>
                  </div>

                  <div>
                    <span>◷</span>
                    Upcoming Functions
                    <b>04</b>
                  </div>
                </div>
              </div>

              <div className="small-dashboard budget-card">
                <small>BUDGET</small>
                <strong>₹10,00,000</strong>
                <span>68% utilized</span>
              </div>

              <div className="small-dashboard ai-card">
                <div className="ai-symbol">✦</div>
                <div>
                  <small>AI ASSISTANT</small>
                  <strong>Planning smarter</strong>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* AI */}
        <section className="ai-section">

          <div className="ai-glow"></div>

          <div className="ai-inner">

            <div className="ai-content">
              <div className="section-tag">INTELLIGENT EVENT PLANNING</div>

              <h2>
                Your event has
                <span> an AI brain.</span>
              </h2>

              <p>
                Vetri EventOS uses AI to make event planning faster and
                smarter — from generating checklists to helping with vendor
                recommendations and schedule optimization.
              </p>

              <div className="ai-features">
                <div>
                  <span>✦</span>
                  Smart Checklist
                </div>

                <div>
                  <span>✦</span>
                  Vendor Match
                </div>

                <div>
                  <span>✦</span>
                  Schedule AI
                </div>

                <div>
                  <span>✦</span>
                  Budget Assistant
                </div>
              </div>
            </div>

            <div className="ai-window">

              <div className="ai-window-header">
                <div className="ai-avatar">✦</div>
                <div>
                  <strong>Vetri AI Assistant</strong>
                  <small>Smart Event Planner</small>
                </div>
                <span className="online-dot"></span>
              </div>

              <div className="ai-chat">

                <div className="chat-user">
                  Plan a wedding for 500 guests with a ₹10 lakh budget.
                </div>

                <div className="chat-ai">
                  <span>✦</span>
                  Great! I've created a smart starting plan for your wedding.
                </div>

                <div className="ai-result-grid">
                  <div>Venue</div>
                  <div>Catering</div>
                  <div>Photography</div>
                  <div>Decoration</div>
                  <div>Makeup</div>
                  <div>Guests</div>
                </div>

              </div>

              <div className="ai-input">
                Ask your event assistant...
                <button>→</button>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-final-cta">
          <div className="cta-decoration left">✦</div>
          <div className="cta-decoration right">◇</div>

          <div className="section-tag">READY TO START?</div>

          <h2>
            Let's create something
            <span> unforgettable.</span>
          </h2>

          <p>
            Plan smarter, coordinate effortlessly and create events
            your clients will remember.
          </p>

          <div className="cta-buttons">
            <Link to="/dashboard" className="about-btn primary">
              Start Planning <span>→</span>
            </Link>

            <Link to="/contact" className="about-btn secondary">
              Talk to Our Team
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default About;
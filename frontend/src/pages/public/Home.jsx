import { Link } from "react-router-dom";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import "./Home.css";

const eventTypes = [
  {
    title: "Weddings",
    text: "Beautifully planned celebrations",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Engagements",
    text: "Elegant moments made memorable",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Corporate",
    text: "Professional events that impress",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Celebrations",
    text: "Make every moment special",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85",
  },
];

const services = [
  [
    "💍",
    "Wedding Planning",
    "Complete planning from concept to celebration.",
  ],
  [
    "📅",
    "Smart Scheduling",
    "Organize every function, activity and timeline.",
  ],
  [
    "🤝",
    "Vendor Management",
    "Find and manage trusted event vendors.",
  ],
  [
    "👥",
    "Guest Management",
    "RSVPs, invitations and guest tracking in one place.",
  ],
  [
    "💰",
    "Budget & Payments",
    "Track expenses, budgets and payments effortlessly.",
  ],
  [
    "✨",
    "AI Event Planner",
    "Get intelligent plans, checklists and recommendations.",
  ],
];

const gallery = [
  {
    title: "Dream Wedding",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Elegant Reception",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Corporate Excellence",
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=85",
  },
];

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="hero-new">
        <div className="hero-bg-text">VETRI</div>

        <div className="hero-top">
          <span>✦ AI POWERED</span>
          <span>EVENT MANAGEMENT PLATFORM</span>
        </div>

        <div className="hero-main">
          <div className="hero-title">
            <span>PLAN</span>
            <span>CREATE</span>
            <span className="hero-outline">CELEBRATE</span>
          </div>

          <div className="hero-center-image">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=90"
              alt="Beautiful wedding event"
            />

            <div className="hero-image-badge">
              <span>✦</span>

              <div>
                <strong>Vetri AI</strong>
                <small>Smart Event Planning</small>
              </div>
            </div>
          </div>

          <div className="hero-side-text">
            <p>
              From your first idea to the final celebration, everything comes
              together beautifully.
            </p>

            <Link to="/get-started">
              Start Planning <span>↗</span>
            </Link>
          </div>
        </div>

        <div className="hero-bottom">
          <span>WEDDINGS</span>
          <span>CELEBRATIONS</span>
          <span>CORPORATE EVENTS</span>
          <span>AI PLANNING</span>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats">
        <div className="stats-inner">
          <div>
            <strong>500+</strong>
            <span>Events Planned</span>
          </div>

          <div>
            <strong>1,200+</strong>
            <span>Trusted Vendors</span>
          </div>

          <div>
            <strong>25K+</strong>
            <span>Guests Managed</span>
          </div>

          <div>
            <strong>98%</strong>
            <span>Happy Clients</span>
          </div>
        </div>
      </section>

      {/* ================= EVENT TYPES ================= */}
      <section className="section event-section">
        <div className="section-heading">
          <span>EXPLORE POSSIBILITIES</span>

          <h2>
            Every Event.
            <br />
            <em>Perfectly Planned.</em>
          </h2>

          <p>
            Whatever you are celebrating, Vetri AI Event Management helps you
            plan it beautifully.
          </p>
        </div>

        <div className="event-grid">
          {eventTypes.map((event, index) => (
            <div className="event-card" key={event.title}>
              <img src={event.image} alt={event.title} />

              <div className="event-overlay">
                <span>0{index + 1}</span>

                <div>
                  <h3>{event.title}</h3>
                  <p>{event.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="section services-section">
        <div className="section-heading">
          <span>POWERFUL FEATURES</span>

          <h2>
            Everything You Need.
            <br />
            <em>One Beautiful Place.</em>
          </h2>
        </div>

        <div className="services-grid">
          {services.map(([icon, title, text], index) => (
            <div
              className={`service-card service-${index + 1}`}
              key={title}
            >
              <div className="service-icon">{icon}</div>

              <h3>{title}</h3>

              <p>{text}</p>

              <Link to="/services">Explore →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* ================= AI SECTION ================= */}
      <section className="ai-section">
        <div className="ai-background-circle"></div>

        <div className="ai-container">
          <div className="ai-copy">
            <span>✦ SMART EVENT PLANNING</span>

            <h2>
              Your Event.
              <br />
              <b>Powered by Intelligence.</b>
            </h2>

            <p>
              Tell us what you are planning and let our AI help create your
              event checklist, vendors, schedule and budget plan.
            </p>

            <div className="ai-input">
              <span>✨</span>
              <span>Plan a wedding for 500 guests...</span>
            </div>

            <Link to="/get-started" className="ai-btn">
              Try AI Event Planner →
            </Link>
          </div>

          <div className="ai-dashboard-card">
            <div className="ai-card-header">
              <div>
                <small>AI EVENT PLANNER</small>
                <h3>Your Wedding Plan</h3>
              </div>

              <span>✦</span>
            </div>

            <div className="plan-row">
              <span>📍</span>

              <div>
                <b>Premium Venue</b>
                <small>Chennai • 500 Guests</small>
              </div>

              <strong>✓</strong>
            </div>

            <div className="plan-row">
              <span>🍽️</span>

              <div>
                <b>Catering</b>
                <small>South Indian • ₹2.5L</small>
              </div>

              <strong>✓</strong>
            </div>

            <div className="plan-row">
              <span>📸</span>

              <div>
                <b>Photography</b>
                <small>Premium Package</small>
              </div>

              <strong>✓</strong>
            </div>

            <div className="plan-progress">
              <div>
                <span>Planning Progress</span>
                <b>82%</b>
              </div>

              <div className="progress-line">
                <i></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="section gallery-section">
        <div className="section-heading">
          <span>REAL EVENTS. REAL MOMENTS.</span>

          <h2>
            Moments Worth
            <br />
            <em>Remembering.</em>
          </h2>
        </div>

        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <div
              className={`gallery-card gallery-${index + 1}`}
              key={item.title}
            >
              <img src={item.image} alt={item.title} />

              <div className="gallery-caption">
                <span>VETRI AI</span>

                <h3>{item.title}</h3>

                <Link to="/gallery">View Event →</Link>
              </div>
            </div>
          ))}
        </div>

        <Link to="/gallery" className="gallery-btn">
          Explore Full Gallery →
        </Link>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="process-section">
        <div className="section-heading">
          <span>SIMPLE PROCESS</span>

          <h2>
            From Idea to
            <br />
            <em>Unforgettable.</em>
          </h2>
        </div>

        <div className="process-grid">
          <div className="process-card">
            <span>01</span>
            <div>💡</div>
            <h3>Create Your Event</h3>
            <p>
              Choose your event type, date, venue and requirements.
            </p>
          </div>

          <div className="process-card">
            <span>02</span>
            <div>📋</div>
            <h3>Plan Smarter</h3>
            <p>
              Build schedules, tasks, vendors and budgets.
            </p>
          </div>

          <div className="process-card">
            <span>03</span>
            <div>✨</div>
            <h3>Manage Everything</h3>
            <p>
              Track guests, payments, tasks and event progress.
            </p>
          </div>

          <div className="process-card">
            <span>04</span>
            <div>🥂</div>
            <h3>Enjoy the Moment</h3>
            <p>Let Vetri AI handle the details.</p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="testimonial-section">
        <div className="testimonial">
          <span className="quote">“</span>

          <p>
            Vetri AI completely changed how we manage our events. From vendors
            and guests to budgets and timelines, everything is finally in one
            place.
          </p>

          <div className="reviewer">
            <div className="review-avatar">P</div>

            <div>
              <b>Priya Kumar</b>
              <small>Wedding Client</small>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="final-cta">
        <div className="cta-decoration"></div>

        <span>READY TO CREATE SOMETHING BEAUTIFUL?</span>

        <h2>
          Your Perfect Event
          <br />
          Starts Here.
        </h2>

        <p>
          Plan smarter. Celebrate better. Create unforgettable memories.
        </p>

        <div>
          <Link to="/get-started" className="cta-main">
            Get Started Free →
          </Link>

          <Link to="/contact" className="cta-light">
            Talk to Our Team
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
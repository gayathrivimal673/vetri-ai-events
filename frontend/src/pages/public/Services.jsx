import { Link } from "react-router-dom";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import "./Services.css";

function Services() {
  const services = [
    {
      icon: "✦",
      title: "Smart Event Planning",
      description:
        "Plan weddings, birthdays, corporate events and celebrations with an intelligent event management workflow.",
      features: [
        "Event creation",
        "Multi-function events",
        "Smart timeline",
        "Task management",
      ],
    },
    {
      icon: "♢",
      title: "Vendor Management",
      description:
        "Manage photographers, caterers, decorators, makeup artists, DJs and every event vendor in one place.",
      features: [
        "Vendor profiles",
        "Vendor assignment",
        "Availability tracking",
        "Vendor status",
      ],
    },
    {
      icon: "◎",
      title: "Guest & RSVP",
      description:
        "Keep guest information organized and make RSVP management simple from planning to event day.",
      features: [
        "Guest management",
        "RSVP tracking",
        "Guest status",
        "Event invitations",
      ],
    },
    {
      icon: "₹",
      title: "Budget & Payments",
      description:
        "Track your event budget, expenses, payments and financial progress with complete visibility.",
      features: [
        "Budget planning",
        "Expense tracking",
        "Payment management",
        "Financial overview",
      ],
    },
    {
      icon: "◷",
      title: "Event-Day Operations",
      description:
        "Manage schedules, crew, vendors and live event activities with a powerful event-day workspace.",
      features: [
        "Live schedule",
        "Crew check-in",
        "Delay alerts",
        "Event notifications",
      ],
    },
    {
      icon: "✧",
      title: "AI Event Assistant",
      description:
        "Use AI-powered planning to generate checklists, recommend vendors and optimize your event schedule.",
      features: [
        "AI event planner",
        "Smart checklist",
        "Vendor recommendations",
        "Schedule optimization",
      ],
    },
  ];

  const workflow = [
    "Client",
    "Event",
    "Venue",
    "Vendors",
    "Tasks",
    "Guests",
    "Budget",
    "Event Day",
    "Memories",
  ];

  return (
    <>
      <Navbar />

      <main className="services-page">
        {/* HERO */}
        <section className="services-hero">
          <div className="services-hero-content">
            <div className="services-badge">
              ✦ COMPLETE EVENT MANAGEMENT
            </div>

            <h1>
              Everything You Need
              <span> To Create Amazing Events.</span>
            </h1>

            <p>
              From the first idea to the final celebration, Vetri EventOS
              brings planning, vendors, guests, budgets, schedules and
              event-day operations together in one intelligent platform.
            </p>

            <div className="services-hero-buttons">
              <Link to="/dashboard" className="primary-service-btn">
                Start Planning <span>→</span>
              </Link>

              <Link to="/contact" className="secondary-service-btn">
                Talk to Our Team
              </Link>
            </div>

            <div className="hero-mini-stats">
              <div>
                <strong>500+</strong>
                <span>Guests Managed</span>
              </div>

              <div>
                <strong>360°</strong>
                <span>Event Visibility</span>
              </div>

              <div>
                <strong>AI</strong>
                <span>Powered Planning</span>
              </div>
            </div>
          </div>

          <div className="services-hero-visual">
            <div className="hero-main-card">
              <div className="hero-card-top">
                <span>Upcoming Event</span>
                <span className="live-dot">● Live</span>
              </div>

              <h3>Royal Wedding Celebration</h3>

              <p>Chennai · 500 Guests</p>

              <div className="progress-section">
                <div className="progress-title">
                  <span>Planning Progress</span>
                  <strong>82%</strong>
                </div>

                <div className="progress-bar">
                  <span></span>
                </div>
              </div>

              <div className="hero-card-bottom">
                <div>
                  <small>Budget</small>
                  <strong>₹10,00,000</strong>
                </div>

                <div>
                  <small>Tasks</small>
                  <strong>28 / 34</strong>
                </div>
              </div>
            </div>

            <div className="floating-card floating-one">
              <span>✓</span>
              <div>
                <strong>Vendor Confirmed</strong>
                <small>Royal Decor Studio</small>
              </div>
            </div>

            <div className="floating-card floating-two">
              <span>✦</span>
              <div>
                <strong>AI Planner</strong>
                <small>12 tasks generated</small>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services-section">
          <div className="section-heading">
            <div className="section-label">OUR SERVICES</div>

            <h2>
              One Platform.
              <span> Every Event Detail.</span>
            </h2>

            <p>
              Everything your team needs to plan, coordinate, manage and
              deliver unforgettable events.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <article className={`service-card card-${index + 1}`} key={service.title}>
                <div className="service-icon">{service.icon}</div>

                <div className="service-number">
                  0{index + 1}
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <div className="service-features">
                  {service.features.map((feature) => (
                    <div className="service-feature" key={feature}>
                      <span>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <Link to="/contact" className="service-link">
                  Explore Service <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="workflow-section">
          <div className="section-heading">
            <div className="section-label">SMART WORKFLOW</div>

            <h2>
              From First Idea
              <span> To Final Memories.</span>
            </h2>

            <p>
              Connect every part of your event journey through one seamless
              workflow.
            </p>
          </div>

          <div className="workflow-container">
            {workflow.map((item, index) => (
              <div className="workflow-item" key={item}>
                <div className="workflow-circle">
                  {index + 1}
                </div>

                <strong>{item}</strong>

                {index !== workflow.length - 1 && (
                  <div className="workflow-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* AI SECTION */}
        <section className="ai-service-section">
          <div className="ai-content">
            <div className="section-label">✦ AI POWERED</div>

            <h2>
              Plan Smarter.
              <span> Celebrate Better.</span>
            </h2>

            <p>
              Let AI help you create event checklists, recommend vendors,
              optimize schedules and make better planning decisions.
            </p>

            <div className="ai-points">
              <div>
                <span>01</span>
                <strong>AI Event Planner</strong>
                <p>
                  Generate a complete event plan based on your event type,
                  guests, location and budget.
                </p>
              </div>

              <div>
                <span>02</span>
                <strong>Smart Checklist</strong>
                <p>
                  Automatically create important tasks and planning
                  activities for your event.
                </p>
              </div>

              <div>
                <span>03</span>
                <strong>AI Recommendations</strong>
                <p>
                  Get intelligent vendor and schedule recommendations for
                  smoother event execution.
                </p>
              </div>
            </div>
          </div>

          <div className="ai-visual">
            <div className="ai-glow"></div>

            <div className="ai-window">
              <div className="ai-window-header">
                <span>✦</span>
                <strong>Vetri AI Assistant</strong>
                <small>Online</small>
              </div>

              <div className="ai-message user-message">
                Plan a wedding for 500 guests with a ₹10 lakh budget.
              </div>

              <div className="ai-message assistant-message">
                <strong>Perfect! I've created your event plan.</strong>

                <div className="ai-result">
                  <div>✓ Venue & Catering</div>
                  <div>✓ Photography & Videography</div>
                  <div>✓ Decoration & Makeup</div>
                  <div>✓ Invitations & Guest Management</div>
                  <div>✓ Transportation & Entertainment</div>
                </div>
              </div>

              <div className="ai-input">
                Ask AI anything about your event...
                <span>→</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="services-cta">
          <div className="cta-decoration cta-one"></div>
          <div className="cta-decoration cta-two"></div>

          <div className="cta-content">
            <div className="section-label">READY TO CREATE?</div>

            <h2>
              Your Perfect Event
              <span> Starts Here.</span>
            </h2>

            <p>
              Bring your event planning, people, vendors and operations
              together with Vetri EventOS.
            </p>

            <Link to="/dashboard" className="cta-button">
              Start Planning Your Event <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Services;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import "./Gallery.css";

const categories = ["All", "Wedding", "Corporate", "Birthday", "Celebration"];

const galleryItems = [
  {
    title: "Royal Wedding",
    category: "Wedding",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    size: "large",
  },
  {
    title: "Elegant Reception",
    category: "Wedding",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85",
    size: "normal",
  },
  {
    title: "Corporate Gala",
    category: "Corporate",
    image:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=85",
    size: "tall",
  },
  {
    title: "Birthday Celebration",
    category: "Birthday",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85",
    size: "normal",
  },
  {
    title: "Beautiful Ceremony",
    category: "Wedding",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85",
    size: "wide",
  },
  {
    title: "Luxury Event Night",
    category: "Celebration",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
    size: "normal",
  },
  {
    title: "Dream Reception",
    category: "Wedding",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=900&q=85",
    size: "tall",
  },
  {
    title: "Modern Celebration",
    category: "Celebration",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
    size: "normal",
  },
];

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <Navbar />

      <main className="gallery-page">

        {/* HERO */}
        <section className="gallery-hero">
          <div className="gallery-hero-glow glow-left"></div>
          <div className="gallery-hero-glow glow-right"></div>

          <div className="gallery-hero-content">
            <div className="gallery-eyebrow">
              ✦ OUR EVENT GALLERY
            </div>

            <h1>
              Moments worth
              <span> remembering.</span>
            </h1>

            <p>
              Explore beautiful celebrations, elegant weddings, corporate
              experiences and unforgettable moments created with Vetri EventOS.
            </p>
          </div>

          <div className="gallery-hero-mini">
            <div>
              <strong>100+</strong>
              <span>Events</span>
            </div>

            <div>
              <strong>360°</strong>
              <span>Experience</span>
            </div>

            <div>
              <strong>✦ AI</strong>
              <span>Powered</span>
            </div>
          </div>
        </section>

        {/* FILTERS */}
        <section className="gallery-section">

          <div className="gallery-filter-row">
            <div>
              <span className="gallery-small-label">EXPLORE OUR WORK</span>
              <h2>Every event has a story.</h2>
            </div>

            <div className="gallery-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    activeCategory === category ? "active" : ""
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* GALLERY GRID */}
          <div className="gallery-grid">
            {filteredItems.map((item, index) => (
              <article
                className={`gallery-card ${item.size}`}
                key={`${item.title}-${index}`}
              >
                <img src={item.image} alt={item.title} />

                <div className="gallery-card-overlay">
                  <div className="gallery-card-top">
                    <span>{item.category}</span>
                    <button aria-label="View image">↗</button>
                  </div>

                  <div className="gallery-card-bottom">
                    <small>VETRI EVENTOS</small>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </section>

        {/* EXPERIENCE SECTION */}
        <section className="gallery-experience">

          <div className="experience-inner">

            <div className="experience-image">
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85"
                alt="Wedding event"
              />

              <div className="experience-floating">
                <span>✦</span>
                <div>
                  <strong>Beautifully Managed</strong>
                  <small>From idea to celebration.</small>
                </div>
              </div>
            </div>

            <div className="experience-content">
              <span className="gallery-small-label">
                MORE THAN AN EVENT
              </span>

              <h2>
                We manage the details.
                <span>You enjoy the moment.</span>
              </h2>

              <p>
                Behind every beautiful event is hundreds of decisions,
                timelines, vendors, guests and moving parts. Vetri EventOS
                brings them together so your team can focus on creating
                experiences that truly matter.
              </p>

              <div className="experience-points">
                <div>
                  <span>01</span>
                  <p>Smart Event Planning</p>
                </div>

                <div>
                  <span>02</span>
                  <p>Connected Vendor Management</p>
                </div>

                <div>
                  <span>03</span>
                  <p>Real-Time Event Operations</p>
                </div>

                <div>
                  <span>04</span>
                  <p>AI Assisted Decisions</p>
                </div>
              </div>

              <Link to="/services" className="gallery-cta">
                Explore Platform <span>→</span>
              </Link>
            </div>

          </div>
        </section>

        {/* FINAL CTA */}
        <section className="gallery-final">

          <div className="gallery-final-shape shape-one"></div>
          <div className="gallery-final-shape shape-two"></div>

          <span className="gallery-small-label light">
            YOUR MOMENT IS NEXT
          </span>

          <h2>
            Let's create your
            <span> next beautiful story.</span>
          </h2>

          <p>
            From intimate celebrations to large-scale events,
            Vetri EventOS helps you plan every moment beautifully.
          </p>

          <div className="gallery-final-buttons">
            <Link to="/dashboard" className="gallery-main-btn">
              Start Planning <span>→</span>
            </Link>

            <Link to="/contact" className="gallery-outline-btn">
              Talk to Us
            </Link>
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Gallery;
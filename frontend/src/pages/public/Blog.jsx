import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import "./Blog.css";

const posts = [
  {
    category: "EVENT PLANNING",
    title: "How to Plan a Wedding Without the Stress",
    text: "A practical guide to managing venues, vendors, guests, budgets and timelines from one place.",
    date: "Sep 02, 2026",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
  },
  {
    category: "SMART EVENTS",
    title: "How AI Is Changing Modern Event Planning",
    text: "Discover how intelligent tools can simplify checklists, vendor selection, budgets and schedules.",
    date: "Aug 28, 2026",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85",
  },
  {
    category: "EVENT OPERATIONS",
    title: "The Ultimate Event-Day Management Checklist",
    text: "Everything your coordination team should track before and during the big day.",
    date: "Aug 21, 2026",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
  },
];

function Blog() {
  return (
    <>
      <Navbar />

      <main className="blog-page">

        {/* HERO */}
        <section className="blog-hero">
          <div className="blog-glow blog-glow-one"></div>
          <div className="blog-glow blog-glow-two"></div>

          <div className="blog-hero-content">
            <div className="blog-eyebrow">✦ VETRI EVENTOS INSIGHTS</div>

            <h1>
              Ideas that make
              <span> events better.</span>
            </h1>

            <p>
              Planning inspiration, event strategies, smart technology and
              practical ideas to help you create unforgettable experiences.
            </p>
          </div>
        </section>

        {/* FEATURED */}
        <section className="blog-featured">
          <div className="blog-section-heading">
            <div>
              <span>FEATURED STORY</span>
              <h2>Fresh ideas for your next event.</h2>
            </div>

            <Link to="/services">Explore Services →</Link>
          </div>

          <article className="featured-post">
            <div className="featured-image">
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85"
                alt="Elegant event"
              />

              <div className="featured-badge">FEATURED</div>
            </div>

            <div className="featured-content">
              <span>EVENT MANAGEMENT</span>

              <h2>
                From first idea to
                <strong> unforgettable celebration.</strong>
              </h2>

              <p>
                Great events don't happen by accident. They happen when every
                detail is connected — from planning and vendors to guests,
                schedules, budgets and event-day operations.
              </p>

              <div className="featured-meta">
                <span>✦ Vetri EventOS</span>
                <span>5 min read</span>
              </div>

              <button className="read-button">
                Read Story <span>→</span>
              </button>
            </div>
          </article>
        </section>

        {/* POSTS */}
        <section className="blog-posts">
          <div className="posts-heading">
            <div>
              <span>LATEST ARTICLES</span>
              <h2>Learn. Plan. Create.</h2>
            </div>

            <p>
              Simple ideas and expert thinking for modern event teams.
            </p>
          </div>

          <div className="posts-grid">
            {posts.map((post, index) => (
              <article className="post-card" key={index}>
                <div className="post-image">
                  <img src={post.image} alt={post.title} />

                  <span>{post.category}</span>
                </div>

                <div className="post-content">
                  <div className="post-date">{post.date}</div>

                  <h3>{post.title}</h3>

                  <p>{post.text}</p>

                  <button>
                    Read Article <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* TOPICS */}
        <section className="blog-topics">
          <div className="topics-inner">
            <div className="topics-copy">
              <span>EXPLORE TOPICS</span>

              <h2>
                Find ideas for
                <strong> every kind of event.</strong>
              </h2>

              <p>
                Whether you're planning a wedding, corporate gathering or
                private celebration, discover useful ideas for every stage.
              </p>
            </div>

            <div className="topics-grid">
              <div>
                <span>01</span>
                <strong>Wedding Planning</strong>
                <small>Timelines, vendors & guests</small>
              </div>

              <div>
                <span>02</span>
                <strong>Corporate Events</strong>
                <small>Professional event operations</small>
              </div>

              <div>
                <span>03</span>
                <strong>Budget & Vendors</strong>
                <small>Spend smarter & manage better</small>
              </div>

              <div>
                <span>04</span>
                <strong>AI & Technology</strong>
                <small>The future of event planning</small>
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="blog-newsletter">
          <div className="newsletter-inner">
            <div>
              <span>STAY INSPIRED</span>
              <h2>
                Get smarter event ideas
                <strong> in your inbox.</strong>
              </h2>
            </div>

            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
              />
              <button>Subscribe →</button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="blog-cta">
          <span>READY TO PLAN?</span>

          <h2>
            Your next great event
            <strong> starts here.</strong>
          </h2>

          <p>
            Plan beautifully, coordinate effortlessly and make every moment
            count with Vetri EventOS.
          </p>

          <div>
            <Link to="/dashboard">Start Planning →</Link>
            <Link to="/contact">Talk to Us</Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Blog;
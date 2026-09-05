import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AIPlanner.css";

function AIPlanner() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    eventType: "Wedding",
    guests: "500",
    location: "Chennai",
    budget: "1000000",
    duration: "2",
  });

  const [generated, setGenerated] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generatePlan = (e) => {
    e.preventDefault();
    setGenerated(true);
  };

  return (
    <div className="ai-planner-page">
      <div className="ai-planner-top">
        <button
          className="ai-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>

        <div className="ai-title">
          <div className="ai-orb">✦</div>

          <div>
            <span>VETRI AI</span>
            <h1>AI Event Planner</h1>
            <p>
              Turn your event idea into a complete, organized event plan.
            </p>
          </div>
        </div>
      </div>

      <div className="ai-planner-layout">
        <section className="planner-form-card">
          <div className="card-top">
            <span>✨ SMART PLANNING</span>
            <h2>Tell us about your event</h2>
            <p>
              Give Vetri AI a few details and we'll create a personalized
              event plan for you.
            </p>
          </div>

          <form onSubmit={generatePlan}>
            <div className="form-group">
              <label>Event Type</label>

              <select
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
              >
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

            <div className="two-fields">
              <div className="form-group">
                <label>Expected Guests</label>
                <input
                  type="number"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  placeholder="500"
                />
              </div>

              <div className="form-group">
                <label>Event Duration</label>

                <select
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                >
                  <option value="1">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="7">1 Week</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Chennai"
              />
            </div>

            <div className="form-group">
              <label>Total Budget</label>

              <div className="budget-input">
                <span>₹</span>

                <input
                  type="number"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="1000000"
                />
              </div>
            </div>

            <button className="generate-btn" type="submit">
              <span>✦</span>
              Generate My Event Plan
              <b>→</b>
            </button>
          </form>

          <div className="planner-tip">
            <span>💡</span>
            <p>
              <strong>AI Tip:</strong> More details help Vetri AI create a
              more accurate event plan.
            </p>
          </div>
        </section>

        <section className="ai-result-area">
          {!generated ? (
            <div className="empty-ai-card">
              <div className="empty-orb">
                <span>✦</span>
              </div>

              <h2>Your AI Event Plan</h2>

              <p>
                Your personalized event plan will appear here after you
                provide your event details.
              </p>

              <div className="ai-mini-features">
                <span>Venue</span>
                <span>Catering</span>
                <span>Decoration</span>
                <span>Photography</span>
                <span>Tasks</span>
                <span>Budget</span>
              </div>
            </div>
          ) : (
            <div className="generated-plan">
              <div className="result-header">
                <div>
                  <span>✦ AI GENERATED PLAN</span>
                  <h2>{form.eventType} Plan</h2>
                  <p>
                    {form.guests} guests · {form.location} ·{" "}
                    {form.duration} day(s)
                  </p>
                </div>

                <div className="ai-ready">
                  ✓ Ready
                </div>
              </div>

              <div className="plan-budget">
                <div>
                  <small>PLANNED BUDGET</small>
                  <strong>
                    ₹{Number(form.budget).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="budget-status">
                  AI Optimized
                </div>
              </div>

              <div className="plan-grid">
                <div className="plan-item">
                  <span>📍</span>
                  <div>
                    <small>VENUE</small>
                    <strong>Premium Event Venue</strong>
                    <p>Suitable for {form.guests} guests</p>
                  </div>
                </div>

                <div className="plan-item">
                  <span>🍽</span>
                  <div>
                    <small>CATERING</small>
                    <strong>Full Service Catering</strong>
                    <p>Menu planning & guest dining</p>
                  </div>
                </div>

                <div className="plan-item">
                  <span>🌸</span>
                  <div>
                    <small>DECORATION</small>
                    <strong>Premium Theme Decor</strong>
                    <p>Stage, flowers & lighting</p>
                  </div>
                </div>

                <div className="plan-item">
                  <span>📸</span>
                  <div>
                    <small>PHOTOGRAPHY</small>
                    <strong>Photo + Videography</strong>
                    <p>Complete event coverage</p>
                  </div>
                </div>

                <div className="plan-item">
                  <span>💄</span>
                  <div>
                    <small>MAKEUP</small>
                    <strong>Professional Makeup</strong>
                    <p>Event-ready beauty services</p>
                  </div>
                </div>

                <div className="plan-item">
                  <span>🎵</span>
                  <div>
                    <small>ENTERTAINMENT</small>
                    <strong>Music & Entertainment</strong>
                    <p>DJ / live entertainment options</p>
                  </div>
                </div>
              </div>

              <div className="ai-generated-actions">
                <button
                  onClick={() =>
                    alert("AI checklist generated successfully!")
                  }
                >
                  ✓ Generate Checklist
                </button>

                <button
                  onClick={() =>
                    alert("AI vendor recommendations generated!")
                  }
                >
                  Find Recommended Vendors
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AIPlanner;
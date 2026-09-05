import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createEvent,
  getEvents,
} from "../../api/eventsApi";
import "./CreateEvent.css";

function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    event_name: "",
    event_type: "wedding",
    event_date: "",
    start_time: "",
    end_time: "",
    venue: "",
    city: "",
    expected_guests: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const eventTypes = [
    ["wedding", "Wedding"],
    ["engagement", "Engagement"],
    ["reception", "Reception"],
    ["birthday", "Birthday"],
    ["corporate", "Corporate"],
    ["conference", "Conference"],
    ["product_launch", "Product Launch"],
    ["baby_shower", "Baby Shower"],
    ["cultural", "Cultural Event"],
    ["private_party", "Private Party"],
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.event_name.trim()) {
      setError("Please enter event name.");
      return;
    }

    if (!form.event_date) {
      setError("Please select event date.");
      return;
    }

    if (!form.start_time || !form.end_time) {
      setError("Please select start and end time.");
      return;
    }

    if (!form.venue.trim()) {
      setError("Please enter venue.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        event_name: form.event_name,
        event_type: form.event_type,
        event_date: form.event_date,
        start_time: form.start_time,
        end_time: form.end_time,
        venue: form.venue,
        city: form.city,
        expected_guests: Number(form.expected_guests) || 0,
        budget: Number(form.budget) || 0,
      };

      const createdEvent = await createEvent(payload);

      console.log("EVENT CREATED:", createdEvent);

      alert("🎉 Event created successfully!");

      navigate("/dashboard/events");
    } catch (err) {
      console.error("CREATE EVENT ERROR:", err);

      if (err.response?.data) {
        console.log("Backend error:", err.response.data);

        const backendError = Object.values(err.response.data)
          .flat()
          .join(" ");

        setError(
          backendError ||
            "Unable to create event. Please check your details."
        );
      } else {
        setError("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">

      <div className="create-event-header">
        <div>
          <span className="eyebrow">CLIENT PORTAL</span>
          <h1>Create Your Event</h1>
          <p>
            Tell us about your event and let Vetri EventOS
            handle the planning.
          </p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard/events")}
        >
          ← Back to Events
        </button>
      </div>

      <div className="create-event-layout">

        {/* LEFT */}
        <div className="create-event-card">

          <div className="card-title">
            <div className="title-icon">✨</div>
            <div>
              <h2>Event Details</h2>
              <p>Enter your basic event information</p>
            </div>
          </div>

          {error && (
            <div className="create-error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Event Name *</label>
              <input
                type="text"
                name="event_name"
                value={form.event_name}
                onChange={handleChange}
                placeholder="Example: Gayathri Wedding"
              />
            </div>

            <div className="form-group">
              <label>Event Type *</label>

              <select
                name="event_type"
                value={form.event_type}
                onChange={handleChange}
              >
                {eventTypes.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Event Date *</label>
                <input
                  type="date"
                  name="event_date"
                  value={form.event_date}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Expected Guests</label>
                <input
                  type="number"
                  name="expected_guests"
                  value={form.expected_guests}
                  onChange={handleChange}
                  placeholder="500"
                  min="0"
                />
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Start Time *</label>
                <input
                  type="time"
                  name="start_time"
                  value={form.start_time}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>End Time *</label>
                <input
                  type="time"
                  name="end_time"
                  value={form.end_time}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-group">
              <label>Venue *</label>
              <input
                type="text"
                name="venue"
                value={form.venue}
                onChange={handleChange}
                placeholder="Example: Grand Palace Convention Hall"
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Example: Salem"
              />
            </div>

            <div className="form-group">
              <label>Estimated Budget</label>

              <div className="budget-input">
                <span>₹</span>
                <input
                  type="number"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="500000"
                  min="0"
                />
              </div>
            </div>

            <button
              type="submit"
              className="create-event-submit"
              disabled={loading}
            >
              {loading ? (
                "Creating Event..."
              ) : (
                <>
                  Create My Event
                  <span>→</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* RIGHT */}
        <div className="create-event-side">

          <div className="ai-create-card">
            <div className="ai-badge">✦ AI POWERED</div>

            <h2>
              Plan Smarter
              <br />
              with Vetri AI
            </h2>

            <p>
              Once your event is created, our AI-powered
              tools can help you build checklists, schedules,
              vendor suggestions and budget plans.
            </p>

            <div className="ai-features">
              <div>
                <span>✓</span>
                AI Event Planner
              </div>

              <div>
                <span>✓</span>
                Smart Checklist
              </div>

              <div>
                <span>✓</span>
                Vendor Recommendations
              </div>

              <div>
                <span>✓</span>
                Budget Assistant
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">💡</div>

            <div>
              <h3>What happens next?</h3>
              <p>
                Your event will appear in your dashboard.
                You can then manage functions, tasks,
                vendors, guests, budget and event schedules.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CreateEvent;
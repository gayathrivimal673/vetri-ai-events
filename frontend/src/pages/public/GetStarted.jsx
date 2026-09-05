import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import { createEvent } from "../../api/eventsApi";
import "./GetStarted.css";

function GetStarted() {
  const navigate = useNavigate();

  const [eventType, setEventType] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    venue: "",
    guests: "",
    budget: "",
  });

  const eventTypes = [
    "Wedding",
    "Engagement",
    "Reception",
    "Birthday",
    "Corporate Event",
    "Conference",
    "Product Launch",
    "Baby Shower",
    "Cultural Event",
    "Private Party",
  ];

  // Frontend name -> Django choice value
  const eventTypeMap = {
    Wedding: "wedding",
    Engagement: "engagement",
    Reception: "reception",
    Birthday: "birthday",
    "Corporate Event": "corporate",
    Conference: "conference",
    "Product Launch": "product_launch",
    "Baby Shower": "baby_shower",
    "Cultural Event": "cultural",
    "Private Party": "private_party",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!eventType) {
      alert("Please select your event type.");
      return;
    }

    if (!formData.eventName.trim()) {
      alert("Please enter event name.");
      return;
    }

    if (!formData.eventDate) {
      alert("Please select event date.");
      return;
    }

    if (!formData.venue.trim()) {
      alert("Please enter venue.");
      return;
    }

    try {
      setLoading(true);

      const eventData = {
        // Django expects lowercase choice values
        event_type: eventTypeMap[eventType],

        event_name: formData.eventName.trim(),

        event_date: formData.eventDate,

        // Required by Django Event model
        start_time: "09:00:00",
        end_time: "22:00:00",

        venue: formData.venue.trim(),

        city: "",

        expected_guests: Number(formData.guests) || 0,

        budget: Number(formData.budget) || 0,

        status: "planning",
      };

      console.log("=================================");
      console.log("CREATING EVENT");
      console.log("=================================");
      console.log(eventData);

      const response = await createEvent(eventData);

      console.log("EVENT CREATED SUCCESSFULLY:");
      console.log(response);

      alert("🎉 Event created successfully!");

      navigate("/dashboard/");
    } catch (error) {
      console.error("=================================");
      console.error("CREATE EVENT ERROR");
      console.error("=================================");

     
  console.error("CREATE EVENT ERROR:", error);
  console.error("BACKEND RESPONSE:", error.response?.data);

  const backendError = error.response?.data;

  alert(
    backendError
      ? JSON.stringify(backendError, null, 2)
      : "Unable to create event. Please make sure the backend server is running."
  );

      

      // Login issue
      if (error.response?.status === 401) {
        alert("Please login first to create an event.");
        navigate("/login");
        return;
      }

      // Show exact Django validation error
      if (backendError) {
        alert(
          "Unable to create event.\n\n" +
            JSON.stringify(backendError, null, 2)
        );
      } else {
        alert(
          "Unable to create event.\n\nPlease make sure the backend server is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="get-started-page">

        {/* HERO */}
        <section className="get-started-hero">
          <div className="get-started-hero-content">

            <span className="hero-badge">
              ✦ START YOUR EVENT
            </span>

            <h1>
              Let's Create Your
              <span> Perfect Event</span>
            </h1>

            <p>
              Tell us a little about your event and Vetri EventOS
              will help you plan every beautiful detail.
            </p>

          </div>
        </section>


        {/* FORM SECTION */}
        <section className="get-started-section">

          <div className="get-started-container">

            {/* LEFT INFO */}
            <div className="get-started-info">

              <span className="section-label">
                EVENT PLANNER
              </span>

              <h2>
                Bring Your
                <span> Vision </span>
                To Life
              </h2>

              <p>
                Start with the basics. You can add functions,
                vendors, guests, schedules and budgets later
                from your EventOS dashboard.
              </p>

              <div className="planner-features">

                <div className="planner-feature">
                  <div className="feature-icon">✨</div>
                  <div>
                    <h4>AI Event Planning</h4>
                    <p>
                      Smart planning assistance for your event.
                    </p>
                  </div>
                </div>

                <div className="planner-feature">
                  <div className="feature-icon">📋</div>
                  <div>
                    <h4>Smart Checklists</h4>
                    <p>
                      Never miss an important event task.
                    </p>
                  </div>
                </div>

                <div className="planner-feature">
                  <div className="feature-icon">💰</div>
                  <div>
                    <h4>Budget Management</h4>
                    <p>
                      Keep your event spending organized.
                    </p>
                  </div>
                </div>

                <div className="planner-feature">
                  <div className="feature-icon">👥</div>
                  <div>
                    <h4>Guest & Vendor Management</h4>
                    <p>
                      Manage everyone from one dashboard.
                    </p>
                  </div>
                </div>

              </div>

            </div>


            {/* FORM CARD */}
            <div className="get-started-card">

              <div className="form-card-header">
                <span className="form-step">
                  STEP 01
                </span>

                <h3>
                  Tell us about your event
                </h3>

                <p>
                  Fill in the basic details to create your event.
                </p>
              </div>


              <form onSubmit={handleSubmit}>

                {/* EVENT TYPE */}
                <div className="form-group">

                  <label>
                    Event Type
                    <span>*</span>
                  </label>

                  <div className="event-type-grid">

                    {eventTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        className={
                          eventType === type
                            ? "event-type-btn selected"
                            : "event-type-btn"
                        }
                        onClick={() => setEventType(type)}
                      >
                        {type}
                      </button>
                    ))}

                  </div>

                </div>


                {/* EVENT NAME */}
                <div className="form-group">

                  <label htmlFor="eventName">
                    Event Name
                    <span>*</span>
                  </label>

                  <input
                    id="eventName"
                    type="text"
                    name="eventName"
                    placeholder="Example: Arjun & Priya Wedding"
                    value={formData.eventName}
                    onChange={handleChange}
                  />

                </div>


                {/* DATE + GUESTS */}
                <div className="form-row">

                  <div className="form-group">

                    <label htmlFor="eventDate">
                      Event Date
                      <span>*</span>
                    </label>

                    <input
                      id="eventDate"
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="form-group">

                    <label htmlFor="guests">
                      Expected Guests
                    </label>

                    <input
                      id="guests"
                      type="number"
                      name="guests"
                      min="0"
                      placeholder="500"
                      value={formData.guests}
                      onChange={handleChange}
                    />

                  </div>

                </div>


                {/* VENUE */}
                <div className="form-group">

                  <label htmlFor="venue">
                    Venue
                    <span>*</span>
                  </label>

                  <input
                    id="venue"
                    type="text"
                    name="venue"
                    placeholder="Example: Grand Palace, Salem"
                    value={formData.venue}
                    onChange={handleChange}
                  />

                </div>


                {/* BUDGET */}
                <div className="form-group">

                  <label htmlFor="budget">
                    Estimated Budget
                  </label>

                  <div className="budget-input">

                    <span>₹</span>

                    <input
                      id="budget"
                      type="number"
                      name="budget"
                      min="0"
                      placeholder="800000"
                      value={formData.budget}
                      onChange={handleChange}
                    />

                  </div>

                </div>


                {/* AI BOX */}
                <div className="ai-planner-box">

                  <div className="ai-planner-icon">
                    ✦
                  </div>

                  <div>

                    <strong>
                      AI Event Planner
                    </strong>

                    <p>
                      After creating your event, use AI Planner
                      to generate checklists, vendors and schedules.
                    </p>

                  </div>

                </div>


                {/* SUBMIT */}
                <button
                  type="submit"
                  className="create-event-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="button-spinner"></span>
                      Creating Event...
                    </>
                  ) : (
                    <>
                      Create My Event
                      <span>→</span>
                    </>
                  )}
                </button>

              </form>

            </div>

          </div>

        </section>


        {/* BOTTOM CTA */}
        <section className="get-started-bottom">

          <div>

            <span>
              VETRI EVENTOS
            </span>

            <h2>
              Plan Beautiful Moments.
              <br />
              Create Unforgettable Events.
            </h2>

            <p>
              Your complete event planning and operations platform.
            </p>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default GetStarted;
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../../api/eventsApi";
import "./EventDetails.css";

const typeLabels = {
  wedding: "Wedding",
  engagement: "Engagement",
  reception: "Reception",
  birthday: "Birthday",
  corporate: "Corporate",
  conference: "Conference",
  product_launch: "Product Launch",
  baby_shower: "Baby Shower",
  cultural: "Cultural Event",
  private_party: "Private Party",
};

const statusLabels = {
  planning: "Planning",
  confirmed: "Confirmed",
  ongoing: "Ongoing",
  completed: "Completed",
  cancelled: "Cancelled",
};

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);

        const data = await getEvent(id);

        setEvent(data);
      } catch (err) {
        console.error("Event details error:", err);
        setError("Unable to load event details.");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatBudget = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  if (loading) {
    return (
      <div className="event-details-page">
        <div className="details-loading">
          <div className="details-spinner"></div>
          <h3>Loading Event...</h3>
          <p>Fetching event information.</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="event-details-page">
        <div className="details-error">
          <div>⚠️</div>
          <h2>{error || "Event not found"}</h2>

          <Link to="/dashboard/events">
            ← Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const functions = event.functions || [];
  const tasks = event.tasks || [];
  const crew = event.crew_members || [];

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <div className="event-details-page">

      {/* TOP */}
      <div className="details-topbar">
        <Link to="/dashboard/events" className="back-events">
          ← Back to Events
        </Link>

        <button className="edit-event-btn">
          ✎ Edit Event
        </button>
      </div>

      {/* HERO */}
      <section className="event-details-hero">

        <div className="hero-event-icon">
          {event.event_type === "wedding"
            ? "💍"
            : event.event_type === "birthday"
            ? "🎂"
            : "✨"}
        </div>

        <div className="hero-event-content">
          <div className="hero-meta">
            <span>{event.event_id}</span>

            <b className={`hero-status status-${event.status}`}>
              {statusLabels[event.status] || event.status}
            </b>
          </div>

          <h1>{event.event_name}</h1>

          <p>
            {typeLabels[event.event_type] || event.event_type}
          </p>

          <div className="hero-location">
            📍 {event.venue}
            {event.city && `, ${event.city}`}
          </div>
        </div>

        <div className="hero-date">
          <span>EVENT DATE</span>
          <strong>{formatDate(event.event_date)}</strong>
        </div>

      </section>

      {/* QUICK STATS */}
      <div className="details-stats">

        <div className="details-stat">
          <span className="detail-stat-icon">👥</span>
          <div>
            <small>Expected Guests</small>
            <strong>{event.expected_guests}</strong>
          </div>
        </div>

        <div className="details-stat">
          <span className="detail-stat-icon">💰</span>
          <div>
            <small>Event Budget</small>
            <strong>{formatBudget(event.budget)}</strong>
          </div>
        </div>

        <div className="details-stat">
          <span className="detail-stat-icon">📋</span>
          <div>
            <small>Total Tasks</small>
            <strong>{tasks.length}</strong>
          </div>
        </div>

        <div className="details-stat">
          <span className="detail-stat-icon">✓</span>
          <div>
            <small>Completed Tasks</small>
            <strong>{completedTasks}</strong>
          </div>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="details-main-grid">

        {/* EVENT INFORMATION */}
        <section className="details-card">

          <div className="details-card-header">
            <div>
              <span className="section-label">EVENT</span>
              <h2>Event Information</h2>
            </div>
          </div>

          <div className="event-information-grid">

            <div>
              <span>Event Type</span>
              <strong>
                {typeLabels[event.event_type] || event.event_type}
              </strong>
            </div>

            <div>
              <span>Event Date</span>
              <strong>{formatDate(event.event_date)}</strong>
            </div>

            <div>
              <span>Start Time</span>
              <strong>{event.start_time}</strong>
            </div>

            <div>
              <span>End Time</span>
              <strong>{event.end_time}</strong>
            </div>

            <div>
              <span>Venue</span>
              <strong>{event.venue}</strong>
            </div>

            <div>
              <span>Expected Guests</span>
              <strong>{event.expected_guests}</strong>
            </div>

          </div>

        </section>

        {/* AI */}
        <section className="ai-details-card">

          <div className="ai-symbol">✦</div>

          <div>
            <span>AI EVENT PLANNER</span>
            <h2>Plan smarter with AI</h2>

            <p>
              Generate checklists, vendors and schedules
              for this event.
            </p>

            <Link to="/dashboard/ai-planner">
              Open AI Planner →
            </Link>
          </div>

        </section>

      </div>

      {/* FUNCTIONS */}
      <section className="details-card full-details-card">

        <div className="details-card-header">
          <div>
            <span className="section-label">EVENT PLAN</span>
            <h2>Functions</h2>
          </div>
<Link
  to={`/dashboard/events/${event.id}/functions/add`}
  className="add-function-btn"
>
  + Add Function
</Link>
          
        </div>

        {functions.length === 0 ? (
          <div className="empty-detail">
            <span>✨</span>
            <h3>No functions added yet</h3>
            <p>
              Add Engagement, Wedding, Reception or other
              event functions.
            </p>
          </div>
        ) : (
          <div className="functions-list">

            {functions.map((item) => (
              <div className="function-row" key={item.id}>

                <div className="function-icon">
                  ✦
                </div>

                <div className="function-content">
                  <h3>{item.name}</h3>
                  <p>
                    📅 {formatDate(item.function_date)}
                  </p>
                </div>

                <div className="function-venue">
                  📍 {item.venue || "Venue not assigned"}
                </div>

              </div>
            ))}

          </div>
        )}

      </section>

      {/* TASKS */}
      <section className="details-card full-details-card">

        <div className="details-card-header">
          <div>
            <span className="section-label">WORKFLOW</span>
            <h2>Tasks</h2>
          </div>

          <Link to="/dashboard/tasks" className="view-all-link">
            View All →
          </Link>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-detail">
            <span>📋</span>
            <h3>No tasks yet</h3>
            <p>
              Create tasks or generate them using AI Checklist.
            </p>
          </div>
        ) : (
          <div className="tasks-list">

            {tasks.slice(0, 6).map((task) => (
              <div className="task-row" key={task.id}>

                <div
                  className={`task-check ${
                    task.status === "completed"
                      ? "checked"
                      : ""
                  }`}
                >
                  {task.status === "completed" ? "✓" : ""}
                </div>

                <div className="task-content">
                  <strong>{task.title}</strong>

                  {task.due_date && (
                    <span>
                      Due: {formatDate(task.due_date)}
                    </span>
                  )}
                </div>

                <span className={`task-status ${task.status}`}>
                  {task.status.replace("_", " ")}
                </span>

              </div>
            ))}

          </div>
        )}

      </section>

      {/* CREW */}
      <section className="details-card full-details-card">

        <div className="details-card-header">
          <div>
            <span className="section-label">TEAM</span>
            <h2>Crew</h2>
          </div>

          <Link to="/dashboard/crew" className="view-all-link">
            Manage Crew →
          </Link>
        </div>

        {crew.length === 0 ? (
          <div className="empty-detail">
            <span>👥</span>
            <h3>No crew assigned</h3>
            <p>
              Add photographers, coordinators, decorators
              and other event crew.
            </p>
          </div>
        ) : (
          <div className="crew-mini-grid">

            {crew.map((member) => (
              <div className="crew-mini-card" key={member.id}>

                <div className="crew-avatar">
                  {member.name?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default EventDetails;
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../../api/eventsApi";
import "./Events.css";

const eventTypeLabels = {
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

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEvents();

      setEvents(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Events loading error:", err);
      setError("Unable to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        event.event_name?.toLowerCase().includes(searchText) ||
        event.event_id?.toLowerCase().includes(searchText) ||
        event.venue?.toLowerCase().includes(searchText);

      const matchesType =
        typeFilter === "all" || event.event_type === typeFilter;

      const matchesStatus =
        statusFilter === "all" || event.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [events, search, typeFilter, statusFilter]);

  const totalEvents = events.length;

  const planningEvents = events.filter(
    (event) => event.status === "planning"
  ).length;

  const ongoingEvents = events.filter(
    (event) => event.status === "ongoing"
  ).length;

  const completedEvents = events.filter(
    (event) => event.status === "completed"
  ).length;

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatBudget = (budget) => {
    const amount = Number(budget || 0);

    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="events-page">

      {/* Header */}
      <div className="events-header">
        <div>
          <p className="page-kicker">EVENT MANAGEMENT</p>

          <h1>My Events</h1>

          <p>
            Manage your events, schedules, tasks, guests and vendors
            from one place.
          </p>
        </div>

        <Link to="/get-started" className="create-event-btn">
          + Create New Event
        </Link>
      </div>

      {/* Stats */}
      <div className="event-stats">

        <div className="event-stat-card">
          <div className="stat-icon blue">📅</div>

          <div>
            <span>Total Events</span>
            <strong>{totalEvents}</strong>
          </div>
        </div>

        <div className="event-stat-card">
          <div className="stat-icon purple">📝</div>

          <div>
            <span>Planning</span>
            <strong>{planningEvents}</strong>
          </div>
        </div>

        <div className="event-stat-card">
          <div className="stat-icon orange">⚡</div>

          <div>
            <span>Ongoing</span>
            <strong>{ongoingEvents}</strong>
          </div>
        </div>

        <div className="event-stat-card">
          <div className="stat-icon green">✓</div>

          <div>
            <span>Completed</span>
            <strong>{completedEvents}</strong>
          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="events-toolbar">

        <div className="event-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search events, venue or event ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Event Types</option>
          <option value="wedding">Wedding</option>
          <option value="engagement">Engagement</option>
          <option value="reception">Reception</option>
          <option value="birthday">Birthday</option>
          <option value="corporate">Corporate</option>
          <option value="conference">Conference</option>
          <option value="product_launch">Product Launch</option>
          <option value="baby_shower">Baby Shower</option>
          <option value="cultural">Cultural Event</option>
          <option value="private_party">Private Party</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="planning">Planning</option>
          <option value="confirmed">Confirmed</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

      </div>

      {/* Content */}
      {loading ? (
        <div className="events-state">
          <div className="loading-spinner"></div>
          <h3>Loading Events...</h3>
          <p>Fetching your events from the database.</p>
        </div>
      ) : error ? (
        <div className="events-state error-state">
          <div className="state-icon">⚠️</div>
          <h3>{error}</h3>
          <button onClick={loadEvents}>Try Again</button>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="events-state">
          <div className="state-icon">📅</div>

          <h3>No Events Found</h3>

          <p>
            Create your first event to start planning everything
            in one place.
          </p>

          <Link to="/get-started" className="empty-create-btn">
            Create Your First Event
          </Link>
        </div>
      ) : (
        <div className="events-grid">

          {filteredEvents.map((event) => (
            <div className="event-card" key={event.id}>

              <div className="event-card-top">

                <div className="event-type-icon">
                  {event.event_type === "wedding"
                    ? "💍"
                    : event.event_type === "birthday"
                    ? "🎂"
                    : event.event_type === "corporate"
                    ? "💼"
                    : "✨"}
                </div>

                <span
                  className={`event-status status-${event.status}`}
                >
                  {statusLabels[event.status] || event.status}
                </span>

              </div>

              <div className="event-card-body">

                <span className="event-id">
                  {event.event_id}
                </span>

                <h2>{event.event_name}</h2>

                <p className="event-type">
                  {eventTypeLabels[event.event_type] ||
                    event.event_type}
                </p>

                <div className="event-info">

                  <div>
                    <span>📅</span>
                    <p>{formatDate(event.event_date)}</p>
                  </div>

                  <div>
                    <span>📍</span>
                    <p>{event.venue}</p>
                  </div>

                  <div>
                    <span>👥</span>
                    <p>{event.expected_guests} Guests</p>
                  </div>

                  <div>
                    <span>₹</span>
                    <p>{formatBudget(event.budget)}</p>
                  </div>

                </div>

              </div>

              <div className="event-card-footer">

                <span>
                  Event ID: {event.event_id}
                </span>

                <Link to={`/dashboard/events/${event.id}`}>
                  View Details →
                </Link>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Events;
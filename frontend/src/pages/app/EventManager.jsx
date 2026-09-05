import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getEvents,
  deleteEvent,
} from "../../api/eventsApi";
import "./EventManager.css";

function EventManager() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEvents();

      const data = Array.isArray(response)
        ? response
        : response?.results || [];

      setEvents(data);
    } catch (err) {
      console.error("Failed to load events:", err);
      setError(
        err?.response?.data?.detail ||
          "Unable to load events. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEvent(id);
      setEvents((prev) =>
        prev.filter((event) => event.id !== id)
      );
    } catch (err) {
      console.error("Delete event error:", err);
      alert("Unable to delete event.");
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        event.event_name?.toLowerCase().includes(searchText) ||
        event.event_id?.toLowerCase().includes(searchText) ||
        event.venue?.toLowerCase().includes(searchText) ||
        event.city?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "all" ||
        event.status === statusFilter;

      const matchesType =
        typeFilter === "all" ||
        event.event_type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [events, search, statusFilter, typeFilter]);

  const totalEvents = events.length;

  const activeEvents = events.filter(
    (event) =>
      event.status === "planning" ||
      event.status === "confirmed" ||
      event.status === "ongoing"
  ).length;

  const planningEvents = events.filter(
    (event) => event.status === "planning"
  ).length;

  const completedEvents = events.filter(
    (event) => event.status === "completed"
  ).length;

  const formatEventType = (type) => {
    if (!type) return "Event";

    return type
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  const formatStatus = (status) => {
    if (!status) return "Planning";

    return status
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  const formatDate = (date) => {
    if (!date) return "Date not set";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="event-manager-page">

      {/* HEADER */}
      <div className="event-manager-header">
        <div>
          <span className="page-kicker">
            EVENT OPERATIONS
          </span>

          <h1>Event Manager</h1>

          <p>
            Manage, monitor and organize all your events
            from one place.
          </p>
        </div>

        <Link
          to="/dashboard/events/create"
          className="event-create-btn"
        >
          <span>＋</span>
          Create Event
        </Link>
      </div>

      {/* STATS */}
      <div className="manager-stats">

        <div className="manager-stat">
          <div className="manager-stat-icon purple">
            📅
          </div>

          <div>
            <strong>{totalEvents}</strong>
            <small>Total Events</small>
          </div>
        </div>

        <div className="manager-stat">
          <div className="manager-stat-icon blue">
            ✨
          </div>

          <div>
            <strong>{activeEvents}</strong>
            <small>Active Events</small>
          </div>
        </div>

        <div className="manager-stat">
          <div className="manager-stat-icon orange">
            ⏳
          </div>

          <div>
            <strong>{planningEvents}</strong>
            <small>Planning</small>
          </div>
        </div>

        <div className="manager-stat">
          <div className="manager-stat-icon green">
            ✓
          </div>

          <div>
            <strong>{completedEvents}</strong>
            <small>Completed</small>
          </div>
        </div>

      </div>

      {/* MAIN CARD */}
      <div className="event-manager-card">

        <div className="manager-card-top">

          <div>
            <h2>My Events</h2>

            <p>
              Track event progress, schedules,
              vendors and operations.
            </p>
          </div>

          <div className="manager-actions">

            <div className="event-search-wrapper">
              <span>⌕</span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search events..."
                className="event-search"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="event-filter"
            >
              <option value="all">
                All Status
              </option>
              <option value="planning">
                Planning
              </option>
              <option value="confirmed">
                Confirmed
              </option>
              <option value="ongoing">
                Ongoing
              </option>
              <option value="completed">
                Completed
              </option>
              <option value="cancelled">
                Cancelled
              </option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
              className="event-filter"
            >
              <option value="all">
                All Types
              </option>
              <option value="wedding">
                Wedding
              </option>
              <option value="engagement">
                Engagement
              </option>
              <option value="reception">
                Reception
              </option>
              <option value="birthday">
                Birthday
              </option>
              <option value="corporate">
                Corporate
              </option>
              <option value="conference">
                Conference
              </option>
            </select>

          </div>

        </div>

        {/* ERROR */}
        {error && (
          <div className="event-manager-error">
            <span>⚠</span>
            {error}

            <button onClick={loadEvents}>
              Retry
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="event-manager-loading">
            <div className="loading-spinner"></div>
            <p>Loading events...</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          !error &&
          filteredEvents.length === 0 && (
            <div className="event-empty">

              <div className="empty-icon">
                ✦
              </div>

              <h3>No events found</h3>

              <p>
                Create your first event to start
                planning beautiful moments.
              </p>

              <Link
                to="/dashboard/events/create"
                className="empty-create-btn"
              >
                Create Your First Event
              </Link>

            </div>
          )}

        {/* EVENTS */}
        {!loading &&
          !error &&
          filteredEvents.length > 0 && (
            <div className="event-manager-list">

              {filteredEvents.map((event) => (

                <div
                  className="manager-event-row"
                  key={event.id}
                >

                  {/* DATE */}
                  <div className="event-date-box">

                    <strong>
                      {event.event_date
                        ? new Date(
                            event.event_date
                          ).getDate()
                        : "--"}
                    </strong>

                    <span>
                      {event.event_date
                        ? new Date(
                            event.event_date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              month: "short",
                            }
                          )
                        : "DATE"}
                    </span>

                  </div>

                  {/* EVENT INFO */}
                  <div className="manager-event-info">

                    <div className="event-id">
                      {event.event_id ||
                        `EVENT-${event.id}`}
                    </div>

                    <h3>
                      {event.event_name ||
                        "Untitled Event"}
                    </h3>

                    <p>
                      {formatEventType(
                        event.event_type
                      )}

                      <span className="dot">
                        •
                      </span>

                      {event.venue ||
                        "Venue not set"}

                      {event.city && (
                        <>
                          <span className="dot">
                            •
                          </span>

                          {event.city}
                        </>
                      )}
                    </p>

                  </div>

                  {/* GUESTS */}
                  <div className="event-guests">

                    <strong>
                      {event.expected_guests || 0}
                    </strong>

                    <span>
                      Guests
                    </span>

                  </div>

                  {/* BUDGET */}
                  <div className="event-budget">

                    <strong>
                      ₹
                      {Number(
                        event.budget || 0
                      ).toLocaleString("en-IN")}
                    </strong>

                    <span>
                      Budget
                    </span>

                  </div>

                  {/* STATUS */}
                  <span
                    className={`event-status ${
                      event.status || "planning"
                    }`}
                  >
                    <span className="status-dot"></span>

                    {formatStatus(
                      event.status
                    )}
                  </span>

                  {/* ACTIONS */}
                  <div className="manager-event-actions">

                    <Link
                      to={`/dashboard/events/${event.id}`}
                      className="manager-view-btn"
                    >
                      View
                      <span>→</span>
                    </Link>

                    <button
                      type="button"
                      className="manager-delete-btn"
                      onClick={() =>
                        handleDelete(event.id)
                      }
                      title="Delete event"
                    >
                      🗑
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

      </div>

      {/* BOTTOM INFO */}
      <div className="manager-bottom-grid">

        <div className="manager-info-card ai-card">

          <div className="info-card-icon">
            ✧
          </div>

          <div>
            <span className="info-kicker">
              AI EVENT PLANNER
            </span>

            <h3>
              Plan your next event smarter
            </h3>

            <p>
              Let AI help you create checklists,
              schedules and vendor recommendations.
            </p>
          </div>

          <Link to="/dashboard/ai-planner">
            Open AI Planner →
          </Link>

        </div>

        <div className="manager-info-card">

          <div className="info-card-icon calendar">
            📆
          </div>

          <div>
            <span className="info-kicker">
              EVENT SCHEDULE
            </span>

            <h3>
              Keep every activity on track
            </h3>

            <p>
              Manage functions, activities,
              timings and assigned teams.
            </p>
          </div>

          <Link to="/dashboard/calendar">
            Open Calendar →
          </Link>

        </div>

      </div>

    </div>
  );
}

export default EventManager;
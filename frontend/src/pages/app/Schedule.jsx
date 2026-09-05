import { useState } from "react";
import { Link } from "react-router-dom";
import "./Schedule.css";

const initialSchedules = [
  {
    id: 1,
    time: "09:00 AM",
    end: "10:00 AM",
    activity: "Venue Preparation",
    event: "Arjun & Priya Wedding",
    function: "Wedding",
    venue: "Grand Palace, Chennai",
    team: "Event Crew",
    status: "Completed",
  },
  {
    id: 2,
    time: "10:30 AM",
    end: "12:00 PM",
    activity: "Photography Session",
    event: "Arjun & Priya Wedding",
    function: "Mehendi",
    venue: "Grand Palace, Chennai",
    team: "Photography Team",
    status: "In Progress",
  },
  {
    id: 3,
    time: "01:00 PM",
    end: "02:00 PM",
    activity: "Lunch & Catering Setup",
    event: "Arjun & Priya Wedding",
    function: "Wedding",
    venue: "Grand Palace, Chennai",
    team: "Catering Team",
    status: "Upcoming",
  },
  {
    id: 4,
    time: "04:00 PM",
    end: "05:30 PM",
    activity: "Guest Arrival",
    event: "Arjun & Priya Wedding",
    function: "Reception",
    venue: "Grand Palace, Chennai",
    team: "Coordination Team",
    status: "Upcoming",
  },
  {
    id: 5,
    time: "06:00 PM",
    end: "08:00 PM",
    activity: "Reception Ceremony",
    event: "Arjun & Priya Wedding",
    function: "Reception",
    venue: "Grand Palace, Chennai",
    team: "Full Event Team",
    status: "Upcoming",
  },
];

function Schedule() {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredSchedules = schedules.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.activity.toLowerCase().includes(searchText) ||
      item.event.toLowerCase().includes(searchText) ||
      item.function.toLowerCase().includes(searchText) ||
      item.team.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const completed = schedules.filter(
    (item) => item.status === "Completed"
  ).length;

  const inProgress = schedules.filter(
    (item) => item.status === "In Progress"
  ).length;

  const upcoming = schedules.filter(
    (item) => item.status === "Upcoming"
  ).length;

  const markCompleted = (id) => {
    setSchedules((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Completed" }
          : item
      )
    );
  };

  return (
    <div className="schedule-page">

      {/* HEADER */}
      <div className="schedule-header">
        <div>
          <div className="schedule-breadcrumb">
            Dashboard <span>›</span> Event Schedule
          </div>

          <h1>Event Schedule</h1>

          <p>
            Plan and manage every activity, function and event timeline.
          </p>
        </div>

        <Link
          to="/dashboard/calendar/add"
          className="schedule-add-btn"
        >
          <span>+</span>
          Add Schedule
        </Link>
      </div>

      {/* STATS */}
      <div className="schedule-stats">

        <div className="schedule-stat">
          <div className="schedule-stat-icon total-icon">📅</div>
          <div>
            <span>Total Activities</span>
            <strong>{schedules.length}</strong>
          </div>
        </div>

        <div className="schedule-stat">
          <div className="schedule-stat-icon complete-icon">✓</div>
          <div>
            <span>Completed</span>
            <strong>{completed}</strong>
          </div>
        </div>

        <div className="schedule-stat">
          <div className="schedule-stat-icon progress-icon">◷</div>
          <div>
            <span>In Progress</span>
            <strong>{inProgress}</strong>
          </div>
        </div>

        <div className="schedule-stat">
          <div className="schedule-stat-icon upcoming-icon">→</div>
          <div>
            <span>Upcoming</span>
            <strong>{upcoming}</strong>
          </div>
        </div>

      </div>

      {/* TOOLBAR */}
      <div className="schedule-card">

        <div className="schedule-toolbar">

          <div>
            <h2>Today's Timeline</h2>
            <p>Arjun & Priya Wedding</p>
          </div>

          <div className="schedule-filters">

            <div className="schedule-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search schedule..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Delayed">Delayed</option>
            </select>

          </div>

        </div>

        {/* TIMELINE */}
        <div className="schedule-timeline">

          {filteredSchedules.map((item, index) => (

            <div className="timeline-item" key={item.id}>

              <div className="timeline-time">
                <strong>{item.time}</strong>
                <span>{item.end}</span>
              </div>

              <div className="timeline-line">

                <div
                  className={`timeline-dot ${
                    item.status
                      .toLowerCase()
                      .replace(" ", "-")
                  }`}
                ></div>

                {index !== filteredSchedules.length - 1 && (
                  <div className="timeline-connector"></div>
                )}

              </div>

              <div className="timeline-content">

                <div className="timeline-main">

                  <div>
                    <h3>{item.activity}</h3>

                    <div className="schedule-meta">
                      <span>📍 {item.venue}</span>
                      <span>👥 {item.team}</span>
                    </div>
                  </div>

                  <span
                    className={`schedule-status ${
                      item.status
                        .toLowerCase()
                        .replace(" ", "-")
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

                <div className="timeline-bottom">

                  <span className="function-badge">
                    {item.function}
                  </span>

                  <span className="event-label">
                    {item.event}
                  </span>

                  {item.status === "In Progress" && (
                    <button
                      className="complete-btn"
                      onClick={() =>
                        markCompleted(item.id)
                      }
                    >
                      Mark Completed
                    </button>
                  )}

                </div>

              </div>

            </div>

          ))}

          {filteredSchedules.length === 0 && (
            <div className="schedule-empty">
              <div>📅</div>
              <h3>No schedules found</h3>
              <p>Try changing your search or filter.</p>
            </div>
          )}

        </div>

        <div className="schedule-footer">
          Showing{" "}
          <strong>{filteredSchedules.length}</strong>{" "}
          of{" "}
          <strong>{schedules.length}</strong>{" "}
          activities
        </div>

      </div>

    </div>
  );
}

export default Schedule;
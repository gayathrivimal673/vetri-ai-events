import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventDay.css";

const initialCrew = [
  { id: 1, name: "Arun Kumar", role: "Event Coordinator", status: "On Site" },
  { id: 2, name: "Karthik", role: "Photography", status: "On Site" },
  { id: 3, name: "Priya", role: "Makeup Team", status: "On Site" },
  { id: 4, name: "Vijay", role: "Decoration", status: "On Site" },
  { id: 5, name: "Rahul", role: "Catering", status: "Expected" },
  { id: 6, name: "Sanjay", role: "Videography", status: "Expected" },
];

const schedule = [
  {
    time: "06:00 AM",
    title: "Venue Preparation",
    type: "Setup",
    status: "Completed",
  },
  {
    time: "08:00 AM",
    title: "Bride Makeup",
    type: "Mehendi",
    status: "Completed",
  },
  {
    time: "10:00 AM",
    title: "Photography Session",
    type: "Photography",
    status: "In Progress",
  },
  {
    time: "12:30 PM",
    title: "Lunch & Guest Arrival",
    type: "Guest",
    status: "Upcoming",
  },
  {
    time: "04:00 PM",
    title: "Wedding Ceremony",
    type: "Wedding",
    status: "Upcoming",
  },
  {
    time: "07:30 PM",
    title: "Reception",
    type: "Reception",
    status: "Upcoming",
  },
];

function EventDay() {
  const navigate = useNavigate();
  const [crew, setCrew] = useState(initialCrew);

  const checkedIn = crew.filter((person) => person.status === "On Site").length;

  const toggleCrew = (id) => {
    setCrew((current) =>
      current.map((person) =>
        person.id === id
          ? {
              ...person,
              status: person.status === "On Site" ? "Expected" : "On Site",
            }
          : person
      )
    );
  };

  return (
    <div className="event-day-page">
      <div className="event-day-header">
        <div>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            ← Dashboard
          </button>

          <div className="eyebrow">LIVE EVENT OPERATIONS</div>

          <h1>Arjun & Priya Wedding</h1>
          <p>
            <span>📅 18 September 2026</span>
            <span>📍 Chennai</span>
            <span>👥 500 Guests</span>
          </p>
        </div>

        <div className="live-status">
          <span className="live-dot"></span>
          LIVE
        </div>
      </div>

      <div className="event-day-stats">
        <div className="day-stat blue">
          <span className="stat-icon">⏱</span>
          <div>
            <small>EVENT STATUS</small>
            <strong>In Progress</strong>
          </div>
        </div>

        <div className="day-stat green">
          <span className="stat-icon">✓</span>
          <div>
            <small>CREW ON SITE</small>
            <strong>{checkedIn} / {crew.length}</strong>
          </div>
        </div>

        <div className="day-stat purple">
          <span className="stat-icon">👥</span>
          <div>
            <small>GUEST CHECK-IN</small>
            <strong>324 / 500</strong>
          </div>
        </div>

        <div className="day-stat orange">
          <span className="stat-icon">⚠</span>
          <div>
            <small>ACTIVE ALERTS</small>
            <strong>2 Issues</strong>
          </div>
        </div>
      </div>

      <div className="event-day-grid">
        <section className="day-card schedule-card">
          <div className="card-heading">
            <div>
              <span className="section-label">TODAY'S PLAN</span>
              <h2>Event Schedule</h2>
            </div>

            <button onClick={() => navigate("/dashboard/calendar")}>
              Full Schedule →
            </button>
          </div>

          <div className="schedule-list">
            {schedule.map((item, index) => (
              <div className="schedule-item" key={item.title}>
                <div className="schedule-time">{item.time}</div>

                <div className="timeline-line">
                  <span
                    className={`timeline-dot ${
                      item.status === "Completed"
                        ? "done"
                        : item.status === "In Progress"
                        ? "active"
                        : ""
                    }`}
                  ></span>

                  {index !== schedule.length - 1 && <i></i>}
                </div>

                <div className="schedule-content">
                  <div>
                    <h3>{item.title}</h3>
                    <span>{item.type}</span>
                  </div>

                  <strong
                    className={`schedule-status ${item.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {item.status}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="day-card alert-card">
          <div className="card-heading">
            <div>
              <span className="section-label">ATTENTION</span>
              <h2>Live Alerts</h2>
            </div>

            <span className="alert-count">2</span>
          </div>

          <div className="alert-item warning">
            <div className="alert-icon">!</div>
            <div>
              <h3>Photography team delayed</h3>
              <p>Expected arrival delayed by 15 minutes.</p>
              <small>8 minutes ago</small>
            </div>
          </div>

          <div className="alert-item danger">
            <div className="alert-icon">!</div>
            <div>
              <h3>Catering delivery pending</h3>
              <p>Lunch setup confirmation is still pending.</p>
              <small>12 minutes ago</small>
            </div>
          </div>

          <button
            className="alert-action"
            onClick={() => alert("Alert management opened")}
          >
            Manage Alerts
          </button>
        </section>
      </div>

      <div className="event-day-grid bottom-grid">
        <section className="day-card crew-card">
          <div className="card-heading">
            <div>
              <span className="section-label">TEAM OPERATIONS</span>
              <h2>Crew Check-in</h2>
            </div>

            <button onClick={() => alert("Crew management opened")}>
              + Add Crew
            </button>
          </div>

          <div className="crew-progress">
            <div>
              <strong>{checkedIn}</strong>
              <span> of {crew.length} crew members checked in</span>
            </div>

            <div className="progress-track">
              <span
                style={{
                  width: `${(checkedIn / crew.length) * 100}%`,
                }}
              ></span>
            </div>
          </div>

          <div className="crew-list">
            {crew.map((person) => (
              <div className="crew-row" key={person.id}>
                <div className="crew-avatar">
                  {person.name.charAt(0)}
                </div>

                <div className="crew-info">
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                </div>

                <button
                  className={`checkin-btn ${
                    person.status === "On Site" ? "checked" : ""
                  }`}
                  onClick={() => toggleCrew(person.id)}
                >
                  {person.status === "On Site" ? "✓ On Site" : "Check In"}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="day-card guest-card">
          <div className="card-heading">
            <div>
              <span className="section-label">GUEST OPERATIONS</span>
              <h2>Guest Check-in</h2>
            </div>

            <button onClick={() => navigate("/dashboard/guests")}>
              Manage Guests →
            </button>
          </div>

          <div className="guest-ring">
            <div className="ring-inner">
              <strong>324</strong>
              <span>Checked In</span>
            </div>
          </div>

          <div className="guest-summary">
            <div>
              <span className="summary-dot confirmed"></span>
              <strong>324</strong>
              <small>Checked In</small>
            </div>

            <div>
              <span className="summary-dot pending"></span>
              <strong>126</strong>
              <small>Expected</small>
            </div>

            <div>
              <span className="summary-dot declined"></span>
              <strong>50</strong>
              <small>Declined</small>
            </div>
          </div>

          <button
            className="scan-btn"
            onClick={() => alert("QR Check-in scanner opened")}
          >
            ▣ Scan Guest QR
          </button>
        </section>
      </div>

      <section className="day-card quick-actions-card">
        <div>
          <span className="section-label">QUICK ACTIONS</span>
          <h2>Event Day Controls</h2>
        </div>

        <div className="quick-actions">
          <button onClick={() => alert("Delay management opened")}>
            <span>⏰</span>
            Report Delay
          </button>

          <button onClick={() => alert("Vendor replacement opened")}>
            <span>↻</span>
            Replace Vendor
          </button>

          <button onClick={() => alert("WhatsApp notification sent")}>
            <span>◈</span>
            Send WhatsApp
          </button>

          <button onClick={() => navigate("/dashboard/documents")}>
            <span>▣</span>
            Event Documents
          </button>
        </div>
      </section>
    </div>
  );
}

export default EventDay;
import { useState } from "react";
import "./Calendar.css";
import { useNavigate } from "react-router-dom";
const events = [
  {
    id: 1,
    title: "Arjun & Priya Wedding",
    type: "Wedding",
    date: "2026-09-18",
    time: "09:00 AM",
    venue: "Grand Palace, Chennai",
    color: "blue",
  },
  {
    id: 2,
    title: "Vimal Reception",
    type: "Reception",
    date: "2026-09-25",
    time: "06:30 PM",
    venue: "Royal Hall, Salem",
    color: "purple",
  },
  {
    id: 3,
    title: "Vetri Annual Meet",
    type: "Corporate",
    date: "2026-10-02",
    time: "10:00 AM",
    venue: "Convention Centre, Coimbatore",
    color: "orange",
  },
  {
    id: 4,
    title: "Mehendi Celebration",
    type: "Engagement",
    date: "2026-10-10",
    time: "04:00 PM",
    venue: "Green Garden, Madurai",
    color: "pink",
  },
];

const schedule = [
  {
    time: "09:00 AM",
    title: "Bride Makeup",
    category: "Makeup",
    event: "Arjun & Priya Wedding",
  },
  {
    time: "10:30 AM",
    title: "Photography Session",
    category: "Photography",
    event: "Arjun & Priya Wedding",
  },
  {
    time: "12:00 PM",
    title: "Wedding Ceremony",
    category: "Ceremony",
    event: "Arjun & Priya Wedding",
  },
  {
    time: "01:30 PM",
    title: "Lunch",
    category: "Catering",
    event: "Arjun & Priya Wedding",
  },
  {
    time: "04:00 PM",
    title: "Reception Preparation",
    category: "Decoration",
    event: "Arjun & Priya Wedding",
  },
  {
    time: "06:30 PM",
    title: "Reception",
    category: "Event",
    event: "Arjun & Priya Wedding",
  },
];

function Calendar() {
  const [selectedDate, setSelectedDate] = useState("2026-09-18");
  const [view, setView] = useState("month");

  const selectedEvents = events.filter(
    (event) => event.date === selectedDate
  );
const navigate = useNavigate();
  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <div>
          <span className="calendar-eyebrow">EVENT MANAGEMENT</span>
          <h1>Event Calendar</h1>
          <p>
            Manage events, schedules, functions and important activities
            from one place.
          </p>
        </div>

        <button
  className="add-event-btn"
  onClick={() => navigate("/dashboard/calendar/add")}
>
  + Add Schedule
</button>
      </div>

      <div className="calendar-toolbar">
        <div className="month-navigation">
          <button>‹</button>
          <strong>September 2026</strong>
          <button>›</button>
        </div>

        <div className="view-switcher">
          <button
            className={view === "month" ? "active" : ""}
            onClick={() => setView("month")}
          >
            Month
          </button>

          <button
            className={view === "week" ? "active" : ""}
            onClick={() => setView("week")}
          >
            Week
          </button>

          <button
            className={view === "day" ? "active" : ""}
            onClick={() => setView("day")}
          >
            Day
          </button>
        </div>
      </div>

      <div className="calendar-layout">
        <section className="calendar-card">
          <div className="week-days">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="calendar-grid">
            {[30, 31].map((day) => (
              <div className="calendar-day muted-day" key={`prev-${day}`}>
                {day}
              </div>
            ))}

            {Array.from({ length: 30 }, (_, index) => {
              const day = index + 1;
              const date = `2026-09-${String(day).padStart(2, "0")}`;
              const dayEvents = events.filter(
                (event) => event.date === date
              );

              return (
                <button
                  className={`calendar-day ${
                    selectedDate === date ? "selected" : ""
                  }`}
                  key={date}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="day-number">{day}</span>

                  {dayEvents.map((event) => (
                    <span
                      className={`calendar-event ${event.color}`}
                      key={event.id}
                    >
                      {event.title}
                    </span>
                  ))}
                </button>
              );
            })}

            {[1, 2, 3, 4, 5, 6].map((day) => (
              <div className="calendar-day muted-day" key={`next-${day}`}>
                {day}
              </div>
            ))}
          </div>
        </section>

        <aside className="calendar-sidebar">
          <div className="selected-date-card">
            <span>SELECTED DATE</span>
            <h2>
              {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
                "en-IN",
                {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                }
              )}
            </h2>

            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => (
                <div className="selected-event" key={event.id}>
                  <div className={`event-dot ${event.color}`}></div>
                  <div>
                    <strong>{event.title}</strong>
                    <small>
                      {event.time} · {event.venue}
                    </small>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-events">No events scheduled.</p>
            )}
          </div>

          <div className="upcoming-card">
            <div className="section-title">
              <div>
                <span>UPCOMING</span>
                <h3>Event Schedule</h3>
              </div>
              <span className="count-badge">{schedule.length}</span>
            </div>

            <div className="schedule-list">
              {schedule.map((item, index) => (
                <div className="schedule-item" key={index}>
                  <div className="schedule-time">{item.time}</div>

                  <div className="schedule-line">
                    <span></span>
                  </div>

                  <div className="schedule-content">
                    <strong>{item.title}</strong>
                    <small>{item.category}</small>
                    <em>{item.event}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Calendar;
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      icon: "◈",
      value: "12",
      label: "Active Events",
      change: "+3 this month",
      className: "blue",
    },
    {
      icon: "✓",
      value: "28",
      label: "Pending Tasks",
      change: "8 due this week",
      className: "pink",
    },
    {
      icon: "✦",
      value: "36",
      label: "Total Vendors",
      change: "+6 new vendors",
      className: "purple",
    },
    {
      icon: "₹",
      value: "8L",
      label: "Total Budget",
      change: "72% allocated",
      className: "orange",
    },
  ];

  const events = [
    {
      type: "Wedding",
      title: "Arjun & Priya Wedding",
      date: "Sep 18, 2026",
      guests: "500 Guests",
      location: "Chennai",
      progress: 82,
      color: "event-blue",
    },
    {
      type: "Reception",
      title: "Vimal Reception",
      date: "Sep 25, 2026",
      guests: "350 Guests",
      location: "Salem",
      progress: 64,
      color: "event-pink",
    },
    {
      type: "Corporate",
      title: "Vetri Annual Meet",
      date: "Oct 02, 2026",
      guests: "220 Guests",
      location: "Coimbatore",
      progress: 48,
      color: "event-purple",
    },
  ];

  const activities = [
    {
      icon: "✓",
      title: "Photography vendor confirmed",
      text: "Arjun & Priya Wedding",
      time: "12 min ago",
    },
    {
      icon: "₹",
      title: "Payment received",
      text: "₹75,000 from client",
      time: "42 min ago",
    },
    {
      icon: "✦",
      title: "AI checklist generated",
      text: "Vetri Annual Meet",
      time: "1 hour ago",
    },
    {
      icon: "!",
      title: "Task deadline approaching",
      text: "Decoration final approval",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo">
          <div className="dashboard-logo-icon">V</div>
          <div>
            <strong>Vetri</strong>
            <span>EventOS</span>
          </div>
        </Link>

        <div className="sidebar-section">
          <p className="sidebar-label">MAIN MENU</p>

          <Link to="/dashboard" className="side-link active">
            <span>⌂</span>
            Overview
          </Link>

          <Link to="/dashboard/events" className="side-link">
            <span>◈</span>
            Events
            <small>12</small>
          </Link>

          <Link to="/dashboard/calendar" className="side-link">
            <span>▣</span>
            Calendar
          </Link>

          <Link to="/dashboard/tasks" className="side-link">
            <span>✓</span>
            Tasks
            <small className="pink-count">8</small>
          </Link>

          <Link to="/dashboard/vendors" className="side-link">
            <span>✦</span>
            Vendors
          </Link>

          <Link to="/dashboard/guests" className="side-link">
            <span>♧</span>
            Guests
          </Link>

          <Link to="/dashboard/budget" className="side-link">
            <span>₹</span>
            Budget & Payments
          </Link>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">MANAGEMENT</p>

          <Link to="/dashboard/documents" className="side-link">
            <span>▤</span>
            Documents
          </Link>

          <Link to="/dashboard/media" className="side-link">
            <span>▧</span>
            Media
          </Link>
<Link to="/dashboard/vendor-assignments" className="side-link">
  <span>🔗</span>
  <span>Vendor Assignments</span>
</Link>
          <Link to="/dashboard/event-day" className="side-link">
            <span>◉</span>
            Event Day
          </Link>
<Link to="/dashboard/crew">
  👥 Crew
</Link>
          <Link to="/dashboard/ai-planner
          " className="side-link ai-link">
            <span>✧</span>
            AI Assistant
            <b>AI</b>
          </Link>
        <Link to="/dashboard/ai-checklist" className="side-link">
  <span>✓</span>
  AI Checklist
</Link>
          <Link to="/dashboard/schedule">
  <span>📅</span>
  <span>Schedule</span>
</Link>

          <Link to="/dashboard/reports" className="side-link">
            <span>▥</span>
            Reports
          </Link>
        </div>

        <div className="sidebar-bottom">
          <Link to="/dashboard/settings" className="side-link">
            <span>⚙</span>
            Settings
          </Link>

          <Link to="/dashboard/event-manager" className="profile-mini">
            <div className="profile-avatar">GV</div>
            <div>
              <strong>Gayathri</strong>
              <span>Event Manager</span>
            </div>
            <span className="profile-arrow">›</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="welcome-small">WELCOME BACK ✦</p>
            <h1>Good morning, Gayathri!</h1>
            <p className="header-subtitle">
              Here's what's happening with your events today.
            </p>
          </div>

          <div className="header-actions">
            <button className="notification-btn">
              ♧
              <span></span>
            </button>

            <Link to="/get-started" className="create-event-btn">
              <span>+</span>
              Create Event
            </Link>
          </div>
        </header>

        {/* AI Banner */}
        <section className="ai-banner">
          <div className="ai-glow"></div>

          <div className="ai-banner-icon">✦</div>

          <div className="ai-banner-content">
            <span>VETRI AI PLANNER</span>
            <h2>Let AI help you plan your next event.</h2>
            <p>
              Generate smart checklists, budgets, timelines and vendor
              recommendations in seconds.
            </p>
          </div>

          <Link to="/dashboard/ai-assistant" className="ai-banner-btn">
            Try AI Planner →
          </Link>
        </section>

        {/* Stats */}
        <section className="stats-grid">
          {stats.map((stat) => (
            <div className={`stat-card ${stat.className}`} key={stat.label}>
              <div className="stat-top">
                <div className="stat-icon">{stat.icon}</div>
                <span className="stat-menu">•••</span>
              </div>

              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
              <span className="stat-change">{stat.change}</span>
            </div>
          ))}
        </section>

        {/* Main Grid */}
        <section className="dashboard-content-grid">
          {/* Upcoming Events */}
          <div className="dashboard-card events-card">
            <div className="card-heading">
              <div>
                <span className="card-kicker">YOUR CALENDAR</span>
                <h2>Upcoming Events</h2>
              </div>

              <Link to="/dashboard/events">View all →</Link>
            </div>

            <div className="event-list">
              {events.map((event) => (
                <div className="dashboard-event" key={event.title}>
                  <div className={`event-date ${event.color}`}>
                    <span>{event.date.split(" ")[0]}</span>
                    <strong>{event.date.split(" ")[1].replace(",", "")}</strong>
                  </div>

                  <div className="event-info">
                    <span className="event-type">{event.type}</span>
                    <h3>{event.title}</h3>

                    <div className="event-meta">
                      <span>◉ {event.location}</span>
                      <span>♧ {event.guests}</span>
                    </div>
                  </div>

                  <div className="event-progress">
                    <div className="progress-top">
                      <span>Planning</span>
                      <strong>{event.progress}%</strong>
                    </div>

                    <div className="progress-bar">
                      <span style={{ width: `${event.progress}%` }}></span>
                    </div>
                  </div>

                  <button className="event-arrow">→</button>
                </div>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="dashboard-card budget-card">
            <div className="card-heading">
              <div>
                <span className="card-kicker">FINANCIAL OVERVIEW</span>
                <h2>Budget Overview</h2>
              </div>

              <Link to="/dashboard/budget">Details →</Link>
            </div>

            <div className="budget-circle">
              <div>
                <strong>72%</strong>
                <span>Allocated</span>
              </div>
            </div>

            <div className="budget-total">
              <span>Total Budget</span>
              <strong>₹10,00,000</strong>
            </div>

            <div className="budget-row">
              <div>
                <span className="dot blue-dot"></span>
                <span>Vendors</span>
              </div>
              <strong>₹4.2L</strong>
            </div>

            <div className="budget-row">
              <div>
                <span className="dot pink-dot"></span>
                <span>Venue & Decor</span>
              </div>
              <strong>₹2.1L</strong>
            </div>

            <div className="budget-row">
              <div>
                <span className="dot purple-dot"></span>
                <span>Other</span>
              </div>
              <strong>₹90K</strong>
            </div>
          </div>
        </section>

        {/* Bottom Grid */}
        <section className="bottom-grid">
          {/* Task Progress */}
          <div className="dashboard-card task-card">
            <div className="card-heading">
              <div>
                <span className="card-kicker">WORKFLOW</span>
                <h2>Task Progress</h2>
              </div>

              <Link to="/dashboard/tasks">Manage →</Link>
            </div>

            <div className="task-progress-layout">
              <div className="large-progress">
                <svg viewBox="0 0 120 120">
                  <circle
                    className="progress-bg"
                    cx="60"
                    cy="60"
                    r="48"
                  />
                  <circle
                    className="progress-value"
                    cx="60"
                    cy="60"
                    r="48"
                  />
                </svg>

                <div className="circle-text">
                  <strong>68%</strong>
                  <span>Complete</span>
                </div>
              </div>

              <div className="task-stats">
                <div>
                  <span className="task-dot completed"></span>
                  <p>Completed</p>
                  <strong>42</strong>
                </div>

                <div>
                  <span className="task-dot progress"></span>
                  <p>In Progress</p>
                  <strong>18</strong>
                </div>

                <div>
                  <span className="task-dot pending"></span>
                  <p>Pending</p>
                  <strong>28</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card activity-card">
            <div className="card-heading">
              <div>
                <span className="card-kicker">LATEST UPDATES</span>
                <h2>Recent Activity</h2>
              </div>

              <button className="dots-btn">•••</button>
            </div>

            <div className="activity-list">
              {activities.map((activity) => (
                <div className="activity-item" key={activity.title}>
                  <div className="activity-icon">{activity.icon}</div>

                  <div className="activity-content">
                    <strong>{activity.title}</strong>
                    <span>{activity.text}</span>
                  </div>

                  <small>{activity.time}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="dashboard-footer">
          <span>© 2026 Vetri EventOS</span>
          <span>Plan Beautiful Moments. Create Unforgettable Events. ✦</span>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
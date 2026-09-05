import "./Reports.css";

const reports = [
  {
    title: "Event Performance",
    desc: "Overall progress and completion of your events.",
    value: "82%",
    icon: "📊",
  },
  {
    title: "Budget Report",
    desc: "Track planned budget, spending and balance.",
    value: "₹8.6L",
    icon: "💰",
  },
  {
    title: "Guest Report",
    desc: "RSVP and guest attendance summary.",
    value: "486",
    icon: "👥",
  },
  {
    title: "Vendor Report",
    desc: "Vendor assignments and payment status.",
    value: "36",
    icon: "🤝",
  },
];

function Reports() {
  return (
    <div className="reports-page">

      <div className="reports-header">
        <div>
          <span>ANALYTICS & INSIGHTS</span>
          <h1>Reports</h1>
          <p>Monitor your event performance, budget and operations.</p>
        </div>

        <button onClick={() => alert("Report generated successfully!")}>
          ↓ Generate Report
        </button>
      </div>

      <div className="reports-summary">
        <div>
          <span>Total Events</span>
          <strong>12</strong>
          <small>+3 this month</small>
        </div>

        <div>
          <span>Completed Events</span>
          <strong>16</strong>
          <small>92% success rate</small>
        </div>

        <div>
          <span>Total Budget</span>
          <strong>₹28.5L</strong>
          <small>₹8.6L spent</small>
        </div>

        <div>
          <span>Guest Attendance</span>
          <strong>91%</strong>
          <small>Across active events</small>
        </div>
      </div>

      <h2 className="section-title">Report Overview</h2>

      <div className="reports-grid">
        {reports.map((report, index) => (
          <div className="report-card" key={index}>
            <div className="report-icon">{report.icon}</div>

            <div className="report-card-top">
              <div>
                <h3>{report.title}</h3>
                <p>{report.desc}</p>
              </div>

              <strong>{report.value}</strong>
            </div>

            <button
              onClick={() => alert(`${report.title} opened`)}
              className="view-report"
            >
              View Report →
            </button>
          </div>
        ))}
      </div>

      <div className="report-bottom">

        <div className="performance-card">
          <div className="card-heading">
            <div>
              <h2>Event Progress</h2>
              <p>Current active event completion</p>
            </div>
            <strong>82%</strong>
          </div>

          <div className="large-progress">
            <div style={{ width: "82%" }}></div>
          </div>

          <div className="progress-details">
            <span>Tasks Completed <b>68</b></span>
            <span>Tasks Pending <b>18</b></span>
            <span>Tasks Blocked <b>4</b></span>
          </div>
        </div>

        <div className="activity-card">
          <h2>Recent Activity</h2>

          <div className="activity-item">
            <span>✓</span>
            <div>
              <strong>Vendor confirmed</strong>
              <p>Photography vendor confirmed assignment</p>
            </div>
          </div>

          <div className="activity-item">
            <span>₹</span>
            <div>
              <strong>Payment received</strong>
              <p>₹75,000 payment recorded</p>
            </div>
          </div>

          <div className="activity-item">
            <span>👥</span>
            <div>
              <strong>Guest RSVP updated</strong>
              <p>42 guests confirmed attendance</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Reports;
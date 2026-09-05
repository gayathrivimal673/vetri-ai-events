import { useState } from "react";
import "./AIChecklist.css";

const checklistData = {
  Planning: [
    "Finalize event date and time",
    "Confirm event requirements",
    "Assign event coordinator",
    "Create event timeline",
  ],
  "Venue & Setup": [
    "Confirm venue booking",
    "Plan seating arrangement",
    "Arrange stage and lighting",
    "Check power and backup",
  ],
  Catering: [
    "Finalize menu",
    "Confirm caterer",
    "Arrange food counters",
    "Confirm guest meal count",
  ],
  "Photography & Videography": [
    "Confirm photographer",
    "Confirm videographer",
    "Plan photography schedule",
    "Arrange required equipment",
  ],
  "Guests & Invitations": [
    "Prepare guest list",
    "Send invitations",
    "Track RSVP responses",
    "Confirm final guest count",
  ],
  Logistics: [
    "Arrange transportation",
    "Confirm vendor arrival times",
    "Prepare emergency contacts",
    "Arrange backup plans",
  ],
  "Final Week": [
    "Confirm all vendors",
    "Review event schedule",
    "Confirm payments",
    "Share final instructions",
  ],
  "Event Day": [
    "Crew check-in",
    "Vendor arrival check",
    "Guest check-in",
    "Monitor event schedule",
  ],
};

function AIChecklist() {
  const [generated, setGenerated] = useState(false);
  const [checked, setChecked] = useState({});

  const toggleTask = (task) => {
    setChecked((prev) => ({
      ...prev,
      [task]: !prev[task],
    }));
  };

  const allTasks = Object.values(checklistData).flat();
  const completed = allTasks.filter((task) => checked[task]).length;
  const progress = generated
    ? Math.round((completed / allTasks.length) * 100)
    : 0;

  return (
    <div className="ai-checklist-page">
      <div className="checklist-header">
        <div>
          <span className="eyebrow">VETRI AI</span>
          <h1>AI Event Checklist</h1>
          <p>
            Generate a smart checklist based on your event requirements.
          </p>
        </div>

        <div className="ai-star">✦</div>
      </div>

      <div className="checklist-form">
        <div className="form-group">
          <label>Event Type</label>
          <select>
            <option>Wedding</option>
            <option>Engagement</option>
            <option>Reception</option>
            <option>Birthday</option>
            <option>Corporate Event</option>
          </select>
        </div>

        <div className="form-group">
          <label>Expected Guests</label>
          <input type="number" defaultValue="500" />
        </div>

        <div className="form-group">
          <label>Number of Functions</label>
          <input type="number" defaultValue="4" />
        </div>

        <div className="form-group">
          <label>Venue</label>
          <input type="text" defaultValue="Chennai" />
        </div>

        <div className="form-group">
          <label>Total Budget</label>
          <input type="number" defaultValue="1000000" />
        </div>

        <div className="form-group">
          <label>Event Duration</label>
          <select>
            <option>1 Day</option>
            <option>2 Days</option>
            <option>3 Days</option>
          </select>
        </div>

        <button
          className="generate-checklist-btn"
          onClick={() => setGenerated(true)}
        >
          ✦ Generate AI Checklist →
        </button>
      </div>

      {generated && (
        <div className="checklist-result">
          <div className="progress-card">
            <div>
              <span>AI CHECKLIST</span>
              <h2>Your Event Action Plan</h2>
            </div>

            <div className="progress-circle">
              {progress}%
            </div>
          </div>

          {Object.entries(checklistData).map(([section, tasks]) => (
            <div className="checklist-section" key={section}>
              <div className="section-title">
                <h3>{section}</h3>
                <span>
                  {tasks.filter((task) => checked[task]).length}/{tasks.length}
                </span>
              </div>

              {tasks.map((task) => (
                <label className="checklist-task" key={task}>
                  <input
                    type="checkbox"
                    checked={!!checked[task]}
                    onChange={() => toggleTask(task)}
                  />
                  <span>{task}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIChecklist;
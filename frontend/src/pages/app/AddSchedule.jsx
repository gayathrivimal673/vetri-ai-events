import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddSchedule.css";

function AddSchedule() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    event: "Arjun & Priya Wedding",
    functionName: "Wedding",
    activity: "",
    date: "2026-09-18",
    startTime: "",
    endTime: "",
    venue: "",
    assignedTeam: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.activity || !form.startTime || !form.endTime) {
      alert("Please fill Activity, Start Time and End Time.");
      return;
    }

    alert("Schedule added successfully!");
    navigate("/dashboard/calendar");
  };

  return (
    <div className="add-schedule-page">
      <div className="schedule-top">
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard/calendar")}
        >
          ← Back to Calendar
        </button>

        <div>
          <span className="schedule-eyebrow">EVENT OPERATIONS</span>
          <h1>Add Schedule</h1>
          <p>Create a new activity for your event timeline.</p>
        </div>
      </div>

      <div className="schedule-form-card">
        <div className="form-heading">
          <div className="form-icon">📅</div>
          <div>
            <h2>Schedule Details</h2>
            <p>Add timing and team information for this activity.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Event</label>
              <select
                name="event"
                value={form.event}
                onChange={handleChange}
              >
                <option>Arjun & Priya Wedding</option>
                <option>Vimal Reception</option>
                <option>Vetri Annual Meet</option>
                <option>Mehendi Celebration</option>
              </select>
            </div>

            <div className="form-group">
              <label>Function</label>
              <select
                name="functionName"
                value={form.functionName}
                onChange={handleChange}
              >
                <option>Engagement</option>
                <option>Mehendi</option>
                <option>Wedding</option>
                <option>Reception</option>
                <option>Corporate</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Activity / Schedule Name *</label>
              <input
                type="text"
                name="activity"
                value={form.activity}
                onChange={handleChange}
                placeholder="e.g. Bride Makeup"
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                value={form.venue}
                onChange={handleChange}
                placeholder="e.g. Grand Palace"
              />
            </div>

            <div className="form-group">
              <label>Start Time *</label>
              <input
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>End Time *</label>
              <input
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Assigned Team / Person</label>
              <input
                type="text"
                name="assignedTeam"
                value={form.assignedTeam}
                onChange={handleChange}
                placeholder="e.g. Photography Team"
              />
            </div>

            <div className="form-group full-width">
              <label>Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Add any special instructions..."
                rows="5"
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/dashboard/calendar")}
            >
              Cancel
            </button>

            <button type="submit" className="save-schedule-btn">
              ✓ Save Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSchedule;
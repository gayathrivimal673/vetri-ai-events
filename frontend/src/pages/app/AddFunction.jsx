import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createFunction } from "../../api/eventsApi";
import "./AddFunction.css";

function AddFunction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    function_date: "",
    venue: "",
    start_time: "",
    end_time: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter function name");
      return;
    }

    if (!formData.function_date) {
      alert("Please select function date");
      return;
    }

    if (!formData.start_time || !formData.end_time) {
      alert("Please select start and end time");
      return;
    }

    try {
      setLoading(true);

      await createFunction({
        event: Number(id),
        name: formData.name.trim(),
        function_date: formData.function_date,
        venue: formData.venue.trim(),
        start_time: formData.start_time,
        end_time: formData.end_time,
        notes: formData.notes.trim(),
      });

      alert("🎉 Function added successfully!");

      navigate(`/dashboard/events/${id}`);
    } catch (error) {
      console.error("Function creation error:", error);
      console.error("Response:", error.response?.data);

      alert(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Unable to add function"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-function-page">

      <div className="function-top">
        <div>
          <span className="function-kicker">EVENT OPERATIONS</span>
          <h1>Add Event Function</h1>
          <p>Create a function and add it to this event timeline.</p>
        </div>

        <Link
          to={`/dashboard/events/${id}`}
          className="back-function-btn"
        >
          ← Back to Event
        </Link>
      </div>

      <div className="function-form-card">

        <div className="form-card-header">
          <div className="function-icon">✦</div>

          <div>
            <h2>Function Details</h2>
            <p>
              Add ceremony, reception, engagement or any other event function.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="function-grid">

            <div className="form-group full">
              <label>Function Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Example: Wedding Ceremony"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Function Date *</label>
              <input
                type="date"
                name="function_date"
                value={formData.function_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                placeholder="Example: Grand Palace Hall"
                value={formData.venue}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Start Time *</label>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>End Time *</label>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full">
              <label>Notes</label>
              <textarea
                name="notes"
                rows="5"
                placeholder="Add function requirements, decoration notes, special instructions..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="function-form-footer">

            <Link
              to={`/dashboard/events/${id}`}
              className="cancel-function"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="save-function"
              disabled={loading}
            >
              {loading ? "Saving..." : "✦ Save Function"}
            </button>

          </div>

        </form>
      </div>

    </div>
  );
}

export default AddFunction;
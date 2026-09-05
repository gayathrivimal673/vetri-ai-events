import { useEffect, useMemo, useState } from "react";
import {
  getVendorAssignments,
  createVendorAssignment,
  updateVendorAssignment,
  deleteVendorAssignment,
  getVendors,
  getEvents,
} from "../../api/eventsApi";
import "./VendorAssignments.css";
const emptyForm = {
  event: "",
  vendor: "",
  service_category: "",
  assigned_price: "",
  status: "pending",
  notes: "",
};

function VendorAssignment() {
  const [assignments, setAssignments] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [assignmentData, vendorData, eventData] = await Promise.all([
        getVendorAssignments(),
        getVendors(),
        getEvents(),
      ]);

      setAssignments(
        Array.isArray(assignmentData)
          ? assignmentData
          : assignmentData?.results || []
      );

      setVendors(
        Array.isArray(vendorData)
          ? vendorData
          : vendorData?.results || []
      );

      setEvents(
        Array.isArray(eventData)
          ? eventData
          : eventData?.results || []
      );
    } catch (err) {
      console.error(err);
      setError("Unable to load vendor assignments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "vendor" && value) {
      const selectedVendor = vendors.find(
        (vendor) => String(vendor.id) === String(value)
      );

      if (selectedVendor) {
        setForm((prev) => ({
          ...prev,
          vendor: value,
          service_category: selectedVendor.category || "",
          assigned_price:
            prev.assigned_price || selectedVendor.pricing || "",
        }));
      }
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.event || !form.vendor) {
      alert("Please select Event and Vendor.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        event: Number(form.event),
        vendor: Number(form.vendor),
        service_category: form.service_category,
        assigned_price: Number(form.assigned_price || 0),
        status: form.status,
        notes: form.notes,
      };

      if (editingId) {
        await updateVendorAssignment(editingId, payload);
        alert("Vendor assignment updated successfully.");
      } else {
        await createVendorAssignment(payload);
        alert("Vendor assigned successfully.");
      }

      resetForm();
      await loadData();
    } catch (err) {
      console.error(err);
      console.error(err?.response?.data);

      const backendError = err?.response?.data;

      if (backendError) {
        setError(JSON.stringify(backendError));
      } else {
        setError("Unable to save vendor assignment.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (assignment) => {
    setEditingId(assignment.id);

    setForm({
      event: assignment.event || "",
      vendor: assignment.vendor || "",
      service_category: assignment.service_category || "",
      assigned_price: assignment.assigned_price || "",
      status: assignment.status || "pending",
      notes: assignment.notes || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor assignment?"
    );

    if (!confirmDelete) return;

    try {
      await deleteVendorAssignment(id);
      await loadData();
    } catch (err) {
      console.error(err);
      setError("Unable to delete assignment.");
    }
  };

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        String(item.event_name || "").toLowerCase().includes(searchText) ||
        String(item.vendor_name || "").toLowerCase().includes(searchText) ||
        String(item.service_category || "")
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [assignments, search, statusFilter]);

  const stats = {
    total: assignments.length,
    pending: assignments.filter((item) => item.status === "pending").length,
    confirmed: assignments.filter((item) => item.status === "confirmed")
      .length,
    completed: assignments.filter((item) => item.status === "completed")
      .length,
  };

  const getStatusClass = (status) => {
    return `assignment-status ${status || "pending"}`;
  };

  return (
    <div className="vendor-assignment-page">
      <div className="assignment-header">
        <div>
          <span className="assignment-eyebrow">VENDOR OPERATIONS</span>
          <h1>Vendor Assignments</h1>
          <p>
            Assign vendors to events, manage services, pricing and assignment
            status from one place.
          </p>
        </div>

        <div className="assignment-header-badge">
          <span>✦</span>
          EventOS Operations
        </div>
      </div>

      <div className="assignment-stats">
        <div className="assignment-stat-card">
          <div className="stat-icon purple">🔗</div>
          <div>
            <span>Total Assignments</span>
            <strong>{stats.total}</strong>
          </div>
        </div>

        <div className="assignment-stat-card">
          <div className="stat-icon orange">⏳</div>
          <div>
            <span>Pending</span>
            <strong>{stats.pending}</strong>
          </div>
        </div>

        <div className="assignment-stat-card">
          <div className="stat-icon blue">✓</div>
          <div>
            <span>Confirmed</span>
            <strong>{stats.confirmed}</strong>
          </div>
        </div>

        <div className="assignment-stat-card">
          <div className="stat-icon green">★</div>
          <div>
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>
        </div>
      </div>

      <div className="assignment-layout">
        <section className="assignment-form-card">
          <div className="section-heading">
            <div>
              <span>ASSIGNMENT</span>
              <h2>{editingId ? "Edit Assignment" : "Assign Vendor"}</h2>
            </div>

            {editingId && (
              <button
                type="button"
                className="cancel-edit-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Event *</label>

                <select
                  name="event"
                  value={form.event}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Event</option>

                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.event_name || event.event_id}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Vendor *</label>

                <select
                  name="vendor"
                  value={form.vendor}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Vendor</option>

                  {vendors.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Service Category</label>

                <input
                  type="text"
                  name="service_category"
                  value={form.service_category}
                  onChange={handleChange}
                  placeholder="Photography"
                />
              </div>

              <div className="form-group">
                <label>Assigned Price</label>

                <input
                  type="number"
                  name="assigned_price"
                  value={form.assigned_price}
                  onChange={handleChange}
                  placeholder="₹ 0"
                  min="0"
                />
              </div>

              <div className="form-group full-width">
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Notes</label>

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Add assignment notes..."
                  rows="4"
                />
              </div>
            </div>

            <button
              type="submit"
              className="assign-submit-btn"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Assignment"
                : "Assign Vendor"}
              <span>→</span>
            </button>
          </form>
        </section>

        <section className="assignment-list-card">
          <div className="list-heading">
            <div>
              <span>LIVE ASSIGNMENTS</span>
              <h2>Assigned Vendors</h2>
            </div>

            <button
              type="button"
              className="refresh-btn"
              onClick={loadData}
            >
              ↻ Refresh
            </button>
          </div>

          <div className="assignment-toolbar">
            <input
              type="text"
              placeholder="Search event, vendor or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {error && (
            <div className="assignment-error">
              <strong>Error:</strong> {error}
            </div>
          )}

          {loading ? (
            <div className="assignment-empty">
              <div>⏳</div>
              <h3>Loading assignments...</h3>
            </div>
          ) : filteredAssignments.length === 0 ? (
            <div className="assignment-empty">
              <div>🔗</div>
              <h3>No vendor assignments found</h3>
              <p>Assign a vendor to an event using the form.</p>
            </div>
          ) : (
            <div className="assignment-table-wrap">
              <table className="assignment-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Vendor</th>
                    <th>Service</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAssignments.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="event-cell">
                          <div className="event-mini-icon">E</div>
                          <strong>
                            {item.event_name || `Event #${item.event}`}
                          </strong>
                        </div>
                      </td>

                      <td>
                        <div className="vendor-cell">
                          <div className="vendor-avatar">
                            {(item.vendor_name || "V").charAt(0).toUpperCase()}
                          </div>

                          <span>
                            {item.vendor_name || `Vendor #${item.vendor}`}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="service-tag">
                          {item.service_category || "General"}
                        </span>
                      </td>

                      <td className="price-cell">
                        ₹
                        {Number(item.assigned_price || 0).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td>
                        <span className={getStatusClass(item.status)}>
                          {item.status || "pending"}
                        </span>
                      </td>

                      <td>
                        {item.assigned_date
                          ? new Date(
                              item.assigned_date
                            ).toLocaleDateString("en-IN")
                          : "-"}
                      </td>

                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="edit-action"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-action"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default VendorAssignment;
import { useEffect, useMemo, useState } from "react";
import {
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor,
} from "../../api/eventsApi";

import "./Vendors.css";

const CATEGORY_LABELS = {
  photography: "Photography",
  videography: "Videography",
  catering: "Catering",
  decoration: "Decoration",
  makeup: "Makeup",
  mehendi: "Mehendi",
  music: "Music",
  dj: "DJ",
  entertainment: "Entertainment",
  transportation: "Transportation",
  venue: "Venue",
  printing: "Printing",
  equipment: "Event Equipment",
};

const AVAILABILITY_LABELS = {
  available: "Available",
  booked: "Booked",
  confirmed: "Confirmed",
  unavailable: "Unavailable",
};

function Vendors() {
  const [vendors, setVendors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "photography",
    contact: "",
    email: "",
    location: "",
    services: "",
    pricing: "",
    availability: "available",
    rating: "",
  });

  // =========================
  // LOAD VENDORS
  // =========================

  const loadVendors = async () => {
    try {
      setLoading(true);

      const data = await getVendors();

      const vendorList = Array.isArray(data)
        ? data
        : data?.results || [];

      setVendors(vendorList);
    } catch (error) {
      console.error("Vendor loading error:", error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      } else {
        alert("Unable to load vendor data.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  // =========================
  // FILTER
  // =========================

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        vendor.name?.toLowerCase().includes(searchText) ||
        vendor.contact?.toLowerCase().includes(searchText) ||
        vendor.email?.toLowerCase().includes(searchText) ||
        vendor.location?.toLowerCase().includes(searchText) ||
        vendor.services?.toLowerCase().includes(searchText);

      const matchesCategory =
        categoryFilter === "all" ||
        vendor.category === categoryFilter;

      const matchesAvailability =
        availabilityFilter === "all" ||
        vendor.availability === availabilityFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    });
  }, [
    vendors,
    search,
    categoryFilter,
    availabilityFilter,
  ]);

  // =========================
  // STATS
  // =========================

  const totalVendors = vendors.length;

  const availableVendors = vendors.filter(
    (vendor) => vendor.availability === "available"
  ).length;

  const bookedVendors = vendors.filter(
    (vendor) =>
      vendor.availability === "booked" ||
      vendor.availability === "confirmed"
  ).length;

  const unavailableVendors = vendors.filter(
    (vendor) => vendor.availability === "unavailable"
  ).length;

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setFormData({
      name: "",
      category: "photography",
      contact: "",
      email: "",
      location: "",
      services: "",
      pricing: "",
      availability: "available",
      rating: "",
    });

    setEditingVendor(null);
  };

  // =========================
  // OPEN ADD FORM
  // =========================

  const handleAddVendor = () => {
    resetForm();
    setShowForm(true);
  };

  // =========================
  // EDIT VENDOR
  // =========================

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);

    setFormData({
      name: vendor.name || "",
      category: vendor.category || "photography",
      contact: vendor.contact || "",
      email: vendor.email || "",
      location: vendor.location || "",
      services: vendor.services || "",
      pricing: vendor.pricing || "",
      availability: vendor.availability || "available",
      rating: vendor.rating || "",
    });

    setShowForm(true);
  };

  // =========================
  // SAVE VENDOR
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter vendor name.");
      return;
    }

    if (!formData.contact.trim()) {
      alert("Please enter vendor contact.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: formData.name.trim(),
        category: formData.category,

        // IMPORTANT:
        // Backend expects "contact"
        contact: formData.contact.trim(),

        email: formData.email.trim(),
        location: formData.location.trim(),
        services: formData.services.trim(),

        pricing: Number(formData.pricing) || 0,

        availability: formData.availability,

        rating: Number(formData.rating) || 0,
      };

      if (editingVendor) {
        await updateVendor(editingVendor.id, payload);

        alert("Vendor updated successfully!");
      } else {
        await createVendor(payload);

        alert("Vendor added successfully!");
      }

      resetForm();
      setShowForm(false);

      await loadVendors();
    } catch (error) {
      console.error("Vendor save error:", error);

      const message = error.response?.data
        ? JSON.stringify(error.response.data)
        : "Unable to save vendor.";

      alert(message);
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // AVAILABILITY UPDATE
  // =========================

  const handleAvailabilityChange = async (
    vendor,
    newAvailability
  ) => {
    try {
      const payload = {
        name: vendor.name || "",
        category: vendor.category || "photography",
        contact: vendor.contact || "",
        email: vendor.email || "",
        location: vendor.location || "",
        services: vendor.services || "",
        pricing: Number(vendor.pricing) || 0,
        availability: newAvailability,
        rating: Number(vendor.rating) || 0,
      };

      await updateVendor(vendor.id, payload);

      setVendors((prev) =>
        prev.map((item) =>
          item.id === vendor.id
            ? {
                ...item,
                availability: newAvailability,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Vendor availability update error:",
        error
      );

      alert("Unable to update vendor availability.");
    }
  };

  // =========================
  // DELETE VENDOR
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vendor?"
    );

    if (!confirmed) return;

    try {
      await deleteVendor(id);

      setVendors((prev) =>
        prev.filter((vendor) => vendor.id !== id)
      );

      alert("Vendor deleted successfully!");
    } catch (error) {
      console.error("Vendor delete error:", error);

      alert("Unable to delete vendor.");
    }
  };

  return (
    <div className="vendors-page">

      {/* ================= HEADER ================= */}

      <div className="vendors-header">
        <div>
          <span className="vendors-kicker">
            PARTNER NETWORK
          </span>

          <h1>Vendor Management</h1>

          <p>
            Manage event vendors, services, pricing and
            availability from one place.
          </p>
        </div>

        <button
          className="vendor-add-btn"
          onClick={handleAddVendor}
        >
          <span>＋</span>
          Add Vendor
        </button>
      </div>

      {/* ================= STATS ================= */}

      <div className="vendor-stats">

        <div className="vendor-stat-card">
          <div className="vendor-stat-icon">
            🤝
          </div>

          <div>
            <span>Total Vendors</span>
            <strong>{totalVendors}</strong>
          </div>
        </div>

        <div className="vendor-stat-card">
          <div className="vendor-stat-icon">
            ✓
          </div>

          <div>
            <span>Available</span>
            <strong>{availableVendors}</strong>
          </div>
        </div>

        <div className="vendor-stat-card">
          <div className="vendor-stat-icon">
            📅
          </div>

          <div>
            <span>Booked</span>
            <strong>{bookedVendors}</strong>
          </div>
        </div>

        <div className="vendor-stat-card">
          <div className="vendor-stat-icon">
            ⚠
          </div>

          <div>
            <span>Unavailable</span>
            <strong>{unavailableVendors}</strong>
          </div>
        </div>

      </div>

      {/* ================= FORM ================= */}

      {showForm && (
        <div className="vendor-form-card">

          <div className="vendor-form-header">

            <div>
              <span className="vendors-kicker">
                {editingVendor
                  ? "UPDATE PARTNER"
                  : "NEW PARTNER"}
              </span>

              <h2>
                {editingVendor
                  ? "Edit Vendor"
                  : "Add Vendor"}
              </h2>
            </div>

            <button
              type="button"
              className="vendor-close-btn"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
            >
              ×
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="vendor-form-grid">

              {/* NAME */}

              <div className="vendor-field">
                <label>Vendor Name *</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter vendor name"
                  required
                />
              </div>

              {/* CATEGORY */}

              <div className="vendor-field">
                <label>Category *</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="photography">
                    Photography
                  </option>

                  <option value="videography">
                    Videography
                  </option>

                  <option value="catering">
                    Catering
                  </option>

                  <option value="decoration">
                    Decoration
                  </option>

                  <option value="makeup">
                    Makeup
                  </option>

                  <option value="mehendi">
                    Mehendi
                  </option>

                  <option value="music">
                    Music
                  </option>

                  <option value="dj">
                    DJ
                  </option>

                  <option value="entertainment">
                    Entertainment
                  </option>

                  <option value="transportation">
                    Transportation
                  </option>

                  <option value="venue">
                    Venue
                  </option>

                  <option value="printing">
                    Printing
                  </option>

                  <option value="equipment">
                    Event Equipment
                  </option>
                </select>
              </div>

              {/* CONTACT */}

              <div className="vendor-field">
                <label>Contact *</label>

                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              {/* EMAIL */}

              <div className="vendor-field">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="vendor@example.com"
                />
              </div>

              {/* LOCATION */}

              <div className="vendor-field">
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Chennai, Tamil Nadu"
                />
              </div>

              {/* PRICING */}

              <div className="vendor-field">
                <label>Pricing</label>

                <input
                  type="number"
                  name="pricing"
                  value={formData.pricing}
                  onChange={handleChange}
                  placeholder="60000"
                  min="0"
                />
              </div>

              {/* AVAILABILITY */}

              <div className="vendor-field">
                <label>Availability</label>

                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                >
                  <option value="available">
                    Available
                  </option>

                  <option value="booked">
                    Booked
                  </option>

                  <option value="confirmed">
                    Confirmed
                  </option>

                  <option value="unavailable">
                    Unavailable
                  </option>
                </select>
              </div>

              {/* RATING */}

              <div className="vendor-field">
                <label>Rating</label>

                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="4.5"
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>

              {/* SERVICES */}

              <div className="vendor-field vendor-field-full">
                <label>Services</label>

                <textarea
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  placeholder="Wedding photography, candid photography, drone photography..."
                  rows="4"
                />
              </div>

            </div>

            {/* FORM ACTIONS */}

            <div className="vendor-form-actions">

              <button
                type="button"
                className="vendor-cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="vendor-save-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingVendor
                  ? "Update Vendor"
                  : "Save Vendor"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* ================= TOOLBAR ================= */}

      <div className="vendor-toolbar">

        <div className="vendor-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search vendors..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          <option value="all">
            All Categories
          </option>

          <option value="photography">
            Photography
          </option>

          <option value="videography">
            Videography
          </option>

          <option value="catering">
            Catering
          </option>

          <option value="decoration">
            Decoration
          </option>

          <option value="makeup">
            Makeup
          </option>

          <option value="mehendi">
            Mehendi
          </option>

          <option value="music">
            Music
          </option>

          <option value="dj">
            DJ
          </option>

          <option value="entertainment">
            Entertainment
          </option>

          <option value="transportation">
            Transportation
          </option>

          <option value="venue">
            Venue
          </option>

          <option value="printing">
            Printing
          </option>

          <option value="equipment">
            Event Equipment
          </option>
        </select>

        <select
          value={availabilityFilter}
          onChange={(e) =>
            setAvailabilityFilter(e.target.value)
          }
        >
          <option value="all">
            All Availability
          </option>

          <option value="available">
            Available
          </option>

          <option value="booked">
            Booked
          </option>

          <option value="confirmed">
            Confirmed
          </option>

          <option value="unavailable">
            Unavailable
          </option>
        </select>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="vendors-content-card">

        <div className="vendors-content-top">

          <div>
            <h2>Vendor Network</h2>

            <p>
              {filteredVendors.length} vendor
              {filteredVendors.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>
          </div>

        </div>

        {/* LOADING */}

        {loading ? (
          <div className="vendors-loading">

            <div className="vendors-spinner"></div>

            <p>
              Loading vendors...
            </p>

          </div>
        ) : filteredVendors.length === 0 ? (

          /* EMPTY */

          <div className="vendors-empty">

            <div className="vendors-empty-icon">
              🤝
            </div>

            <h3>
              No vendors found
            </h3>

            <p>
              Add your first event vendor to
              start managing your partner network.
            </p>

            <button
              className="vendor-empty-btn"
              onClick={handleAddVendor}
            >
              Add Vendor
            </button>

          </div>

        ) : (

          /* TABLE */

          <div className="vendors-table-wrap">

            <table className="vendors-table">

              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Category</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Pricing</th>
                  <th>Rating</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredVendors.map(
                  (vendor) => (

                    <tr key={vendor.id}>

                      {/* VENDOR */}

                      <td>

                        <div className="vendor-person">

                          <div className="vendor-avatar">
                            {vendor.name
                              ?.split(" ")
                              .map(
                                (word) =>
                                  word[0]
                              )
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {vendor.name}
                            </strong>

                            <span>
                              ID #{vendor.id}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td>

                        <span className="vendor-category">

                          {CATEGORY_LABELS[
                            vendor.category
                          ] ||
                            vendor.category ||
                            "—"}

                        </span>

                      </td>

                      {/* CONTACT */}

                      <td>

                        <div className="vendor-contact">

                          {vendor.contact && (
                            <span>
                              📞{" "}
                              {vendor.contact}
                            </span>
                          )}

                          {vendor.email && (
                            <span>
                              ✉{" "}
                              {vendor.email}
                            </span>
                          )}

                          {!vendor.contact &&
                            !vendor.email && (
                              <span className="no-contact">
                                No contact
                              </span>
                            )}

                        </div>

                      </td>

                      {/* LOCATION */}

                      <td>

                        <span className="vendor-location">

                          {vendor.location ||
                            "—"}

                        </span>

                      </td>

                      {/* PRICING */}

                      <td>

                        <strong className="vendor-price">

                          ₹
                          {Number(
                            vendor.pricing || 0
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </strong>

                      </td>

                      {/* RATING */}

                      <td>

                        <span className="vendor-rating">

                          ⭐{" "}
                          {vendor.rating
                            ? Number(
                                vendor.rating
                              ).toFixed(1)
                            : "—"}

                        </span>

                      </td>

                      {/* AVAILABILITY */}

                      <td>

                        <select
                          className={`vendor-availability-select availability-${vendor.availability}`}
                          value={
                            vendor.availability ||
                            "available"
                          }
                          onChange={(e) =>
                            handleAvailabilityChange(
                              vendor,
                              e.target.value
                            )
                          }
                        >

                          <option value="available">
                            Available
                          </option>

                          <option value="booked">
                            Booked
                          </option>

                          <option value="confirmed">
                            Confirmed
                          </option>

                          <option value="unavailable">
                            Unavailable
                          </option>

                        </select>

                      </td>

                      {/* ACTIONS */}

                      <td>

                        <div className="vendor-actions">

                          <button
                            className="vendor-edit-btn"
                            onClick={() =>
                              handleEdit(
                                vendor
                              )
                            }
                            title="Edit Vendor"
                          >
                            ✏
                          </button>

                          <button
                            className="vendor-delete-btn"
                            onClick={() =>
                              handleDelete(
                                vendor.id
                              )
                            }
                            title="Delete Vendor"
                          >
                            🗑
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Vendors;
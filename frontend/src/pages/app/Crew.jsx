import { useState } from "react";
import { Link } from "react-router-dom";
import "./Crew.css";

const initialCrew = [
  {
    id: 1,
    name: "Arun Kumar",
    role: "Photographer",
    phone: "+91 98765 43210",
    event: "Arjun & Priya Wedding",
    function: "Wedding",
    status: "Checked In",
  },
  {
    id: 2,
    name: "Karthik Raj",
    role: "Videographer",
    phone: "+91 98765 12345",
    event: "Arjun & Priya Wedding",
    function: "Reception",
    status: "Assigned",
  },
  {
    id: 3,
    name: "Meena Devi",
    role: "Makeup Artist",
    phone: "+91 98765 67890",
    event: "Vimal Reception",
    function: "Reception",
    status: "Assigned",
  },
  {
    id: 4,
    name: "Suresh B",
    role: "Coordinator",
    phone: "+91 91234 56789",
    event: "Vetri Annual Meet",
    function: "Corporate Event",
    status: "Checked In",
  },
  {
    id: 5,
    name: "Rahul Events",
    role: "DJ",
    phone: "+91 99887 66554",
    event: "Arjun & Priya Wedding",
    function: "Reception",
    status: "Absent",
  },
];

function Crew() {
  const [crew, setCrew] = useState(initialCrew);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredCrew = crew.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.event.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || member.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const checkedIn = crew.filter(
    (member) => member.status === "Checked In"
  ).length;

  const assigned = crew.filter(
    (member) => member.status === "Assigned"
  ).length;

  const absent = crew.filter(
    (member) => member.status === "Absent"
  ).length;

  const handleCheckIn = (id) => {
    setCrew((prev) =>
      prev.map((member) =>
        member.id === id
          ? { ...member, status: "Checked In" }
          : member
      )
    );
  };

  return (
    <div className="crew-page">

      {/* HEADER */}
      <div className="crew-header">
        <div>
          <div className="breadcrumb">
            Dashboard <span>›</span> Crew Management
          </div>

          <h1>Crew Management</h1>

          <p>
            Manage your event team, assignments and check-ins
            from one place.
          </p>
        </div>

        <button
          className="crew-add-btn"
          onClick={() => alert("Add Crew Member form coming next")}
        >
          <span>+</span>
          Add Crew Member
        </button>
      </div>

      {/* STATS */}
      <div className="crew-stats">

        <div className="crew-stat-card total">
          <div className="stat-icon">👥</div>
          <div>
            <span>Total Crew</span>
            <strong>{crew.length}</strong>
          </div>
        </div>

        <div className="crew-stat-card assigned">
          <div className="stat-icon">📋</div>
          <div>
            <span>Assigned</span>
            <strong>{assigned}</strong>
          </div>
        </div>

        <div className="crew-stat-card checked">
          <div className="stat-icon">✓</div>
          <div>
            <span>Checked In</span>
            <strong>{checkedIn}</strong>
          </div>
        </div>

        <div className="crew-stat-card absent">
          <div className="stat-icon">!</div>
          <div>
            <span>Absent</span>
            <strong>{absent}</strong>
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="crew-actions">

        <Link to="/dashboard/events" className="crew-action-card">
          <span>📅</span>
          <div>
            <strong>Event Assignments</strong>
            <small>View crew by event</small>
          </div>
          <b>→</b>
        </Link>

        <Link to="/dashboard/calendar" className="crew-action-card">
          <span>🗓️</span>
          <div>
            <strong>Crew Schedule</strong>
            <small>Check upcoming schedules</small>
          </div>
          <b>→</b>
        </Link>

        <Link to="/dashboard/event-day" className="crew-action-card">
          <span>⚡</span>
          <div>
            <strong>Event Day</strong>
            <small>Live crew check-in</small>
          </div>
          <b>→</b>
        </Link>

      </div>

      {/* TABLE SECTION */}
      <div className="crew-table-card">

        <div className="crew-table-top">

          <div>
            <h2>Crew Members</h2>
            <p>Manage assigned event team members</p>
          </div>

          <div className="crew-filters">

            <div className="crew-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search crew..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Photographer">Photographer</option>
              <option value="Videographer">Videographer</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Makeup Artist">Makeup Artist</option>
              <option value="DJ">DJ</option>
            </select>

          </div>
        </div>

        {/* TABLE */}
        <div className="crew-table-wrapper">

          <table className="crew-table">

            <thead>
              <tr>
                <th>CREW MEMBER</th>
                <th>ROLE</th>
                <th>EVENT</th>
                <th>FUNCTION</th>
                <th>CONTACT</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {filteredCrew.map((member) => (

                <tr key={member.id}>

                  <td>
                    <div className="crew-person">
                      <div className="crew-avatar">
                        {member.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{member.name}</strong>
                        <small>Crew #{member.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="role-badge">
                      {member.role}
                    </span>
                  </td>

                  <td>
                    <strong className="event-name">
                      {member.event}
                    </strong>
                  </td>

                  <td>
                    {member.function}
                  </td>

                  <td>
                    <a
                      className="phone-link"
                      href={`tel:${member.phone}`}
                    >
                      {member.phone}
                    </a>
                  </td>

                  <td>
                    <span
                      className={`crew-status ${member.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <i></i>
                      {member.status}
                    </span>
                  </td>

                  <td>

                    {member.status === "Assigned" ? (
                      <button
                        className="checkin-btn"
                        onClick={() =>
                          handleCheckIn(member.id)
                        }
                      >
                        Check In
                      </button>
                    ) : (
                      <button
                        className="view-btn"
                        onClick={() =>
                          alert(
                            `Viewing ${member.name}`
                          )
                        }
                      >
                        View
                      </button>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredCrew.length === 0 && (
            <div className="crew-empty">
              <div>👥</div>
              <h3>No crew members found</h3>
              <p>
                Try changing your search or role filter.
              </p>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="crew-table-footer">
          Showing <strong>{filteredCrew.length}</strong> of{" "}
          <strong>{crew.length}</strong> crew members
        </div>

      </div>

    </div>
  );
}

export default Crew;
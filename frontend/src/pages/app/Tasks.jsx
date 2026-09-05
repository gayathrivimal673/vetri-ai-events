import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../api/eventsApi";
import "./Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    event: "",
    title: "",
    description: "",
    priority: "medium",
    due_date: "",
    status: "not_started",
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // =====================================================
  // LOAD TASKS
  // =====================================================

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();

      setTasks(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Tasks API error:", err);
      setError(
        err.response?.data?.detail ||
          "Unable to load tasks. Please check backend."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // CREATE TASK
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.event) {
      alert("Please enter Event ID");
      return;
    }

    if (!formData.title.trim()) {
      alert("Please enter task title");
      return;
    }

    try {
      setSaving(true);

      await createTask({
        event: Number(formData.event),
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        due_date: formData.due_date || null,
        status: formData.status,
      });

      alert("✅ Task created successfully!");

      setFormData({
        event: "",
        title: "",
        description: "",
        priority: "medium",
        due_date: "",
        status: "not_started",
      });

      setShowForm(false);

      await loadTasks();
    } catch (err) {
      console.error("Create task error:", err);
      console.error("Backend response:", err.response?.data);

      alert(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Unable to create task"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // STATUS UPDATE
  // =====================================================

  const handleStatusChange = async (task, newStatus) => {
    try {
      await updateTask(task.id, {
        event: task.event,
        function: task.function,
        title: task.title,
        description: task.description,
        owner: task.owner,
        priority: task.priority,
        due_date: task.due_date,
        status: newStatus,
        dependency: task.dependency,
      });

      await loadTasks();
    } catch (err) {
      console.error("Update task error:", err);
      alert("Unable to update task status");
    }
  };

  // =====================================================
  // DELETE TASK
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await deleteTask(id);

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Delete task error:", err);
      alert("Unable to delete task");
    }
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" || task.status === filter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      task.title?.toLowerCase().includes(searchText) ||
      task.description?.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  // =====================================================
  // COUNTS
  // =====================================================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) =>
      task.status === "not_started" ||
      task.status === "in_progress"
  ).length;

  const blockedTasks = tasks.filter(
    (task) => task.status === "blocked"
  ).length;

  // =====================================================
  // HELPERS
  // =====================================================

  const getStatusLabel = (status) => {
    const labels = {
      not_started: "Not Started",
      in_progress: "In Progress",
      blocked: "Blocked",
      completed: "Completed",
    };

    return labels[status] || status;
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      low: "Low",
      medium: "Medium",
      high: "High",
      urgent: "Urgent",
    };

    return labels[priority] || priority;
  };

  return (
    <div className="tasks-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="tasks-header">

        <div>
          <span className="tasks-kicker">EVENT OPERATIONS</span>

          <h1>Task Management</h1>

          <p>
            Organize, assign and track every task across your events.
          </p>
        </div>

        <button
          className="add-task-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Task
        </button>

      </div>

      {/* =================================================
          STATS
      ================================================= */}

      <div className="task-stats">

        <div className="task-stat-card">
          <div className="stat-icon purple">✓</div>
          <div>
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>
        </div>

        <div className="task-stat-card">
          <div className="stat-icon orange">◷</div>
          <div>
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>
        </div>

        <div className="task-stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
        </div>

        <div className="task-stat-card">
          <div className="stat-icon pink">!</div>
          <div>
            <span>Blocked</span>
            <strong>{blockedTasks}</strong>
          </div>
        </div>

      </div>

      {/* =================================================
          ADD TASK FORM
      ================================================= */}

      {showForm && (
        <div className="task-form-card">

          <div className="task-form-title">
            <div>
              <span>CREATE NEW TASK</span>
              <h2>Add Task</h2>
            </div>

            <button
              className="close-task-form"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="task-form-grid">

              <div className="task-form-group">
                <label>Event ID *</label>

                <input
                  type="number"
                  name="event"
                  placeholder="Example: 1"
                  value={formData.event}
                  onChange={handleChange}
                />

                <small>
                  Enter the database Event ID.
                </small>
              </div>

              <div className="task-form-group">
                <label>Task Title *</label>

                <input
                  type="text"
                  name="title"
                  placeholder="Example: Confirm Decoration"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="task-form-group full">
                <label>Description</label>

                <textarea
                  name="description"
                  rows="3"
                  placeholder="Describe the task..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="task-form-group">
                <label>Priority</label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="task-form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="not_started">
                    Not Started
                  </option>

                  <option value="in_progress">
                    In Progress
                  </option>

                  <option value="blocked">
                    Blocked
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>
              </div>

              <div className="task-form-group">
                <label>Due Date</label>

                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="task-form-actions">

              <button
                type="button"
                className="cancel-task-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-task-btn"
                disabled={saving}
              >
                {saving ? "Saving..." : "✓ Create Task"}
              </button>

            </div>

          </form>
        </div>
      )}

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="tasks-toolbar">

        <div className="task-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="task-filters">

          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "not_started" ? "active" : ""}
            onClick={() => setFilter("not_started")}
          >
            Not Started
          </button>

          <button
            className={filter === "in_progress" ? "active" : ""}
            onClick={() => setFilter("in_progress")}
          >
            In Progress
          </button>

          <button
            className={filter === "blocked" ? "active" : ""}
            onClick={() => setFilter("blocked")}
          >
            Blocked
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>

        </div>

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      {loading ? (
        <div className="tasks-message">
          <div className="loading-circle"></div>
          <p>Loading tasks...</p>
        </div>
      ) : error ? (
        <div className="tasks-message error">
          <strong>Unable to load tasks</strong>
          <p>{error}</p>

          <button onClick={loadTasks}>
            Try Again
          </button>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="tasks-message empty">

          <div className="empty-task-icon">✓</div>

          <h3>No Tasks Found</h3>

          <p>
            Create your first event task to start managing
            your event operations.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="empty-add-btn"
          >
            + Create Task
          </button>

        </div>
      ) : (

        <div className="tasks-list">

          {filteredTasks.map((task) => (

            <div
              className="task-card"
              key={task.id}
            >

              <div className="task-card-main">

                <div
                  className={`task-check ${
                    task.status === "completed"
                      ? "checked"
                      : ""
                  }`}
                >
                  {task.status === "completed" ? "✓" : ""}
                </div>

                <div className="task-content">

                  <div className="task-title-row">

                    <h3>{task.title}</h3>

                    <span
                      className={`priority-badge ${task.priority}`}
                    >
                      {getPriorityLabel(task.priority)}
                    </span>

                  </div>

                  {task.description && (
                    <p>{task.description}</p>
                  )}

                  <div className="task-meta">

                    <span>
                      📅{" "}
                      {task.due_date
                        ? task.due_date
                        : "No due date"}
                    </span>

                    <span>
                      Event #{task.event}
                    </span>

                    {task.owner && (
                      <span>
                        Owner #{task.owner}
                      </span>
                    )}

                  </div>

                </div>

              </div>

              <div className="task-card-actions">

                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(
                      task,
                      e.target.value
                    )
                  }
                  className={`status-select ${task.status}`}
                >
                  <option value="not_started">
                    Not Started
                  </option>

                  <option value="in_progress">
                    In Progress
                  </option>

                  <option value="blocked">
                    Blocked
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>

                <button
                  className="delete-task-btn"
                  onClick={() =>
                    handleDelete(task.id)
                  }
                  title="Delete task"
                >
                  🗑
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* =================================================
          FOOTER LINK
      ================================================= */}

      <div className="tasks-bottom">

        <Link to="/dashboard/events">
          ← Back to Events
        </Link>

        <span>
          Showing {filteredTasks.length} of {totalTasks} tasks
        </span>

      </div>

    </div>
  );
}

export default Tasks;
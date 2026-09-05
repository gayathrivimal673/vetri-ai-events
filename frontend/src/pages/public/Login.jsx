import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(username, password);

      // Save JWT tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      // Go to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);

      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Invalid username or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">

      {/* LEFT VISUAL */}
      <section className="login-visual">
        <div className="login-visual-overlay"></div>

        <div className="login-brand">
          <div className="login-logo">V</div>
          <div>
            <strong>Vetri</strong>
            <span>EventOS</span>
          </div>
        </div>

        <div className="login-visual-content">
          <span className="login-small-badge">
            ✦ AI POWERED EVENT MANAGEMENT
          </span>

          <h1>
            Plan moments.
            <br />
            <span>Create memories.</span>
          </h1>

          <p>
            One beautiful platform to manage your events,
            vendors, guests, budgets and every important detail.
          </p>

          <div className="login-floating-card">
            <div className="floating-icon">✦</div>
            <div>
              <strong>Everything in one place</strong>
              <span>Events • Vendors • Guests • Budget</span>
            </div>
          </div>
        </div>

        <div className="login-decoration decoration-one">✦</div>
        <div className="login-decoration decoration-two">✧</div>
      </section>

      {/* LOGIN FORM */}
      <section className="login-form-section">

        <div className="login-form-wrapper">

          <Link to="/" className="mobile-login-brand">
            <div className="login-logo">V</div>
            <strong>Vetri EventOS</strong>
          </Link>

          <div className="login-heading">
            <span>WELCOME BACK</span>
            <h2>
              Let's continue
              <br />
              planning something beautiful.
            </h2>
            <p>
              Sign in to access your event workspace.
            </p>
          </div>

          <form onSubmit={handleLogin} className="login-form">

            {/* USERNAME */}
            <div className="login-field">
              <label>Username</label>

              <div className="input-wrapper">
                <span>✉</span>

                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="login-field">

              <div className="password-label">
                <label>Password</label>
                <a href="#forgot">Forgot password?</a>
              </div>

              <div className="input-wrapper">
                <span>⌑</span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  color: "#d93025",
                  background: "#fff1f1",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                {error}
              </div>
            )}

            <label className="remember-row">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <span>→</span>}
            </button>

          </form>

          <div className="login-divider">
            <span>or continue with</span>
          </div>

          <div className="login-alternatives">

            <button type="button">
              <span>G</span>
              Google
            </button>

            <button type="button">
              <span>✉</span>
              Email OTP
            </button>

          </div>

          <p className="signup-text">
            Don't have an account?
            <Link to="/contact"> Get Started</Link>
          </p>

          <Link to="/" className="back-home">
            ← Back to Vetri EventOS
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Login;
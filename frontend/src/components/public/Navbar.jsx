import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">

       <Link to="/" className="nav-logo">
  <div className="logo-mark">
    <span>V</span>
    <i>✦</i>
  </div>

  <div className="logo-text">
    <strong>Vetri AI</strong>
    <span>EVENT MANAGEMENT</span>
  </div>
</Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/get-started" className="get-started-btn">
            Get Started →
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
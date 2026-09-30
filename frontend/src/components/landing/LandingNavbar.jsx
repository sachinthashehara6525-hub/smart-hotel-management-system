import { Link, NavLink } from "react-router-dom";

function LandingNavbar() {
  return (
    <header className="landing-navbar">
      <div className="landing-container landing-navbar-inner">
        <Link to="/" className="landing-brand">
          <span className="landing-logo">◈</span>
          <span>Avelora</span>
        </Link>

        <nav className="landing-nav-links">
          <NavLink to="/hotel/rooms" className={({ isActive }) => isActive ? "landing-nav-link is-active" : "landing-nav-link"}>
            Rooms
          </NavLink>
          <NavLink to="/hotel/amenities" className={({ isActive }) => isActive ? "landing-nav-link is-active" : "landing-nav-link"}>
            Amenities
          </NavLink>
          <NavLink to="/hotel/gallery" className={({ isActive }) => isActive ? "landing-nav-link is-active" : "landing-nav-link"}>
            Gallery
          </NavLink>
          <NavLink to="/hotel/contact" className={({ isActive }) => isActive ? "landing-nav-link is-active" : "landing-nav-link"}>
            Contact
          </NavLink>
        </nav>

        <div className="landing-nav-actions">
          <Link to="/hotel/contact" className="landing-btn landing-btn-gold">
            Book Now
          </Link>

          <Link to="/login" className="landing-staff-login">
            Staff Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;
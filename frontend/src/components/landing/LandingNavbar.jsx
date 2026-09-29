import { Link } from "react-router-dom";

function LandingNavbar() {
  return (
    <header className="landing-navbar">
      <div className="landing-container landing-navbar-inner">
        <Link to="/" className="landing-brand">
          <span className="landing-logo">◈</span>
          <span>Avelora</span>
        </Link>

        <nav className="landing-nav-links">
          <Link to="/hotel/rooms">Rooms</Link>
          <Link to="/hotel/amenities">Amenities</Link>
          <Link to="/hotel/gallery">Gallery</Link>
          <Link to="/hotel/contact">Contact</Link>
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
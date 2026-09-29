import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-container landing-footer-grid">
        <div>
          <h3>Avelora</h3>
          <p>Luxury stays. Timeless experiences.</p>
        </div>

        <div className="landing-footer-links">
          <Link to="/hotel/rooms">Rooms</Link>
          <Link to="/hotel/amenities">Amenities</Link>
          <Link to="/hotel/gallery">Gallery</Link>
          <Link to="/hotel/contact">Contact</Link>
        </div>
      </div>

      <div className="landing-footer-bottom">
        © 2026 Avelora. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
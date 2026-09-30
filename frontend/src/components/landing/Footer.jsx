import { Link } from 'react-router-dom'

function Footer({ variant = 'default' }) {
  return (
    <footer className="landing-footer">
      <div className="landing-container landing-footer-grid">
        <div>
          <h3>Avelora</h3>
          <p>Luxury stays. Timeless experiences.</p>
        </div>

        {(['rooms', 'amenities', 'gallery', 'contact'].includes(variant)) && (
          <div className="landing-footer-details">
            <span>Ocean View Drive, Avelora Bay</span>
            <a href="tel:+15550184200">+1 (555) 018-4200</a>
            <a href="mailto:stay@avelora.com">stay@avelora.com</a>
            <span>Check-in from 3:00 PM</span>
          </div>
        )}

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
import { Link } from "react-router-dom";
import hotelHero from "../../assets/hotel-hero.jpg";

function Hero() {
  return (
    <section
      className="landing-hero"
      style={{ backgroundImage: `url(${hotelHero})` }}
    >
      <div className="landing-hero-overlay"></div>

      <div className="landing-container landing-hero-content">
        <p className="landing-eyebrow">A PLACE BEYOND ORDINARY</p>

        <h1>Avelora</h1>

        <h2>Luxury Stays. Timeless Experiences.</h2>

        <p className="landing-hero-text">
          Where refined elegance meets heartfelt hospitality. Discover a
          sanctuary of comfort, style, and unforgettable moments.
        </p>

        <div className="landing-hero-actions">
          <Link to="/hotel/rooms" className="landing-btn landing-btn-gold">
            Explore Rooms
          </Link>

          <Link to="/hotel/contact" className="landing-btn landing-btn-outline">
            Book Your Stay
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
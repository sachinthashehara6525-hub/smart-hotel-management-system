import hotelAbout from "../../assets/hotel-about.jpg";

function About() {
  return (
    <section className="landing-section landing-about" id="about">
      <div className="landing-container landing-about-grid">
        <div className="landing-about-image-wrap">
          <img
            src={hotelAbout}
            alt="Luxury hotel interior"
            className="landing-about-image"
          />
        </div>

        <div className="landing-about-content">
          <p className="landing-eyebrow">ABOUT US</p>

          <h2>A Legacy of Luxury & Hospitality</h2>

          <p>
            At Avelora, we believe every journey deserves an extraordinary
            stay. Our hotel combines elegant spaces, thoughtful service, and
            modern convenience to create memorable experiences.
          </p>

          <div className="landing-stats">
            <div>
              <strong>10+</strong>
              <span>Years of Excellence</span>
            </div>

            <div>
              <strong>50K+</strong>
              <span>Happy Guests</span>
            </div>

            <div>
              <strong>4.8★</strong>
              <span>Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
function Contact() {
  return (
    <section className="landing-section landing-contact" id="contact">
      <div className="landing-container">
        <div className="landing-section-heading">
          <p className="landing-eyebrow">GET IN TOUCH</p>
          <h2>Plan Your Stay</h2>
          <p>
            Reach out for reservations, inquiries, or special requests.
          </p>
        </div>

        <div className="landing-contact-grid">
          <div className="landing-contact-info">
            <div>
              <h3>Our Location</h3>
              <p>48 Janadhipathi Mawatha, Colombo 01, Sri Lanka</p>
            </div>

            <div>
              <h3>Call Us</h3>
              <p>+94 11 234 5678</p>
            </div>

            <div>
              <h3>Email Us</h3>
              <p>reservations@hotelname.com</p>
            </div>
          </div>

          <div className="landing-map-wrap">
            <iframe
              title="Avelora Hotel location"
              src="https://www.google.com/maps?q=Avelora%20Hotel%2C%20Colombo%2C%20Sri%20Lanka&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
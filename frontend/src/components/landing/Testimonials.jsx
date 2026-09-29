function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      review:
        "An absolutely breathtaking experience. The service, ambience, and attention to detail were outstanding.",
    },
    {
      name: "Michael Chen",
      location: "London, UK",
      review:
        "The perfect blend of luxury and comfort. Every moment at Avelora felt special.",
    },
    {
      name: "Emily Rodriguez",
      location: "Sydney, Australia",
      review:
        "Beautiful rooms, amazing views, and exceptional hospitality. We cannot wait to return.",
    },
  ];

  return (
    <section className="landing-section landing-testimonials">
      <div className="landing-container">
        <div className="landing-section-heading">
          <p className="landing-eyebrow">TESTIMONIALS</p>
          <h2>What Our Guests Say</h2>
          <p>Real stories. Genuine experiences. Unforgettable stays.</p>
        </div>

        <div className="landing-testimonial-grid">
          {testimonials.map((item) => (
            <article className="landing-testimonial-card" key={item.name}>
              <div className="landing-stars">★★★★★</div>
              <p>"{item.review}"</p>
              <h3>{item.name}</h3>
              <span>{item.location}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
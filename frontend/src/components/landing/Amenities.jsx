function Amenities() {
  const amenities = [
    { icon: "◉", title: "Free WiFi", text: "High-speed internet" },
    { icon: "≈", title: "Swimming Pool", text: "Infinity pool with a view" },
    { icon: "♨", title: "Fine Dining", text: "Local & international cuisine" },
    { icon: "◆", title: "Fitness Center", text: "Modern fitness facilities" },
    { icon: "✦", title: "Spa & Wellness", text: "Relax and rejuvenate" },
    { icon: "▣", title: "Airport Transfers", text: "Convenient travel service" },
  ];

  return (
    <section className="landing-section" id="amenities">
      <div className="landing-container">
        <div className="landing-section-heading">
          <p className="landing-eyebrow">AMENITIES</p>
          <h2>World-Class Amenities</h2>
          <p>
            Everything you need for a comfortable and unforgettable stay.
          </p>
        </div>

        <div className="landing-amenities-grid">
          {amenities.map((item) => (
            <div className="landing-amenity-card" key={item.title}>
              <div className="landing-amenity-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Amenities;
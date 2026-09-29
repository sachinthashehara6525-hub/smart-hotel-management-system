import smartFeaturesImg from "../../assets/smart-features.jpg"

function SmartFeatures() {
  const features = [
    {
      title: "Online Booking",
      text: "Book your stay in minutes.",
      icon: "▣",
    },
    {
      title: "Digital Check-In",
      text: "Skip the lines and start relaxing.",
      icon: "✓",
    },
    {
      title: "Live Room Availability",
      text: "See room availability in real time.",
      icon: "◉",
    },
    {
      title: "Service Requests",
      text: "Request hotel services anytime.",
      icon: "✦",
    },
  ]

  return (
    <section className="landing-section landing-smart">
      <div className="landing-container landing-smart-grid">
        <div>
          <img
            src={smartFeaturesImg}
            alt="Smart hotel mobile experience"
            className="landing-smart-image"
          />
        </div>

        <div className="landing-smart-content">
          <p className="landing-eyebrow">SMART FEATURES</p>

          <h2>A Smarter, Seamless Stay</h2>

          <p>
            Modern technology meets timeless hospitality. Enjoy a smoother,
            more convenient hotel experience from booking to checkout.
          </p>

          <div className="landing-feature-grid">
            {features.map((feature) => (
              <div className="landing-feature-item" key={feature.title}>
                <div className="landing-feature-icon">
                  {feature.icon}
                </div>

                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SmartFeatures
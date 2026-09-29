import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'

const features = [
  { number: '01', title: 'See the full picture', text: 'A calm dashboard for occupancy, revenue, arrivals, and the details that keep your day moving.' },
  { number: '02', title: 'Keep rooms ready', text: 'Track room status at a glance and keep housekeeping and maintenance in sync.' },
  { number: '03', title: 'Make every stay smoother', text: 'Bring bookings, guests, and front-desk decisions into one reliable workspace.' },
]

function Landing() {
  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Landing page navigation">
        <Link className="landing-brand" to="/">
          <span className="landing-brand-mark" aria-hidden="true" />
          <span>Smart Hotel</span>
        </Link>
        <div className="landing-nav-actions">
          <Link className="landing-nav-login" to="/login">Sign in</Link>
          <Link className="landing-nav-cta" to="/signup">Get started <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow"><span /> Hospitality, in focus</p>
          <h1>Run the stay.<br /><em>Elevate the experience.</em></h1>
          <p className="landing-intro">Smart Hotel gives your team a clear, connected command center for every room, reservation, and guest moment.</p>
          <div className="landing-hero-actions">
            <Link className="landing-primary-button" to="/signup">Start managing <span aria-hidden="true">↗</span></Link>
            <a className="landing-text-link" href="#features">Explore the platform <span aria-hidden="true">↓</span></a>
          </div>
          <div className="landing-proof">
            <div className="landing-avatar-stack" aria-hidden="true"><span>J</span><span>M</span><span>A</span><span>+</span></div>
            <p><strong>Made for teams who care</strong><br />A better day at the front desk starts here.</p>
          </div>
        </div>

        <div className="landing-hero-visual">
          <div className="landing-image-frame">
            <img src={heroImage} alt="Warm, modern hotel lobby" />
            <div className="landing-image-caption"><span className="landing-live-dot" /> Your hotel, beautifully organized</div>
          </div>
          <div className="landing-stat-card">
            <span className="landing-stat-label">Today at a glance</span>
            <strong>84<span>%</span></strong>
            <span className="landing-stat-detail">Occupancy <b>+12.4%</b></span>
            <div className="landing-stat-bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="landing-room-card"><span className="landing-room-icon">✦</span><span><b>Room 204</b><small>Ready for arrival</small></span><span className="landing-room-check">✓</span></div>
        </div>
      </section>

      <section className="landing-feature-section" id="features">
        <div className="landing-section-heading"><p className="landing-eyebrow"><span /> Less juggling. More hosting.</p><h2>Everything your hotel needs<br /><em>to feel effortless.</em></h2></div>
        <div className="landing-features">{features.map((feature) => <article className="landing-feature" key={feature.number}><span>{feature.number}</span><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div>
      </section>

      <footer className="landing-footer"><span>Smart Hotel</span><span>Made for the moments between check-in and check-out.</span></footer>
    </main>
  )
}

export default Landing

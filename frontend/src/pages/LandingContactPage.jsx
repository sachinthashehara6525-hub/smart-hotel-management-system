import LandingNavbar from '../components/landing/LandingNavbar'
import Contact from '../components/landing/Contact'
import Footer from '../components/landing/Footer'

function LandingContactPage() {
  return (
    <div className="landing-page landing-subpage contact-page">
      <LandingNavbar />
      <Contact />
      <Footer variant="contact" />
    </div>
  )
}

export default LandingContactPage

import LandingNavbar from "../components/landing/LandingNavbar"
import Hero from "../components/landing/Hero"
import About from "../components/landing/About"
import Rooms from "../components/landing/Rooms"
import Amenities from "../components/landing/Amenities"
import SmartFeatures from "../components/landing/SmartFeatures"
import Gallery from "../components/landing/Gallery"
import Testimonials from "../components/landing/Testimonials"
import Contact from "../components/landing/Contact"
import Footer from "../components/landing/Footer"
import "./landing.css"

function LandingPage() {
  return (
    <div className="landing-page">
      <LandingNavbar />
      <Hero />
      <About />
      <Rooms />
      <Amenities />
      <SmartFeatures />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default LandingPage
import LandingNavbar from '../components/landing/LandingNavbar'
import Amenities from '../components/landing/Amenities'
import Footer from '../components/landing/Footer'

function LandingAmenitiesPage() {
  return (
    <div className="landing-page landing-subpage amenities-page">
      <LandingNavbar />
      <Amenities />
      <Footer variant="amenities" />
    </div>
  )
}

export default LandingAmenitiesPage

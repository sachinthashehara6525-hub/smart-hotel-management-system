import LandingNavbar from '../components/landing/LandingNavbar'
import Rooms from '../components/landing/Rooms'
import Footer from '../components/landing/Footer'

function LandingRoomsPage() {
  return (
    <div className="landing-page landing-subpage">
      <LandingNavbar />
      <Rooms />
      <Footer />
    </div>
  )
}

export default LandingRoomsPage

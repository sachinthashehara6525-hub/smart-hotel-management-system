import LandingNavbar from '../components/landing/LandingNavbar'
import Gallery from '../components/landing/Gallery'
import Footer from '../components/landing/Footer'

function LandingGalleryPage() {
  return (
    <div className="landing-page landing-subpage gallery-page">
      <LandingNavbar />
      <Gallery />
      <Footer variant="gallery" />
    </div>
  )
}

export default LandingGalleryPage

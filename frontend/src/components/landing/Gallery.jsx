import galleryPool from "../../assets/gallery-pool.jpg";
import galleryRestaurant from "../../assets/gallery-restaurant.jpg";
import galleryBathroom from "../../assets/gallery-bathroom.jpg";
import hotelHero from "../../assets/hotel-hero.jpg";
import hotelAbout from "../../assets/hotel-about.jpg";
import smartFeatures from "../../assets/smart-features.jpg";

function Gallery() {
  const images = [
    { src: galleryPool, alt: "Luxury infinity pool" },
    { src: galleryRestaurant, alt: "Fine dining restaurant" },
    { src: galleryBathroom, alt: "Luxury hotel bathroom" },
    { src: hotelHero, alt: "Avelora hotel exterior" },
    { src: hotelAbout, alt: "Luxury hotel interior" },
    { src: smartFeatures, alt: "Smart hotel guest experience" },
  ];

  return (
    <section className="landing-section" id="gallery">
      <div className="landing-container">
        <div className="landing-section-heading">
          <p className="landing-eyebrow">GALLERY</p>
          <h2>Moments of Luxury</h2>
          <p>
            Take a glimpse into the unforgettable experiences waiting for you.
          </p>
        </div>

        <div className="landing-gallery-grid">
          {images.map((image, index) => (
            <div
              className={`landing-gallery-item landing-gallery-item-${index + 1}`}
              key={image.alt}
            >
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
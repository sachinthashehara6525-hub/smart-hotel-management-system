import deluxeImg from "../../assets/room-deluxe.jpg"
import executiveImg from "../../assets/room-executive.jpg"
import suiteImg from "../../assets/room-suite.jpg"
import presidentialImg from "../../assets/room-presidential.jpg"

function Rooms() {
  const rooms = [
    {
      name: "Deluxe Room",
      description: "A perfect blend of comfort and elegance for a relaxing stay.",
      price: "$180",
      image: deluxeImg,
      guests: "2 Guests",
      bed: "1 King Bed",
    },
    {
      name: "Executive Room",
      description: "Spacious, stylish, and designed for a premium experience.",
      price: "$250",
      image: executiveImg,
      guests: "2 Guests",
      bed: "1 King Bed",
    },
    {
      name: "Suite Room",
      description: "Indulge in extra space, luxury, and breathtaking views.",
      price: "$320",
      image: suiteImg,
      guests: "3 Guests",
      bed: "1 King Bed",
    },
    {
      name: "Presidential Suite",
      description: "The ultimate luxury experience with exclusive amenities.",
      price: "$550",
      image: presidentialImg,
      guests: "4 Guests",
      bed: "2 King Beds",
    },
  ]

  return (
    <section className="landing-section" id="rooms">
      <div className="landing-container">
        <div className="landing-section-heading">
          <p className="landing-eyebrow">OUR ROOMS</p>
          <h2>Elegant Stays for Every Journey</h2>
          <p>
            Discover beautifully designed rooms crafted for luxury, comfort,
            and style.
          </p>
        </div>

        <div className="landing-room-grid">
          {rooms.map((room) => (
            <article className="landing-room-card" key={room.name}>
              <img src={room.image} alt={room.name} />

              <div className="landing-room-body">
                <h3>{room.name}</h3>

                <p>{room.description}</p>

                <div className="landing-room-meta">
                  <span>{room.guests}</span>
                  <span>{room.bed}</span>
                </div>

                <div className="landing-room-bottom">
                  <div>
                    <strong>{room.price}</strong>
                    <span> / night</span>
                  </div>

                  <button type="button">→</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Rooms
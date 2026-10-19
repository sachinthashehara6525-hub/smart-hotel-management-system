import { useEffect, useState } from "react"
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
      details: "A serene retreat with warm natural textures, a private sitting area, and sweeping views designed for a restorative stay.",
      amenities: ["Panoramic view", "Rain shower", "Smart climate control"],
    },
    {
      name: "Executive Room",
      description: "Spacious, stylish, and designed for a premium experience.",
      price: "$250",
      image: executiveImg,
      guests: "2 Guests",
      bed: "1 King Bed",
      details: "A polished room for business and leisure, with a generous work area, refined finishes, and a quiet lounge corner.",
      amenities: ["Dedicated workspace", "Lounge area", "Nespresso machine"],
    },
    {
      name: "Suite Room",
      description: "Indulge in extra space, luxury, and breathtaking views.",
      price: "$320",
      image: suiteImg,
      guests: "3 Guests",
      bed: "1 King Bed",
      details: "Stretch out in a beautifully appointed suite with separate living space, a deep soaking tub, and uninterrupted bay views.",
      amenities: ["Separate living room", "Soaking tub", "Bay view"],
    },
    {
      name: "Presidential Suite",
      description: "The ultimate luxury experience with exclusive amenities.",
      price: "$550",
      image: presidentialImg,
      guests: "4 Guests",
      bed: "2 King Beds",
      details: "Our signature residence pairs expansive entertaining space with discreet service and the finest details for an exceptional stay.",
      amenities: ["Private lounge", "Dining area", "Butler service"],
    },
  ]

  const [selectedRoom, setSelectedRoom] = useState(null)

  useEffect(() => {
    if (!selectedRoom) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedRoom(null)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [selectedRoom])

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

                  <button
                    type="button"
                    onClick={() => setSelectedRoom(room)}
                    aria-label={`View details for ${room.name}`}
                  >
                    →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedRoom && (
        <div
          className="landing-room-modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedRoom(null)
            }
          }}
        >
          <div
            className="landing-room-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-modal-title"
          >
            <button
              className="landing-room-modal-close"
              type="button"
              onClick={() => setSelectedRoom(null)}
              aria-label="Close room details"
            >
              ×
            </button>
            <img src={selectedRoom.image} alt={selectedRoom.name} />
            <div className="landing-room-modal-content">
              <p className="landing-eyebrow">ROOM DETAILS</p>
              <h2 id="room-modal-title">{selectedRoom.name}</h2>
              <p>{selectedRoom.details}</p>
              <div className="landing-room-modal-meta">
                <span>{selectedRoom.guests}</span>
                <span>{selectedRoom.bed}</span>
                <strong>{selectedRoom.price} <small>/ night</small></strong>
              </div>
              <h3>Included with your stay</h3>
              <ul>
                {selectedRoom.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Rooms
import { useEffect, useState } from 'react'
import api from '../services/api'

function Booking({ isModal = false, onClose }) {
  const [formData, setFormData] = useState({
    customerName: '',
    room: '',
    checkIn: '',
    checkOut: '',
    numberOfGuests: '',
  })
  const [rooms, setRooms] = useState([])
  const [isRoomsLoading, setIsRoomsLoading] = useState(true)
  const [roomsError, setRoomsError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadRooms() {
      try {
        const response = await api.get('/rooms')

        if (!Array.isArray(response.data)) {
          throw new Error('Invalid rooms response')
        }

        setRooms(response.data)
      } catch {
        setRoomsError('Unable to load rooms')
      } finally {
        setIsRoomsLoading(false)
      }
    }

    loadRooms()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setIsSubmitted(false)
    setErrorMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')

    try {
      await api.post('/bookings', {
        customerName: formData.customerName,
        roomNumber: Number(formData.room),
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        numberOfGuests: Number(formData.numberOfGuests),
      })
      setIsSubmitted(true)
      setFormData({
        customerName: '',
        room: '',
        checkIn: '',
        checkOut: '',
        numberOfGuests: '',
      })
    } catch {
      setErrorMessage('Unable to create the booking. Please try again.')
    }
  }

  const bookingContent = (
    <>
      <header className="page-header booking-header">
        {isModal && <span className="booking-eyebrow">AVELORA RESERVATIONS</span>}
        <h1 id={isModal ? 'booking-modal-title' : undefined}>New Booking</h1>
        <p>{isModal ? 'Reserve your next unforgettable stay.' : 'Create a guest reservation from this workspace.'}</p>
      </header>
      <section className="booking-card booking-modal-card">
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="booking-field">
            <label htmlFor="customerName">Customer Name</label>
            <input id="customerName" name="customerName" type="text" value={formData.customerName} onChange={handleChange} placeholder="Enter customer name" required />
          </div>

          <div className="booking-field">
            <label htmlFor="room">Room</label>
            <select id="room" name="room" value={formData.room} onChange={handleChange} required disabled={isRoomsLoading || Boolean(roomsError) || rooms.filter((room) => room.status === 'Available').length === 0}>
              <option value="">Select a room</option>
              {isRoomsLoading && <option value="">Loading rooms...</option>}
              {!isRoomsLoading && roomsError && <option value="">Unable to load rooms</option>}
              {!isRoomsLoading && !roomsError && rooms.filter((room) => room.status === 'Available').length === 0 && <option value="">No available rooms</option>}
              {!isRoomsLoading && !roomsError && rooms.filter((room) => room.status === 'Available').map((room) => (
                <option key={room.roomId} value={room.number}>Room {room.number} - {room.type}</option>
              ))}
            </select>
          </div>

          <div className="booking-field">
            <label htmlFor="numberOfGuests">Number of Guests</label>
            <input id="numberOfGuests" name="numberOfGuests" type="number" min="1" value={formData.numberOfGuests} onChange={handleChange} placeholder="Enter number of guests" required />
          </div>

          <div className="date-fields">
            <div className="booking-field"><label htmlFor="checkIn">Check-in Date</label><input id="checkIn" name="checkIn" type="date" value={formData.checkIn} onChange={handleChange} required /></div>
            <div className="booking-field"><label htmlFor="checkOut">Check-out Date</label><input id="checkOut" name="checkOut" type="date" value={formData.checkOut} onChange={handleChange} required /></div>
          </div>

          <button className="booking-submit" type="submit">Book Room <span aria-hidden="true">→</span></button>
          {isSubmitted && <p className="form-success" role="status">Booking created successfully.</p>}
          {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
        </form>
      </section>
    </>
  )

  if (!isModal) {
    return bookingContent
  }

  return (
    <div
      className="booking-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="booking-modal-shell">
        <button
          className="booking-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close booking form"
        >
          ×
        </button>
        <div>{bookingContent}</div>
      </div>
    </div>
  )
}

export default Booking
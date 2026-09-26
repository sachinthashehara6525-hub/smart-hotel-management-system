import { useState } from 'react'

function Booking() {
  const [formData, setFormData] = useState({
    customerName: '',
    room: '',
    checkIn: '',
    checkOut: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setIsSubmitted(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <>
      <header className="page-header">
        <h1>New Booking</h1>
        <p>Create a guest reservation from this workspace.</p>
      </header>
      <section className="booking-card">
        <form className="booking-form" onSubmit={handleSubmit}>
          <label htmlFor="customerName">Customer Name</label>
          <input id="customerName" name="customerName" type="text" value={formData.customerName} onChange={handleChange} placeholder="Enter customer name" required />

          <label htmlFor="room">Room</label>
          <select id="room" name="room" value={formData.room} onChange={handleChange} required>
            <option value="">Select a room</option>
            <option value="101">Room 101 - Single</option>
            <option value="201">Room 201 - Deluxe</option>
            <option value="302">Room 302 - Deluxe</option>
          </select>

          <div className="date-fields">
            <div><label htmlFor="checkIn">Check-in Date</label><input id="checkIn" name="checkIn" type="date" value={formData.checkIn} onChange={handleChange} required /></div>
            <div><label htmlFor="checkOut">Check-out Date</label><input id="checkOut" name="checkOut" type="date" value={formData.checkOut} onChange={handleChange} required /></div>
          </div>

          <button type="submit">Book Room</button>
          {isSubmitted && <p className="form-success" role="status">Booking details are ready to be submitted.</p>}
        </form>
      </section>
    </>
  )
}

export default Booking
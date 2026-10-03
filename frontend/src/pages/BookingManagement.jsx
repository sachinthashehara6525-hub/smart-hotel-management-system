import { useEffect, useState } from 'react'
import api from '../services/api'

function BookingManagement() {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const statusSequence = ['Confirmed', 'Checked-in', 'Completed']

  useEffect(() => {
    async function loadBookings() {
      try {
        const response = await api.get('/bookings')
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid bookings response')
        }

        setBookings(response.data.map((booking) => ({
          id: booking.id ?? booking.bookingId,
          customer: booking.customer ?? booking.customerName,
          room: booking.room ?? booking.roomNumber,
          checkIn: booking.checkIn ?? booking.checkInDate,
          checkOut: booking.checkOut ?? booking.checkOutDate,
          status: booking.status ?? 'Confirmed',
        })))
      } catch {
        setErrorMessage('Unable to load bookings. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadBookings()
  }, [])

  async function updateStatus(bookingId) {
    const booking = bookings.find((currentBooking) => currentBooking.id === bookingId)
    if (!booking || booking.status === 'Cancelled') return

    const currentStatusIndex = statusSequence.indexOf(booking.status)
    const nextStatus = statusSequence[(currentStatusIndex + 1) % statusSequence.length]

    try {
      const response = await api.put(`/bookings/${bookingId}`, { status: nextStatus })
      const updatedBooking = response.data.booking
      setBookings((currentBookings) => currentBookings.map((currentBooking) => (
        currentBooking.id === bookingId
          ? { ...currentBooking, status: updatedBooking.status }
          : currentBooking
      )))
    } catch {
      setErrorMessage('Unable to update the booking. Please try again.')
    }
  }

  async function cancelBooking(bookingId) {
    try {
      const response = await api.put(`/bookings/${bookingId}`, { status: 'Cancelled' })
      const updatedBooking = response.data.booking
      setBookings((currentBookings) => currentBookings.map((booking) => (
        booking.id === bookingId ? { ...booking, status: updatedBooking.status } : booking
      )))
    } catch {
      setErrorMessage('Unable to cancel the booking. Please try again.')
    }
  }

  return (
    <>
      <header className="page-header">
        <h1>Booking Management</h1>
        <p>Review and manage existing reservations.</p>
      </header>
      <section className="table-card booking-management-card">
        <div className="table-heading"><h2>Reservations</h2><span>{bookings.length} bookings listed</span></div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>Booking ID</th><th>Customer</th><th>Room</th><th>Check-in</th><th>Check-out</th><th>Booking Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
                {isLoading && <tr><td colSpan="7">Loading bookings...</td></tr>}
                {!isLoading && errorMessage && <tr><td colSpan="7">{errorMessage}</td></tr>}
                {!isLoading && !errorMessage && bookings.length === 0 && <tr><td colSpan="7">No bookings found.</td></tr>}
                {!isLoading && !errorMessage && bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="booking-id">{booking.id}</td>
                  <td>{booking.customer}</td>
                  <td>{booking.room}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td><span className={`status-badge ${booking.status.toLowerCase().replace('-', '-')}`}>{booking.status}</span></td>
                  <td className="booking-actions">
                    <button type="button" className="action-button update" onClick={() => updateStatus(booking.id)} disabled={booking.status === 'Cancelled'}>Update Status</button>
                    <button type="button" className="action-button cancel" onClick={() => cancelBooking(booking.id)} disabled={booking.status === 'Cancelled'}>Cancel Booking</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default BookingManagement
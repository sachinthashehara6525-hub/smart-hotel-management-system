import { useState } from 'react'

function BookingManagement() {
  const [bookings, setBookings] = useState([
    { id: 'BK-1001', customer: 'Ava Johnson', room: '101', checkIn: '2026-09-26', checkOut: '2026-09-29', status: 'Confirmed' },
    { id: 'BK-1002', customer: 'Liam Williams', room: '201', checkIn: '2026-09-27', checkOut: '2026-10-02', status: 'Checked-in' },
    { id: 'BK-1003', customer: 'Sophia Brown', room: '301', checkIn: '2026-09-28', checkOut: '2026-10-01', status: 'Confirmed' },
    { id: 'BK-1004', customer: 'Noah Davis', room: '202', checkIn: '2026-09-25', checkOut: '2026-09-27', status: 'Completed' },
  ])

  const statusSequence = ['Confirmed', 'Checked-in', 'Completed']

  function updateStatus(bookingId) {
    setBookings((currentBookings) => currentBookings.map((booking) => {
      if (booking.id !== bookingId || booking.status === 'Cancelled') return booking
      const currentStatusIndex = statusSequence.indexOf(booking.status)
      const nextStatus = statusSequence[(currentStatusIndex + 1) % statusSequence.length]
      return { ...booking, status: nextStatus }
    }))
  }

  function cancelBooking(bookingId) {
    setBookings((currentBookings) => currentBookings.map((booking) => (
      booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
    )))
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
              {bookings.map((booking) => (
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
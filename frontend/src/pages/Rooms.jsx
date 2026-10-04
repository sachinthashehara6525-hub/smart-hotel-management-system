import { useEffect, useState } from 'react'
import api from '../services/api'

function Rooms() {
  const [rooms, setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
        setErrorMessage('Unable to load rooms. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadRooms()
  }, [])

  return (
    <>
      <header className="page-header">
        <h1>Rooms</h1>
        <p>View room inventory, pricing, and current availability.</p>
      </header>
      <section className="table-card">
        <div className="table-heading">
          <h2>Room inventory</h2>
          <span>{rooms.length} rooms listed</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>Room Number</th><th>Room Type</th><th>Price</th><th>Status</th></tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan="4">Loading rooms...</td></tr>}
              {!isLoading && errorMessage && <tr><td colSpan="4">{errorMessage}</td></tr>}
              {!isLoading && !errorMessage && rooms.length === 0 && <tr><td colSpan="4">No rooms found.</td></tr>}
              {!isLoading && !errorMessage && rooms.map((room) => (
                <tr key={room.roomId ?? room.number}>
                  <td className="room-number">{room.number}</td>
                  <td>{room.type}</td>
                  <td>{room.price}</td>
                  <td><span className={`status-badge ${room.status.toLowerCase()}`}>{room.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Rooms
function Rooms() {
  const rooms = [
    { number: '101', type: 'Single', price: '$85 / night', status: 'Available' },
    { number: '102', type: 'Double', price: '$120 / night', status: 'Occupied' },
    { number: '201', type: 'Deluxe', price: '$180 / night', status: 'Available' },
    { number: '202', type: 'Suite', price: '$250 / night', status: 'Maintenance' },
    { number: '301', type: 'Double', price: '$120 / night', status: 'Occupied' },
    { number: '302', type: 'Deluxe', price: '$180 / night', status: 'Available' },
  ]

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
              {rooms.map((room) => (
                <tr key={room.number}>
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
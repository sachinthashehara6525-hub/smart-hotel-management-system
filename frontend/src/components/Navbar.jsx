import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <Link className="brand" to="/dashboard">Smart Hotel</Link>
      <span className="navbar-label">Management System</span>
      <span className="navbar-status"><i /> Operations online</span>
    </header>
  )
}

export default Navbar
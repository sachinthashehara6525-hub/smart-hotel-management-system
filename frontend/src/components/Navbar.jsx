import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand-group">
        <Link className="brand" to="/" aria-label="Aelorea home">Aelorea</Link>
        <span className="navbar-label">Hotel operations</span>
      </div>
      <span className="navbar-status"><i /> Operations online</span>
    </header>
  )
}

export default Navbar
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <Link className="brand" to="/" aria-label="Aelorea home">Aelorea</Link>
      <span className="navbar-status"><i /> Operations online</span>
    </header>
  )
}

export default Navbar
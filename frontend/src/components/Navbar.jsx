import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch {
      navigate('/login')
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-brand-group">
        <Link className="brand" to="/" aria-label="Aelorea home">Aelorea</Link>
        <span className="navbar-label">Hotel operations</span>
      </div>
      <div>
        <span className="navbar-status"><i /> Operations online</span>
        {user && <button type="button" onClick={handleLogout}>Sign out</button>}
      </div>
    </header>
  )
}

export default Navbar
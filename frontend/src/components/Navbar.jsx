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
        <Link className="brand" to="/" aria-label="Aelorea home">
          <span className="brand-mark" aria-hidden="true">✦</span>
          <span>Aelorea</span>
        </Link>
        <span className="navbar-label">Hotel operations</span>
      </div>
      <div className="navbar-actions">
        <span className="navbar-status"><i /> Operations online</span>
        {user && (
          <>
            <span className="navbar-user">
              <span className="navbar-avatar" aria-hidden="true">{user.email.charAt(0).toUpperCase()}</span>
              <span>{user.role}</span>
            </span>
            <button className="navbar-signout" type="button" onClick={handleLogout}>Sign out</button>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
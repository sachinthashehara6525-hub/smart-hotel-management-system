import { NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Home', path: '/', icon: '⌂' },
  { label: 'Dashboard', path: '/dashboard', icon: '▦' },
  { label: 'Rooms', path: '/rooms', icon: '▤' },
  { label: 'New Booking', path: '/booking', icon: '+' },
  { label: 'Customers', path: '/customers', icon: '♙' },
  { label: 'Booking Management', path: '/booking-management', icon: '◷' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            key={item.path}
            to={item.path}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
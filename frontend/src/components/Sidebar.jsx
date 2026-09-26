import { NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'New Booking', path: '/booking' },
  { label: 'Customers', path: '/customers' },
  { label: 'Booking Management', path: '/booking-management' },
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
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
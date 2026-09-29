import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import LandingPage from './pages/LandingPage'
import LandingAmenitiesPage from './pages/LandingAmenitiesPage'
import LandingContactPage from './pages/LandingContactPage'
import LandingGalleryPage from './pages/LandingGalleryPage'
import LandingRoomsPage from './pages/LandingRoomsPage'
import Booking from './pages/Booking'
import BookingManagement from './pages/BookingManagement'
import Customers from './pages/Customers'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Rooms from './pages/Rooms'
import Signup from './pages/Signup'

import './App.css'

function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC LANDING PAGE */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/hotel/rooms" element={<LandingRoomsPage />} />
        <Route path="/hotel/amenities" element={<LandingAmenitiesPage />} />
        <Route path="/hotel/gallery" element={<LandingGalleryPage />} />
        <Route path="/hotel/contact" element={<LandingContactPage />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* HOTEL ADMIN */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/customers" element={<Customers />} />
          <Route
            path="/booking-management"
            element={<BookingManagement />}
          />
        </Route>

        {/* INVALID URL */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App

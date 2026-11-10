import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hotelHero from '../assets/hotel-hero.jpg'
import api from '../services/api'
import './login.css'
import './signup.css'

function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setErrorMessage('')
    setSuccessMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    if (formData.password.length < 6 || formData.password.length > 128) {
      setErrorMessage('Password must be between 6 and 128 characters.')
      return
    }

    setIsLoading(true)
    try {
      await api.post('/auth/register', {
        email: formData.email,
        password: formData.password,
      })
      setSuccessMessage('Your guest account is ready. Taking you to sign in...')
      window.setTimeout(() => navigate('/login'), 900)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Unable to create your account.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page signup-page" style={{ '--login-background': `url(${hotelHero})` }}>
      <section className="auth-panel signup-card">
        <h1>Create your account</h1>
        <p>Join us as a guest and book your stay with ease.</p>
        <form className="auth-form signup-form" onSubmit={handleSubmit}>
          <label htmlFor="signup-email">Email</label>
          <input id="signup-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required />
          <label htmlFor="signup-password">Password</label>
          <input id="signup-password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="6 to 128 characters" autoComplete="new-password" required />
          <label htmlFor="signup-confirm-password">Confirm password</label>
          <input id="signup-confirm-password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Repeat your password" autoComplete="new-password" required />
          <button type="submit" disabled={isLoading}>{isLoading ? 'Creating account...' : 'Create guest account'}</button>
          {errorMessage && <p className="form-error signup-message signup-error" role="alert">{errorMessage}</p>}
          {successMessage && <p className="signup-message signup-success" role="status">{successMessage}</p>}
        </form>
        <p className="signup-login">Already have an account? <Link to="/login">Sign in</Link></p>
      </section>
    </div>
  )
}

export default Signup
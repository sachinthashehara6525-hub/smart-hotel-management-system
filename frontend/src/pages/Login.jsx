import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hotelHero from '../assets/hotel-hero.jpg'
import api from '../services/api'
import './login.css'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setErrorMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      })

      const user = response.data?.user
      if (user?.email && user?.role) {
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          role: user.role,
        }))
      }

      navigate('/dashboard')
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page" style={{ '--login-background': `url(${hotelHero})` }}>
      <section className="auth-panel">
        <h1>Welcome back</h1>
        <p>Sign in to manage your hotel.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input id="login-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
          <label htmlFor="login-password">Password</label>
          <input id="login-password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
          <button type="submit" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign In'}</button>
          {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
        </form>
        <Link className="auth-link" to="/signup">Create an account</Link>
      </section>
    </div>
  )
}

export default Login
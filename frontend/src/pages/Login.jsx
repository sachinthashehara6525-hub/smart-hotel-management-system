import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hotelHero from '../assets/hotel-hero.jpg'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import './login.css'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loginType, setLoginType] = useState('guest')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const { refreshUser } = useAuth()

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setErrorMessage('')
  }

  function handleLoginTypeChange(type) {
    setLoginType(type)
    setErrorMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      })

      const currentUser = await refreshUser()
      if (loginType === 'admin' && currentUser?.role !== 'admin') {
        setErrorMessage('This account does not have administrator access.')
        return
      }
      if (loginType === 'guest' && currentUser?.role !== 'guest') {
        setErrorMessage('Please use the Admin login option for this account.')
        return
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
        <p>{loginType === 'admin' ? 'Sign in to manage your hotel.' : 'Sign in to continue your guest experience.'}</p>
        <div className="login-type-switcher" role="group" aria-label="Choose login type">
          <button type="button" className={loginType === 'guest' ? 'is-selected' : ''} onClick={() => handleLoginTypeChange('guest')}>Guest Login</button>
          <button type="button" className={loginType === 'admin' ? 'is-selected' : ''} onClick={() => handleLoginTypeChange('admin')}>Admin Login</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input id="login-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
          <label htmlFor="login-password">Password</label>
          <input id="login-password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
          <button type="submit" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign In'}</button>
          {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
        </form>
        <Link className="signup-link" to="/signup">New guest? Create an account</Link>
      </section>
    </div>
  )
}

export default Login
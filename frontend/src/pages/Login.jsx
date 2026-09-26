import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <div className="auth-page">
      <section className="auth-panel">
        <h1>Welcome back</h1>
        <p>Sign in to manage your hotel.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input id="login-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
          <label htmlFor="login-password">Password</label>
          <input id="login-password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
          <button type="submit">Sign In</button>
        </form>
        <Link className="auth-link" to="/signup">Create an account</Link>
      </section>
    </div>
  )
}

export default Login
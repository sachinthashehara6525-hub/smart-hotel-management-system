import { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })

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
        <h1>Create account</h1>
        <p>Set up access to your hotel workspace.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="signup-name">Name</label>
          <input id="signup-name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your name" required />
          <label htmlFor="signup-email">Email</label>
          <input id="signup-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
          <label htmlFor="signup-password">Password</label>
          <input id="signup-password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required />
          <label htmlFor="signup-confirm-password">Confirm Password</label>
          <input id="signup-confirm-password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Repeat your password" required />
          <button type="submit">Sign Up</button>
        </form>
        <Link className="auth-link" to="/login">Back to sign in</Link>
      </section>
    </div>
  )
}

export default Signup
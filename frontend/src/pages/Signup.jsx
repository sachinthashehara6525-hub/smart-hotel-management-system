import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className="auth-page">
      <section className="auth-panel">
        <h1>Create account</h1>
        <p>Set up access to your hotel workspace.</p>
        <form className="auth-form">
          <label>Full name<input type="text" placeholder="Your name" /></label>
          <label>Email<input type="email" placeholder="you@example.com" /></label>
          <label>Password<input type="password" placeholder="Create a password" /></label>
          <button type="submit">Create account</button>
        </form>
        <Link className="auth-link" to="/login">Back to sign in</Link>
      </section>
    </div>
  )
}

export default Signup
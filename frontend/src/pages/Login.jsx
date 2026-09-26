import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="auth-page">
      <section className="auth-panel">
        <h1>Welcome back</h1>
        <p>Sign in to manage your hotel.</p>
        <form className="auth-form">
          <label>Email<input type="email" placeholder="you@example.com" /></label>
          <label>Password<input type="password" placeholder="Enter your password" /></label>
          <button type="submit">Sign in</button>
        </form>
        <Link className="auth-link" to="/signup">Create an account</Link>
      </section>
    </div>
  )
}

export default Login
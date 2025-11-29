import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('user') // 'user' or 'admin'
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp, user, userRole } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (userRole === 'admin') {
        navigate('/admin/dashboard', { replace: true })
      } else {
        navigate('/home', { replace: true })
      }
    }
  }, [user, userRole, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let result
      if (isSignUp) {
        result = await signUp(email, password, userType)
      } else {
        result = await signIn(email, password, userType)
      }

      if (result.error) {
        setError(result.error.message)
        setLoading(false)
      } else if (result.data?.user) {
        // The useEffect will handle navigation when user state updates
        // Just wait a moment for state to update
        setLoading(false)
      } else {
        setError('Login failed. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">{isSignUp ? 'Sign Up' : 'Login'}</h1>
        <p className="login-subtitle">
          {isSignUp
            ? 'Create your account to get started'
            : 'Welcome back! Please login to your account'}
        </p>

        {/* User Type Selection - Only show for login, not signup */}
        {!isSignUp && (
          <div className="user-type-selector">
            <button
              type="button"
              className={`user-type-btn ${userType === 'user' ? 'active' : ''}`}
              onClick={() => {
                setUserType('user')
                setError('')
              }}
            >
              Login as User
            </button>
            <button
              type="button"
              className={`user-type-btn ${userType === 'admin' ? 'active' : ''}`}
              onClick={() => {
                setUserType('admin')
                setError('')
              }}
            >
              Login as Admin
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : `Login as ${userType === 'admin' ? 'Admin' : 'User'}`}
          </button>
        </form>

        <div className="toggle-auth">
          <p>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
                if (isSignUp) {
                  setUserType('user') // Reset to user when switching to login
                }
              }}
              className="toggle-button"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login


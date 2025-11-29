import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        <h1 className="page-title">My Profile</h1>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <h2>{user?.email}</h2>
          </div>

          <div className="profile-info">
            <div className="info-item">
              <label>User ID:</label>
              <span>{user?.id}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{user?.email}</span>
            </div>
            <div className="info-item">
              <label>Account Created:</label>
              <span>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</span>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/orders" className="action-button">
              View Orders
            </Link>
            <button onClick={handleSignOut} className="signout-button">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Profile


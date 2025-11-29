import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'

function AdminDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="admin-dashboard-page">
      <Navbar />
      
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-card">
          <div className="admin-header">
            <h1>Admin Dashboard</h1>
            <span className="admin-badge">Admin</span>
          </div>
          
          <div className="user-info">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>User ID:</strong> {user?.id}
            </p>
          </div>

          <div className="admin-actions">
            <h2>Admin Actions</h2>
            <div className="action-buttons">
              <Link to="/admin/products/add" className="action-btn primary">
                Add Product
              </Link>
              <Link to="/admin/orders" className="action-btn primary">
                View Orders
              </Link>
              <Link to="/products" className="action-btn secondary">
                View Products
              </Link>
            </div>
          </div>

          <button onClick={handleSignOut} className="signout-button">
            Sign Out
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AdminDashboard


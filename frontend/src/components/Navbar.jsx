import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Navbar.css'

function Navbar() {
  const { user, userRole, signOut } = useAuth()
  const { getCartItemsCount } = useCart()
  const navigate = useNavigate()
  const cartCount = getCartItemsCount()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h2>E-Commerce</h2>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/products" className="navbar-link">Products</Link>
          
          {user ? (
            <>
              {userRole === 'admin' ? (
                // Admin Navigation
                <>
                  <Link to="/admin/dashboard" className="navbar-link admin-link">
                    Admin Dashboard
                  </Link>
                  <Link to="/admin/products/add" className="navbar-link">Add Product</Link>
                  <Link to="/admin/orders" className="navbar-link">Manage Orders</Link>
                </>
              ) : (
                // User Navigation
                <>
                  <Link to="/cart" className="navbar-link cart-link">
                    Cart
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                  </Link>
                  <Link to="/orders" className="navbar-link">My Orders</Link>
                  <Link to="/profile" className="navbar-link">Profile</Link>
                </>
              )}
              
              <button onClick={handleSignOut} className="navbar-button">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar


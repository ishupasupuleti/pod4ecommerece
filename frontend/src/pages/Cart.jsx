import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/formatCurrency'
import './Cart.css'

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const total = getCartTotal()

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Navbar />
        <div className="cart-container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/products" className="shop-button">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="cart-page">
      <Navbar />
      
      <div className="cart-container">
        <h1 className="page-title">Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <Link to={`/products/${item.id}`} className="cart-item-image">
                  <img 
                    src={item.image_url || 'https://via.placeholder.com/150'} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150'
                    }}
                  />
                </Link>

                <div className="cart-item-info">
                  <Link to={`/products/${item.id}`} className="cart-item-name">
                    {item.name}
                  </Link>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-price">{formatCurrency(item.price)}</p>
                </div>

                <div className="cart-item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  {formatCurrency(item.price * item.quantity)}
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>
            <button 
              onClick={clearCart}
              className="clear-cart-btn"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Cart


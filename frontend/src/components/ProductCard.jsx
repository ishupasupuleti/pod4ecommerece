import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/formatCurrency'
import './ProductCard.css'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (product.stock > 0) {
      addToCart(product, 1)
      // Show non-blocking notification
      const notification = document.createElement('div')
      notification.textContent = `${product.name} added to cart!`
      notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#28a745;color:white;padding:1rem 1.5rem;border-radius:8px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-weight:500;'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 2000)
    } else {
      const notification = document.createElement('div')
      notification.textContent = 'Product is out of stock'
      notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#dc3545;color:white;padding:1rem 1.5rem;border-radius:8px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-weight:500;'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 2000)
    }
  }

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-image">
        <img 
          src={product.image_url || 'https://via.placeholder.com/300'} 
          alt={product.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300'
          }}
        />
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          Add to Cart
        </button>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-footer">
          <span className="product-price">{formatCurrency(product.price)}</span>
          {product.stock > 0 ? (
            <span className="product-stock in-stock">In Stock</span>
          ) : (
            <span className="product-stock out-of-stock">Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard


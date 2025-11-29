import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useCart } from '../context/CartContext'
import { productService } from '../services/productService'
import { formatCurrency } from '../utils/formatCurrency'
import './ProductDetails.css'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id)
        if (data) {
          setProduct(data)
        } else {
          setError('Product not found')
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        setError(error.message || 'Product not found')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    } else {
      setError('Invalid product ID')
      setLoading(false)
    }
  }, [id])

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart(product, quantity)
      // Show non-blocking notification
      const notification = document.createElement('div')
      notification.textContent = 'Product added to cart!'
      notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#28a745;color:white;padding:1rem 1.5rem;border-radius:8px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-weight:500;'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    } else {
      const notification = document.createElement('div')
      notification.textContent = 'Product is out of stock'
      notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#dc3545;color:white;padding:1rem 1.5rem;border-radius:8px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-weight:500;'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    }
  }

  const handleBuyNow = () => {
    if (product && product.stock > 0) {
      addToCart(product, quantity)
      navigate('/cart')
    }
  }

  if (loading) {
    return (
      <div className="product-details-page">
        <Navbar />
        <Loader />
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-details-page">
        <Navbar />
        <div className="error-container">
          <p>{error || 'Product not found'}</p>
          <button onClick={() => navigate('/products')}>Back to Products</button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="product-details-page">
      <Navbar />
      
      <div className="product-details-container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="product-details-content">
          <div className="product-image-section">
            <img 
              src={product.image_url || 'https://via.placeholder.com/500'} 
              alt={product.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500'
              }}
            />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-category">{product.category}</p>
            <p className="product-price">{formatCurrency(product.price)}</p>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description || 'No description available'}</p>
            </div>

            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="stock-badge in-stock">
                  {product.stock} in stock
                </span>
              ) : (
                <span className="stock-badge out-of-stock">Out of stock</span>
              )}
            </div>

            {product.stock > 0 && (
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="product-actions">
              <button 
                onClick={handleAddToCart}
                className="add-cart-btn"
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="buy-now-btn"
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductDetails


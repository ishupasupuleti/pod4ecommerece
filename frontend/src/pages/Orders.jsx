import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'
import { orderService } from '../services/orderService'
import { formatCurrency } from '../utils/formatCurrency'
import './Orders.css'

function Orders() {
  const { id } = useParams()
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const orderData = await orderService.getOrderById(id)
          setOrder(orderData)
        } else {
          const ordersData = await orderService.getUserOrders(user.id)
          setOrders(ordersData)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchData()
    }
  }, [id, user])

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107'
      case 'processing':
        return '#17a2b8'
      case 'shipped':
        return '#007bff'
      case 'delivered':
        return '#28a745'
      case 'cancelled':
        return '#dc3545'
      default:
        return '#6c757d'
    }
  }

  if (loading) {
    return (
      <div className="orders-page">
        <Navbar />
        <Loader />
        <Footer />
      </div>
    )
  }

  if (id && order) {
    return (
      <div className="orders-page">
        <Navbar />
        <div className="orders-container">
          <Link to="/orders" className="back-link">← Back to Orders</Link>
          <h1 className="page-title">Order Details</h1>

          <div className="order-details-card">
            <div className="order-header">
              <div>
                <h2>Order #{order.id.slice(0, 8)}</h2>
                <p className="order-date">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <span 
                className="order-status"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.status.toUpperCase()}
              </span>
            </div>

            <div className="order-items-section">
              <h3>Order Items</h3>
              {order.order_items?.map(item => (
                <div key={item.id} className="order-item">
                  <img 
                    src={item.products?.image_url || 'https://via.placeholder.com/100'} 
                    alt={item.products?.name}
                    className="order-item-image"
                  />
                  <div className="order-item-info">
                    <h4>{item.products?.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {formatCurrency(item.price)}</p>
                  </div>
                  <div className="order-item-total">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.total_amount)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{formatCurrency(order.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="orders-page">
      <Navbar />
      
      <div className="orders-container">
        <h1 className="page-title">My Orders</h1>

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
            <Link to="/products" className="shop-button">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <Link 
                key={order.id} 
                to={`/orders/${order.id}`}
                className="order-card"
              >
                <div className="order-card-header">
                  <div>
                    <h3>Order #{order.id.slice(0, 8)}</h3>
                    <p className="order-date">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span 
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
                <div className="order-card-items">
                  {order.order_items?.slice(0, 3).map(item => (
                    <div key={item.id} className="order-card-item">
                      <img 
                        src={item.products?.image_url || 'https://via.placeholder.com/50'} 
                        alt={item.products?.name}
                      />
                      <span>{item.products?.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                  {order.order_items?.length > 3 && (
                    <p className="more-items">
                      +{order.order_items.length - 3} more items
                    </p>
                  )}
                </div>
                <div className="order-card-footer">
                  <span className="order-total">
                    Total: {formatCurrency(order.total_amount)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Orders


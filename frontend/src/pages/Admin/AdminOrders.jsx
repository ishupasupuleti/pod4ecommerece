import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Loader from '../../components/Loader'
import { orderService } from '../../services/orderService'
import { formatCurrency } from '../../utils/formatCurrency'
import './AdminPages.css'

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAllOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdating(orderId)
    try {
      await orderService.updateOrderStatus(orderId, newStatus)
      await fetchOrders()
      // Success - no blocking alert
    } catch (error) {
      console.error('Error updating order status:', error)
      // Show non-blocking error message
      const errorMsg = document.createElement('div')
      errorMsg.textContent = 'Failed to update order status'
      errorMsg.style.cssText = 'position:fixed;top:20px;right:20px;background:#dc3545;color:white;padding:1rem;border-radius:8px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.3);'
      document.body.appendChild(errorMsg)
      setTimeout(() => errorMsg.remove(), 3000)
    } finally {
      setUpdating(null)
    }
  }

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
      <div className="admin-page">
        <Navbar />
        <Loader />
        <Footer />
      </div>
    )
  }

  return (
    <div className="admin-page">
      <Navbar />
      
      <div className="admin-container">
        <h1 className="page-title">Manage Orders</h1>

        {orders.length === 0 ? (
          <div className="no-data">
            <p>No orders found</p>
          </div>
        ) : (
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <Link to={`/orders/${order.id}`} className="order-link">
                        #{order.id.slice(0, 8)}
                      </Link>
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>{order.order_items?.length || 0} items</td>
                    <td>{formatCurrency(order.total_amount)}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        disabled={updating === order.id}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default AdminOrders


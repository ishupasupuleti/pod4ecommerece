import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import AddProduct from './pages/Admin/AddProduct'
import EditProduct from './pages/Admin/EditProduct'
import AdminOrders from './pages/Admin/AdminOrders'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

// Public Route - Accessible to everyone (logged in or not)
function PublicRoute({ children }) {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return children
}

// User Route - Only accessible to authenticated users (not admins)
function UserRoute({ children }) {
  const { user, userRole, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // If admin tries to access user routes, redirect to admin dashboard
  if (userRole === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  return children
}

// Admin Route - Only accessible to authenticated admins
function AdminRoute({ children }) {
  const { user, userRole, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // If not admin, redirect based on user type
  if (userRole !== 'admin') {
    return <Navigate to="/home" replace />
  }

  return children
}

// Login Route - Redirect if already logged in
function LoginRoute({ children }) {
  const { user, userRole, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    )
  }

  // If already logged in, redirect to appropriate dashboard
  if (user) {
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />
    } else {
      return <Navigate to="/home" replace />
    }
  }

  return children
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* ============================================
                PUBLIC ROUTES (No authentication required)
                ============================================ */}
            <Route 
              path="/login" 
              element={
                <LoginRoute>
                  <Login />
                </LoginRoute>
              } 
            />
            <Route 
              path="/" 
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              } 
            />
            <Route 
              path="/home" 
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              } 
            />
            <Route 
              path="/products" 
              element={
                <PublicRoute>
                  <ProductList />
                </PublicRoute>
              } 
            />
            <Route 
              path="/products/:id" 
              element={
                <PublicRoute>
                  <ProductDetails />
                </PublicRoute>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <PublicRoute>
                  <Cart />
                </PublicRoute>
              } 
            />

            {/* ============================================
                USER ROUTES (Authenticated users only)
                ============================================ */}
            <Route
              path="/checkout"
              element={
                <UserRoute>
                  <Checkout />
                </UserRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <UserRoute>
                  <Orders />
                </UserRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <UserRoute>
                  <Orders />
                </UserRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <UserRoute>
                  <Profile />
                </UserRoute>
              }
            />

            {/* ============================================
                ADMIN ROUTES (Authenticated admins only)
                ============================================ */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/add"
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/edit/:id"
              element={
                <AdminRoute>
                  <EditProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App


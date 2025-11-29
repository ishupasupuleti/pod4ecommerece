import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Loader from '../../components/Loader'
import { productService } from '../../services/productService'
import './AdminPages.css'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image_url: ''
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await productService.getProductById(id)
        setFormData({
          name: product.name,
          description: product.description || '',
          price: product.price,
          category: product.category,
          stock: product.stock,
          image_url: product.image_url || ''
        })
      } catch (error) {
        console.error('Error fetching product:', error)
        setError('Failed to load product. Redirecting...')
        setTimeout(() => navigate('/admin/dashboard'), 2000)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setSaving(true)
      const fileName = `${Date.now()}-${file.name}`
      const imageUrl = await productService.uploadImage(file, fileName)
      setFormData({ ...formData, image_url: imageUrl })
    } catch (error) {
      console.error('Error uploading image:', error)
      setError(`Failed to upload image: ${error.message || 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Prevent double submission
    if (saving) return
    
    setError('')
    setSaving(true)

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category.trim(),
        stock: parseInt(formData.stock),
        image_url: formData.image_url.trim() || null
      }

      // Validate
      if (isNaN(productData.price) || productData.price <= 0) {
        setError('Price must be a positive number')
        setSaving(false)
        return
      }

      if (isNaN(productData.stock) || productData.stock < 0) {
        setError('Stock must be a non-negative number')
        setSaving(false)
        return
      }

      await productService.updateProduct(id, productData)
      // Navigate immediately
      navigate('/admin/dashboard', { replace: true })
    } catch (error) {
      console.error('Error updating product:', error)
      setError(error.message || 'Failed to update product. Please try again.')
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      await productService.deleteProduct(id)
      // Navigate immediately
      navigate('/admin/dashboard', { replace: true })
    } catch (error) {
      console.error('Error deleting product:', error)
      const errorMsg = document.createElement('div')
      errorMsg.textContent = 'Failed to delete product: ' + (error.message || 'Unknown error')
      errorMsg.style.cssText = 'position:fixed;top:20px;right:20px;background:#dc3545;color:white;padding:1rem;border-radius:8px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.3);'
      document.body.appendChild(errorMsg)
      setTimeout(() => errorMsg.remove(), 3000)
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
        <h1 className="page-title">Edit Product</h1>

        <form onSubmit={handleSubmit} className="admin-form">
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="edit-product-name">Product Name *</label>
            <input
              id="edit-product-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-product-description">Description *</label>
            <textarea
              id="edit-product-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Enter product description"
              required
              aria-required="true"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-product-price">Price *</label>
              <input
                id="edit-product-price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="0.00"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-product-category">Category *</label>
              <input
                id="edit-product-category"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Electronics, Clothing"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-product-stock">Stock *</label>
              <input
                id="edit-product-stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="0"
                required
                aria-required="true"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-product-image-url">Image URL</label>
            <input
              id="edit-product-image-url"
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="Enter image URL or upload an image below"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-product-image-upload">Upload Image</label>
            <input
              id="edit-product-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={saving}
              aria-label="Upload product image"
            />
            {formData.image_url && (
              <img 
                src={formData.image_url} 
                alt="Preview" 
                className="image-preview"
              />
            )}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={handleDelete}
              className="delete-btn"
            >
              Delete Product
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/admin/dashboard')}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={saving}>
              {saving ? 'Saving...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default EditProduct


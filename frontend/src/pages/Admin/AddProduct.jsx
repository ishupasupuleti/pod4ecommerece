import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { productService } from '../../services/productService'
import './AdminPages.css'

function AddProduct() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image_url: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('') // Clear error when user types
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploading(true)
      setError('')
      const fileName = `${Date.now()}-${file.name}`
      const imageUrl = await productService.uploadImage(file, fileName)
      setFormData({ ...formData, image_url: imageUrl })
    } catch (error) {
      console.error('Error uploading image:', error)
      setError(`Failed to upload image: ${error.message || 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Prevent double submission
    if (loading) return
    
    setError('')
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock) {
        setError('Please fill in all required fields')
        setLoading(false)
        return
      }

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category.trim(),
        stock: parseInt(formData.stock),
        image_url: formData.image_url.trim() || null
      }

      // Validate price and stock
      if (isNaN(productData.price) || productData.price <= 0) {
        setError('Price must be a positive number')
        setLoading(false)
        return
      }

      if (isNaN(productData.stock) || productData.stock < 0) {
        setError('Stock must be a non-negative number')
        setLoading(false)
        return
      }

      console.log('Submitting product data:', productData)
      const result = await productService.addProduct(productData)
      console.log('Product added successfully:', result)
      
      // Navigate immediately on success - don't wait for state updates
      navigate('/admin/dashboard', { replace: true })
      
    } catch (error) {
      console.error('Error adding product:', error)
      const errorMessage = error.message || error.toString() || 'Failed to add product. Please check your database connection and try again.'
      setError(errorMessage)
      setLoading(false)
    }
  }

  return (
    <div className="admin-page">
      <Navbar />
      
      <div className="admin-container">
        <h1 className="page-title">Add New Product</h1>

        <form onSubmit={handleSubmit} className="admin-form">
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="product-name">Product Name *</label>
            <input
              id="product-name"
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
            <label htmlFor="product-description">Description *</label>
            <textarea
              id="product-description"
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
              <label htmlFor="product-price">Price *</label>
              <input
                id="product-price"
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
              <label htmlFor="product-category">Category *</label>
              <input
                id="product-category"
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
              <label htmlFor="product-stock">Stock *</label>
              <input
                id="product-stock"
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
            <label htmlFor="product-image-url">Image URL</label>
            <input
              id="product-image-url"
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="Enter image URL or upload an image below"
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-image-upload">Upload Image</label>
            <input
              id="product-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={loading || uploading}
              aria-label="Upload product image"
            />
            {uploading && <p className="upload-status">Uploading image...</p>}
            {formData.image_url && (
              <img 
                src={formData.image_url} 
                alt="Product preview" 
                className="image-preview"
              />
            )}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/admin/dashboard')}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading || uploading}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default AddProduct


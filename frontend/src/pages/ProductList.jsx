import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import { productService } from '../services/productService'
import './ProductList.css'

function ProductList() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          productService.getCategories()
        ])
        setProducts(productsData || [])
        setCategories(categoriesData || [])
      } catch (error) {
        console.error('Error fetching data:', error)
        setProducts([])
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter products when category or search changes
  useEffect(() => {
    // Skip if initial load hasn't completed
    if (loading && products.length === 0 && categories.length === 0) {
      return
    }

    const filterProducts = async () => {
      setLoading(true)
      try {
        let filteredProducts

        if (searchQuery && searchQuery.trim()) {
          filteredProducts = await productService.searchProducts(searchQuery.trim())
        } else if (selectedCategory === 'all') {
          filteredProducts = await productService.getAllProducts()
        } else {
          filteredProducts = await productService.getProductsByCategory(selectedCategory)
        }

        setProducts(filteredProducts || [])
      } catch (error) {
        console.error('Error filtering products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    // Debounce search query
    const timeoutId = setTimeout(() => {
      filterProducts()
    }, searchQuery ? 300 : 0)

    return () => clearTimeout(timeoutId)
  }, [selectedCategory, searchQuery])

  return (
    <div className="product-list-page">
      <Navbar />
      
      <div className="product-list-container">
        <h1 className="page-title">All Products</h1>

        {/* Search and Filter */}
        <div className="filters-section">
          <div className="search-box">
            <label htmlFor="product-search" className="sr-only">Search products</label>
            <input
              id="product-search"
              type="text"
              name="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Search products"
            />
          </div>

          <div className="category-filter">
            <button
              className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <Loader />
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products found</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default ProductList


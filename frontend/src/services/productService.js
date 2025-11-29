import { supabase } from './supabaseClient'

export const productService = {
  // Get all products
  async getAllProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase query error:', error)
        // If table doesn't exist, return empty array instead of throwing
        if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
          console.warn('Products table does not exist. Please run database/schema.sql first.')
          return []
        }
        throw new Error(error.message || 'Failed to fetch products')
      }
      
      return data || []
    } catch (error) {
      console.error('Error in getAllProducts:', error)
      // Return empty array on error so app doesn't crash
      return []
    }
  },

  // Get product by ID
  async getProductById(id) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        console.error('Error fetching product:', error)
        throw new Error(error.message || 'Product not found')
      }
      return data
    } catch (error) {
      console.error('Error in getProductById:', error)
      throw error
    }
  },

  // Search products
  async searchProducts(query) {
    try {
      if (!query || query.trim() === '') {
        return await this.getAllProducts()
      }
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error searching products:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error in searchProducts:', error)
      return []
    }
  },

  // Get products by category
  async getProductsByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching products by category:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error in getProductsByCategory:', error)
      return []
    }
  },

  // Get all categories
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('category')
      
      if (error) {
        console.error('Error fetching categories:', error)
        return []
      }
      
      if (!data || data.length === 0) {
        return []
      }
      
      // Get unique categories
      const categories = [...new Set(data.map(item => item.category).filter(Boolean))]
      return categories
    } catch (error) {
      console.error('Error in getCategories:', error)
      return []
    }
  },

  // Admin: Add product
  async addProduct(product) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single()
      
      if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message || 'Failed to add product to database')
      }
      
      if (!data) {
        throw new Error('No data returned from database')
      }
      
      return data
    } catch (error) {
      console.error('Error in addProduct:', error)
      throw error
    }
  },

  // Admin: Update product
  async updateProduct(id, updates) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) {
        console.error('Error updating product:', error)
        throw new Error(error.message || 'Failed to update product')
      }
      
      if (!data) {
        throw new Error('Product not found or update failed')
      }
      
      return data
    } catch (error) {
      console.error('Error in updateProduct:', error)
      throw error
    }
  },

  // Admin: Delete product
  async deleteProduct(id) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Error deleting product:', error)
        throw new Error(error.message || 'Failed to delete product')
      }
    } catch (error) {
      console.error('Error in deleteProduct:', error)
      throw error
    }
  },

  // Upload image to Supabase Storage
  async uploadImage(file, fileName) {
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) throw error
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)
    
    return publicUrl
  }
}


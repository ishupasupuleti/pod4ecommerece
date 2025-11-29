import { supabase } from './supabaseClient'

export const orderService = {
  // Create order
  async createOrder(orderData) {
    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: orderData.userId,
          total_amount: orderData.totalAmount,
          status: 'pending'
        }])
        .select()
        .single()
      
      if (orderError) {
        console.error('Error creating order:', orderError)
        throw new Error(orderError.message || 'Failed to create order')
      }

      if (!order) {
        throw new Error('Order was not created')
      }

      // Insert order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)
      
      if (itemsError) {
        console.error('Error creating order items:', itemsError)
        throw new Error(itemsError.message || 'Failed to create order items')
      }

      return order
    } catch (error) {
      console.error('Error in createOrder:', error)
      throw error
    }
  },

  // Get user orders
  async getUserOrders(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (
            id,
            name,
            image_url
          )
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get order by ID
  async getOrderById(orderId) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (
            id,
            name,
            image_url,
            price
          )
        )
      `)
      .eq('id', orderId)
      .single()
    
    if (error) throw error
    return data
  },

  // Admin: Get all orders
  async getAllOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (
            id,
            name,
            image_url
          )
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Admin: Update order status
  async updateOrderStatus(orderId, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}


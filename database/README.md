# Database Setup Instructions

## Step 1: Run the Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire contents of `schema.sql`
4. Click **Run** to execute the script

This will create:
- `products` table
- `orders` table
- `order_items` table
- Row Level Security (RLS) policies
- Storage bucket for product images
- Indexes for better performance

## Step 2: Add Mock Data (Optional but Recommended)

1. In the same SQL Editor
2. Copy and paste the entire contents of `mock_data.sql`
3. Click **Run** to insert sample products

This will add 30 sample products across different categories:
- Electronics (5 products)
- Clothing (5 products)
- Home & Kitchen (5 products)
- Books (5 products)
- Sports & Outdoors (5 products)
- Beauty & Personal Care (5 products)

## Step 3: Verify Data

Run this query to verify products were inserted:

```sql
SELECT COUNT(*) as total_products FROM products;
SELECT category, COUNT(*) as count FROM products GROUP BY category;
```

## Step 4: Set Up Admin User

1. Go to Supabase Dashboard → Authentication → Users
2. Find or create the user you want to make admin
3. Click "Edit" and go to "User Metadata"
4. Add: `{ "role": "admin" }`
5. Save

## Troubleshooting

### If products don't show up:
- Check RLS policies are enabled
- Verify the `products` table exists
- Check browser console for errors
- Verify your Supabase credentials in `.env` file

### If you can't add products as admin:
- Verify user metadata has `role: 'admin'`
- Check RLS policies allow admin inserts
- Check browser console for specific error messages

### If images don't load:
- Verify `product-images` storage bucket exists
- Check bucket is set to public
- Verify image URLs are accessible


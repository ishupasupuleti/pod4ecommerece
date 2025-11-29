# Verification Checklist

## ✅ Step 1: Database Schema (DONE)
You've successfully run the schema.sql. Now verify:

### Check Tables:
Run this in SQL Editor:
```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('products', 'orders', 'order_items');
```

Expected: Should return 3 rows (products, orders, order_items)

---

## ✅ Step 2: Storage Bucket (VERIFY)

### Option A: Check via Dashboard
1. Go to **Storage** in left sidebar
2. You should see `product-images` bucket
3. It should show as **Public**

### Option B: Check via SQL
Run this in SQL Editor:
```sql
SELECT * FROM storage.buckets WHERE id = 'product-images';
```

Expected: Should return 1 row with the bucket details

### Check Storage Policies:
Run this:
```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
AND policyname LIKE '%product-images%' OR policyname LIKE '%Admin%';
```

Expected: Should return 4 policies (SELECT, INSERT, UPDATE, DELETE)

---

## ✅ Step 3: Add Mock Data (DO THIS NOW)

Run this SQL to add 30 sample products:

```sql
-- Insert Mock Products
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
('iPhone 15 Pro', 'Latest iPhone with A17 Pro chip, 48MP camera, and titanium design.', 999.99, 'Electronics', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', 50),
('Samsung Galaxy S24', 'Flagship Android phone with AI features, 200MP camera, and 120Hz display.', 899.99, 'Electronics', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500', 45),
('MacBook Pro 16"', 'Powerful laptop with M3 Pro chip, 16-inch Liquid Retina display, and up to 22 hours battery life.', 2499.99, 'Electronics', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500', 30),
('Sony WH-1000XM5', 'Premium noise-cancelling headphones with 30-hour battery, LDAC support, and exceptional sound quality.', 399.99, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 75),
('iPad Air', 'Versatile tablet with M2 chip, 10.9-inch display, and Apple Pencil support.', 599.99, 'Electronics', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500', 60),
('Classic White T-Shirt', '100% cotton premium t-shirt. Comfortable fit, breathable fabric.', 29.99, 'Clothing', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 200),
('Denim Jeans', 'Classic blue denim jeans with stretch comfort. Durable fabric, modern fit.', 79.99, 'Clothing', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', 150),
('Leather Jacket', 'Genuine leather jacket with quilted lining. Stylish design, perfect for cool weather.', 299.99, 'Clothing', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', 40),
('Running Shoes', 'Lightweight running shoes with cushioned sole and breathable mesh upper.', 129.99, 'Clothing', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 100),
('Winter Coat', 'Warm winter coat with down insulation. Waterproof exterior, perfect for cold weather.', 199.99, 'Clothing', 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500', 80),
('Coffee Maker', 'Programmable coffee maker with 12-cup capacity. Auto shut-off, reusable filter.', 89.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500', 60),
('Air Fryer', 'Large capacity air fryer with digital display. Healthy cooking with 80% less oil.', 149.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?w=500', 45),
('Stand Mixer', 'Professional stand mixer with 5.5-quart bowl. Multiple attachments included.', 349.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500', 25),
('Bedding Set', 'Luxury cotton bedding set with pillowcases and duvet cover. Soft, breathable.', 79.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500', 90),
('Dining Table Set', 'Modern dining table with 4 chairs. Solid wood construction, elegant design.', 599.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', 15),
('The Great Gatsby', 'Classic American novel by F. Scott Fitzgerald. Set in the Jazz Age.', 12.99, 'Books', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 500),
('To Kill a Mockingbird', 'Pulitzer Prize-winning novel by Harper Lee. A timeless story of justice.', 14.99, 'Books', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 450),
('1984', 'Dystopian novel by George Orwell. A powerful warning about totalitarianism.', 13.99, 'Books', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 400),
('Pride and Prejudice', 'Romantic novel by Jane Austen. A classic tale of love, class, and social expectations.', 11.99, 'Books', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 350),
('The Catcher in the Rye', 'Coming-of-age novel by J.D. Salinger. A controversial and influential work.', 13.49, 'Books', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 300),
('Yoga Mat', 'Premium non-slip yoga mat with carrying strap. Eco-friendly material.', 39.99, 'Sports & Outdoors', 'https://images.unsplash.com/photo-1601925260368-ae2f83d5ab7d?w=500', 120),
('Dumbbell Set', 'Adjustable dumbbell set with weight range 5-50 lbs. Space-saving design.', 199.99, 'Sports & Outdoors', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', 50),
('Tennis Racket', 'Professional tennis racket with carbon fiber frame. Lightweight, powerful.', 149.99, 'Sports & Outdoors', 'https://images.unsplash.com/photo-1622163642998-8bd907df3a0e?w=500', 70),
('Camping Tent', '4-person camping tent with rainfly. Easy setup, waterproof.', 179.99, 'Sports & Outdoors', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500', 40),
('Bicycle', 'Mountain bike with 21-speed gears and front suspension. Durable frame.', 499.99, 'Sports & Outdoors', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', 20),
('Skincare Set', 'Complete skincare routine with cleanser, toner, serum, and moisturizer.', 89.99, 'Beauty & Personal Care', 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500', 100),
('Perfume Collection', 'Luxury fragrance set with 3 different scents. Long-lasting, elegant packaging.', 129.99, 'Beauty & Personal Care', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500', 80),
('Hair Dryer', 'Professional hair dryer with ionic technology. Fast drying, reduces frizz.', 79.99, 'Beauty & Personal Care', 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500', 60),
('Makeup Brush Set', 'Premium makeup brush set with 12 brushes. Soft synthetic bristles.', 49.99, 'Beauty & Personal Care', 'https://images.unsplash.com/photo-1583241805004-4c4e3c3269b5?w=500', 150),
('Face Mask Set', 'Sheet mask set with 10 different varieties. Hydrating, brightening, and anti-aging.', 24.99, 'Beauty & Personal Care', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500', 200);
```

Verify products were added:
```sql
SELECT COUNT(*) as total_products FROM products;
SELECT category, COUNT(*) as count FROM products GROUP BY category;
```

Expected: Should return 30 products across 6 categories

---

## ✅ Step 4: Set Up Admin User

1. Go to **Authentication** → **Users**
2. Find your admin user (or create one)
3. Click **"Edit"** on the user
4. Go to **"User Metadata"** section
5. Add this JSON:
```json
{
  "role": "admin"
}
```
6. Click **"Save"**

---

## ✅ Step 5: Test the Application

1. **Start your servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. **Test as regular user:**
   - Visit `http://localhost:3000`
   - Should see Home page with products
   - Browse products, add to cart
   - Sign up/Login to checkout

3. **Test as admin:**
   - Login as admin user
   - Should redirect to `/admin/dashboard`
   - Try adding a product
   - Try uploading an image
   - Check orders management

---

## Quick Verification Queries

Run these to verify everything:

```sql
-- 1. Check products table
SELECT COUNT(*) FROM products;

-- 2. Check storage bucket
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- 3. Check storage policies
SELECT policyname FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects';

-- 4. Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('products', 'orders', 'order_items');
```

---

## If Something Doesn't Work

1. **No products showing:**
   - Run the mock_data.sql INSERT statement above
   - Check browser console for errors

2. **Can't upload images:**
   - Verify bucket exists and is public
   - Check user is admin (metadata has role: 'admin')
   - Verify storage policies exist

3. **Can't add products as admin:**
   - Verify user metadata has `role: 'admin'`
   - Check RLS policies are correct
   - Check browser console for specific errors


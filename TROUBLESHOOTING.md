# Troubleshooting Guide

## Common Errors and Solutions

### 1. 404 Error When Fetching Products

**Error:** `Failed to load resource: the server responded with a status of 404`

**Solution:**
1. Make sure you've run `database/schema.sql` in Supabase SQL Editor
2. Verify the `products` table exists:
   ```sql
   SELECT * FROM products LIMIT 1;
   ```
3. Check RLS policies are set correctly
4. If table doesn't exist, run the schema.sql script again

### 2. "Error fetching products: Object"

**Error:** Console shows "Error fetching products: Object"

**Solution:**
- The error handling has been improved to show detailed error messages
- Check browser console for the actual error message
- Most common causes:
  - Products table doesn't exist → Run `database/schema.sql`
  - RLS policies blocking access → Check RLS policies in Supabase
  - Network error → Check Supabase URL and keys in `.env`

### 3. Form Field Missing ID/Name Warning

**Error:** "A form field element should have an id or name attribute"

**Solution:**
- All form fields now have proper `id` and `name` attributes
- If you see this warning, refresh the page
- All inputs in AddProduct and EditProduct forms are now properly labeled

### 4. Products Not Showing

**Possible Causes:**
1. **Database not set up:**
   - Run `database/schema.sql` first
   - Then run `database/mock_data.sql` to add sample products

2. **RLS Policies:**
   - Products table should have a policy allowing SELECT for everyone
   - Check in Supabase Dashboard → Authentication → Policies

3. **Empty Database:**
   - Run `database/mock_data.sql` to add 30 sample products
   - Or add products manually through admin panel

### 5. Admin Can't Add Products

**Possible Causes:**
1. **User not set as admin:**
   - Go to Supabase → Authentication → Users
   - Edit user → User Metadata → Add `{ "role": "admin" }`

2. **RLS Policy Issue:**
   - Check that admin INSERT policy exists
   - Policy should check for `raw_user_meta_data->>'role' = 'admin'`

3. **Service Role Key:**
   - Make sure backend `.env` has correct `SUPABASE_SERVICE_ROLE_KEY`

### 6. Images Not Loading

**Solution:**
1. Check storage bucket exists:
   - Supabase Dashboard → Storage
   - Should see `product-images` bucket
   - If not, run the storage creation part of `schema.sql`

2. Check bucket is public:
   - Storage bucket settings → Public: Yes

3. Verify image URLs:
   - Check if URLs are valid
   - Test image URLs in browser

### 7. Cart Not Working

**Solution:**
- Cart uses localStorage, so it should work offline
- Check browser console for errors
- Clear localStorage if cart seems corrupted:
  ```javascript
  localStorage.removeItem('cart')
  ```

### 8. Login Not Redirecting

**Solution:**
- Check browser console for errors
- Verify Supabase credentials in `.env`
- Check network tab for failed requests
- Ensure user metadata is set correctly for admin users

## Database Setup Checklist

- [ ] Run `database/schema.sql` in Supabase SQL Editor
- [ ] Run `database/mock_data.sql` to add sample products
- [ ] Verify `products` table exists and has data
- [ ] Verify `orders` table exists
- [ ] Verify `order_items` table exists
- [ ] Check RLS policies are enabled
- [ ] Verify storage bucket `product-images` exists and is public

## Environment Variables Checklist

**Frontend (`frontend/.env`):**
- [ ] `VITE_SUPABASE_URL` is set
- [ ] `VITE_SUPABASE_ANON_KEY` is set

**Backend (`backend/.env`):**
- [ ] `SUPABASE_URL` is set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set
- [ ] `PORT` is set (default: 5000)

## Testing Checklist

1. **Home Page:**
   - [ ] Loads without errors
   - [ ] Shows featured products (if database has products)
   - [ ] Navigation works

2. **Products Page:**
   - [ ] Shows all products
   - [ ] Search works
   - [ ] Category filter works

3. **Product Details:**
   - [ ] Product information displays
   - [ ] Add to cart works
   - [ ] Buy now works

4. **Cart:**
   - [ ] Items appear in cart
   - [ ] Quantity can be updated
   - [ ] Items can be removed

5. **Checkout (requires login):**
   - [ ] Form validates correctly
   - [ ] Order is created successfully
   - [ ] Redirects to order confirmation

6. **Admin Functions:**
   - [ ] Can login as admin
   - [ ] Can add products
   - [ ] Can edit products
   - [ ] Can delete products
   - [ ] Can view all orders
   - [ ] Can update order status

## Quick Fixes

### Reset Everything:
1. Clear browser localStorage
2. Clear browser cache
3. Restart frontend and backend servers
4. Verify database tables exist
5. Re-run mock_data.sql if needed

### Check Database Connection:
```sql
-- Test if products table exists
SELECT COUNT(*) FROM products;

-- Test if you can read products
SELECT * FROM products LIMIT 5;

-- Test RLS policies
SET ROLE authenticated;
SELECT * FROM products LIMIT 5;
```

## Getting Help

If issues persist:
1. Check browser console for specific error messages
2. Check Supabase logs in dashboard
3. Verify all environment variables are correct
4. Ensure database schema is up to date
5. Check network tab for failed API requests


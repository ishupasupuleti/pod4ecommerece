# Supabase Storage Setup Guide

## Complete Guide to Set Up Image Upload Storage

### Method 1: Using Supabase Dashboard (Recommended - Easier)

#### Step 1: Create Storage Bucket

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"** or **"Create bucket"** button
4. Fill in the bucket details:
   - **Name**: `product-images` (must match exactly)
   - **Public bucket**: ✅ **Check this box** (important!)
   - **File size limit**: 5 MB (or your preferred limit)
   - **Allowed MIME types**: 
     - `image/jpeg`
     - `image/png`
     - `image/gif`
     - `image/webp`
5. Click **"Create bucket"**

#### Step 2: Set Up Storage Policies

1. After creating the bucket, click on **"product-images"** bucket
2. Go to the **"Policies"** tab
3. Click **"New Policy"**

**Policy 1: Public Read (Anyone can view images)**
- Policy name: `Public Access`
- Allowed operation: `SELECT`
- Policy definition:
```sql
bucket_id = 'product-images'
```
- Click **"Save policy"**

**Policy 2: Admin Upload (Only admins can upload)**
- Policy name: `Admin Upload`
- Allowed operation: `INSERT`
- Policy definition:
```sql
bucket_id = 'product-images' AND
auth.role() = 'authenticated' AND
(auth.jwt() ->> 'user_metadata' ->> 'role') = 'admin'
```
- Click **"Save policy"**

**Policy 3: Admin Update**
- Policy name: `Admin Update`
- Allowed operation: `UPDATE`
- Policy definition:
```sql
bucket_id = 'product-images' AND
auth.role() = 'authenticated' AND
(auth.jwt() ->> 'user_metadata' ->> 'role') = 'admin'
```
- Click **"Save policy"**

**Policy 4: Admin Delete**
- Policy name: `Admin Delete`
- Allowed operation: `DELETE`
- Policy definition:
```sql
bucket_id = 'product-images' AND
auth.role() = 'authenticated' AND
(auth.jwt() ->> 'user_metadata' ->> 'role') = 'admin'
```
- Click **"Save policy"**

---

### Method 2: Using SQL (Alternative)

If you prefer using SQL, run the script in `database/storage_setup.sql`:

1. Go to Supabase Dashboard → **SQL Editor**
2. Copy and paste the entire contents of `database/storage_setup.sql`
3. Click **"Run"**

---

## Verify Setup

### Check 1: Bucket Exists
1. Go to **Storage** → You should see `product-images` bucket
2. It should show as **Public**

### Check 2: Policies Are Set
1. Click on `product-images` bucket
2. Go to **"Policies"** tab
3. You should see 4 policies:
   - Public Access (SELECT)
   - Admin Upload (INSERT)
   - Admin Update (UPDATE)
   - Admin Delete (DELETE)

### Check 3: Test Upload (Optional)
1. As an admin user, try uploading an image through the Add Product form
2. Check the bucket - you should see the uploaded file
3. The image URL should be accessible publicly

---

## Troubleshooting

### Issue: "Bucket not found" error
**Solution:**
- Make sure bucket name is exactly `product-images` (case-sensitive)
- Check if bucket exists in Storage dashboard
- If not, create it using Method 1 above

### Issue: "Permission denied" when uploading
**Solution:**
1. Verify user is logged in as admin
2. Check user metadata has `role: 'admin'`
3. Verify INSERT policy exists and is correct
4. Check browser console for specific error

### Issue: Images not displaying
**Solution:**
1. Verify bucket is set to **Public**
2. Check the image URL is correct
3. Test the URL directly in browser
4. Verify SELECT policy exists

### Issue: "File too large" error
**Solution:**
- Increase file size limit in bucket settings
- Or compress images before uploading
- Default limit in setup is 5MB

---

## Quick SQL Check

Run this to verify everything is set up:

```sql
-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- Check storage policies
SELECT * FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
AND policyname LIKE '%product-images%' OR policyname LIKE '%Admin%';
```

---

## Important Notes

1. **Bucket name must be exactly**: `product-images` (case-sensitive)
2. **Bucket must be Public**: This allows images to be viewed by anyone
3. **Admin role required**: Only users with `role: 'admin'` in metadata can upload
4. **File size limit**: Default is 5MB, adjust as needed
5. **Allowed formats**: JPEG, PNG, GIF, WebP

---

## After Setup

Once the bucket is created and policies are set:

1. Restart your frontend server (if running)
2. Try uploading an image as admin
3. The image should upload and display correctly
4. Image URLs will be in format: `https://[project].supabase.co/storage/v1/object/public/product-images/[filename]`


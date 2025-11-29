-- Supabase Storage Setup for Product Images
-- Run this SQL in your Supabase SQL Editor

-- Step 1: Create the Storage Bucket (if it doesn't exist)
-- Note: You can also create this via the Supabase Dashboard UI

-- Insert bucket into storage.buckets table
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,  -- Public bucket (anyone can view)
  5242880,  -- 5MB file size limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']  -- Allowed image types
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Create Storage Policies

-- Policy 1: Anyone can view/download images (Public Read)
CREATE POLICY "Public Access - Anyone can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Policy 2: Only authenticated admins can upload images
CREATE POLICY "Admin Upload - Only admins can upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Policy 3: Only authenticated admins can update images
CREATE POLICY "Admin Update - Only admins can update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Policy 4: Only authenticated admins can delete images
CREATE POLICY "Admin Delete - Only admins can delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Verify the bucket was created
SELECT * FROM storage.buckets WHERE id = 'product-images';


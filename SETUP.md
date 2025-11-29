# Setup Guide

## Complete Setup Instructions

### 1. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. **First, run `database/schema.sql`** to create all tables, policies, and storage bucket
4. **Then, run `database/mock_data.sql`** to insert 30 sample products for testing
5. This will create:
   - `products` table (with 30 sample products)
   - `orders` table
   - `order_items` table
   - Row Level Security (RLS) policies
   - Storage bucket for product images

### 2. Storage Setup (IMPORTANT for Image Uploads)

**Option A: Using Dashboard (Recommended)**
1. Go to Supabase Dashboard → **Storage**
2. Click **"New bucket"** or **"Create bucket"**
3. Set:
   - **Name**: `product-images` (exact name, case-sensitive)
   - **Public bucket**: ✅ **Check this** (required!)
   - **File size limit**: 5 MB (or your preference)
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `image/gif`, `image/webp`
4. Click **"Create bucket"**
5. Go to bucket → **"Policies"** tab → Create policies (see `STORAGE_SETUP.md` for details)

**Option B: Using SQL**
1. Run `database/storage_setup.sql` in SQL Editor
2. This creates the bucket and all necessary policies

**See `STORAGE_SETUP.md` for detailed step-by-step instructions.**

### 3. Setting Up Admin Users

To make a user an admin:

1. Go to Supabase Dashboard → Authentication → Users
2. Find the user you want to make admin
3. Click "Edit" and go to "User Metadata"
4. Add: `{ "role": "admin" }`
5. Save

Alternatively, you can update the admin emails list in `frontend/src/context/AuthContext.jsx`:

```javascript
const adminEmails = [
  'admin@example.com',
  'your-admin-email@domain.com',
]
```

### 4. Environment Variables

Make sure both `.env` files are configured:

**Frontend** (`frontend/.env`):
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Backend** (`backend/.env`):
```
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 5. Running the Application

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```

### 6. Testing the Application

1. Open `http://localhost:3000` in your browser
2. **You should see the Home page** (not login page) - this is the root route
3. Browse products (you should see 30 sample products)
4. Sign up/Login as a regular user to checkout and place orders
5. Sign out and sign in as admin (after setting admin role)
6. Access admin dashboard to add/edit products and manage orders

## Application Workflow

### User Flow:
```
Home (/) → Products → Product Details → Cart → Checkout → Orders → Profile
```

### Admin Flow:
```
Login → Admin Dashboard → Add/Edit Products → Manage Orders
```

**Note:** The root route (`/`) now shows the Home page, allowing users to browse products without logging in. Login is only required for checkout and viewing orders.

## Troubleshooting

1. **Database errors**: Make sure you've run the schema.sql script
2. **Storage errors**: Verify the `product-images` bucket exists and is public
3. **RLS errors**: Check that RLS policies are created correctly
4. **Admin access denied**: Verify user metadata has `role: 'admin'`


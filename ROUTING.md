# Routing Structure Documentation

## Route Categories

### 1. Public Routes (No Authentication Required)
These routes are accessible to everyone, whether logged in or not.

- `/` - Redirects to `/login`
- `/login` - Login/Sign Up page (redirects if already logged in)
- `/home` - Homepage with featured products
- `/products` - Product listing page
- `/products/:id` - Product details page
- `/cart` - Shopping cart (can view without login, but checkout requires login)

### 2. User Routes (Authenticated Users Only)
These routes are only accessible to logged-in users (not admins).

- `/checkout` - Checkout page
- `/orders` - User's order history
- `/orders/:id` - Order details
- `/profile` - User profile page

**Access Control:**
- If not logged in → Redirects to `/login`
- If admin tries to access → Redirects to `/admin/dashboard`

### 3. Admin Routes (Authenticated Admins Only)
These routes are only accessible to logged-in admins.

- `/admin/dashboard` - Admin dashboard
- `/admin/products/add` - Add new product
- `/admin/products/edit/:id` - Edit product
- `/admin/orders` - Manage all orders

**Access Control:**
- If not logged in → Redirects to `/login`
- If regular user tries to access → Redirects to `/home`

## Route Guards

### `PublicRoute`
- No authentication required
- Accessible to everyone

### `UserRoute`
- Requires authentication
- Blocks admins (redirects to admin dashboard)
- Blocks unauthenticated users (redirects to login)

### `AdminRoute`
- Requires admin authentication
- Blocks regular users (redirects to home)
- Blocks unauthenticated users (redirects to login)

### `LoginRoute`
- Blocks access if already logged in
- Redirects admins to `/admin/dashboard`
- Redirects users to `/home`

## User Workflow

1. **Unauthenticated User:**
   - Can browse: Home, Products, Product Details, Cart
   - Must login to: Checkout, View Orders, Profile

2. **Authenticated User:**
   - Can access: All public routes + Checkout, Orders, Profile
   - Cannot access: Admin routes (redirected to home)

3. **Authenticated Admin:**
   - Can access: All public routes + All admin routes
   - Cannot access: User-specific routes (redirected to admin dashboard)
   - Can manage: Products, Orders

## Navigation Flow

### User Login Flow:
```
Login → Home → Products → Product Details → Cart → Checkout → Orders → Profile
```

### Admin Login Flow:
```
Login → Admin Dashboard → Add/Edit Products → Manage Orders
```

## Redirect Behavior

- **Root (`/`)**: Shows Home page (allows browsing without login)
- **Already logged in**: Login page redirects based on role
  - Admin → `/admin/dashboard`
  - User → `/home`
- **Unauthorized access**: Redirects to appropriate page
  - User accessing admin route → `/home`
  - Admin accessing user route → `/admin/dashboard`
  - Unauthenticated accessing protected route → `/login`

## Route Protection Summary

| Route | Public | User | Admin |
|-------|--------|------|-------|
| `/login` | ✅ | ✅ (redirects) | ✅ (redirects) |
| `/home` | ✅ | ✅ | ✅ |
| `/products` | ✅ | ✅ | ✅ |
| `/products/:id` | ✅ | ✅ | ✅ |
| `/cart` | ✅ | ✅ | ✅ |
| `/checkout` | ❌ | ✅ | ❌ (redirects) |
| `/orders` | ❌ | ✅ | ❌ (redirects) |
| `/profile` | ❌ | ✅ | ❌ (redirects) |
| `/admin/*` | ❌ | ❌ (redirects) | ✅ |


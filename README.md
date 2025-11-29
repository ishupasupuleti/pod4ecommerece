# Ecommerce Application with Supabase Authentication

A full-stack ecommerce application with React.js frontend, Node.js backend, and Supabase authentication.

## Project Structure

```
ecommerce/
├── frontend/          # React.js frontend application
├── backend/           # Node.js/Express backend server
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase project (create one at https://supabase.com)

## Setup Instructions

### 1. Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Project Settings** > **API**
3. Copy the following values:
   - **Project URL** (for `SUPABASE_URL` and `VITE_SUPABASE_URL`)
   - **anon/public key** (for `VITE_SUPABASE_ANON_KEY`)
   - **service_role key** (for `SUPABASE_SERVICE_ROLE_KEY` - backend only)

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (or copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

### 3. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (or copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your Supabase credentials:
   ```
   PORT=5000
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:5000`

## Features

- ✅ User authentication (Login/Sign Up)
- ✅ Protected routes
- ✅ Session management
- ✅ Modern UI with responsive design
- ✅ Error handling
- ✅ Environment variable configuration

## API Endpoints

### Backend Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/verify-user` - Verify user token
  - Body: `{ "token": "jwt_token" }`
- `GET /api/user/:userId` - Get user data (protected)
  - Headers: `Authorization: Bearer <token>`

## Security Notes

⚠️ **Important**: 
- Never commit `.env` files to version control
- The `SUPABASE_SERVICE_ROLE_KEY` should only be used on the backend
- The `VITE_SUPABASE_ANON_KEY` is safe to expose in the frontend (it's public)

## Troubleshooting

1. **CORS errors**: Make sure both frontend and backend are running
2. **Authentication errors**: Verify your Supabase credentials are correct
3. **Port conflicts**: Change the PORT in backend `.env` if 5000 is in use

## Next Steps

- Add password reset functionality
- Implement email verification
- Add social authentication (Google, GitHub, etc.)
- Create product management features
- Add shopping cart functionality


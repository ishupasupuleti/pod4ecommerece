import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null) // 'user' or 'admin'
  const [loading, setLoading] = useState(true)

  // Check if user is admin (you can customize this logic)
  const checkAdminStatus = async (userEmail) => {
    try {
      // Option 1: Check user metadata
      // Option 2: Check against a list of admin emails
      // Option 3: Query Supabase database for admin role
      
      // Example: Check if email contains 'admin' or ends with '@admin.com'
      // In production, you should check this from your database
      const adminEmails = [
        'admin@example.com',
        // Add your admin emails here or fetch from database
      ]
      
      // Check user metadata first
      const { data: { user: currentUser }, error } = await supabase.auth.getUser()
      if (!error && currentUser?.user_metadata?.role === 'admin') {
        return 'admin'
      }
      
      // Check against admin emails list
      if (userEmail && adminEmails.includes(userEmail.toLowerCase())) {
        return 'admin'
      }
      
      return 'user'
    } catch (err) {
      console.error('Error checking admin status:', err)
      return 'user'
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const role = await checkAdminStatus(session.user.email)
        setUserRole(role)
      } else {
        setUserRole(null)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const role = await checkAdminStatus(session.user.email)
        setUserRole(role)
      } else {
        setUserRole(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password, userType = 'user') => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        return { data: null, error }
      }

      if (data?.user) {
        // Set user metadata if logging in as admin
        if (userType === 'admin') {
          await supabase.auth.updateUser({
            data: { role: 'admin' }
          })
          setUserRole('admin')
        } else {
          // Check admin status from metadata first (synchronous check)
          const metadataRole = data.user.user_metadata?.role
          if (metadataRole === 'admin') {
            setUserRole('admin')
          } else {
            // Check admin emails list (synchronous)
            const adminEmails = ['admin@example.com']
            if (adminEmails.includes(email?.toLowerCase())) {
              setUserRole('admin')
            } else {
              setUserRole('user')
            }
          }
        }
        setUser(data.user)
      }
      
      return { data, error }
    } catch (err) {
      console.error('Sign in error:', err)
      return { data: null, error: { message: err.message || 'An unexpected error occurred' } }
    }
  }

  const signUp = async (email, password, userType = 'user') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: userType === 'admin' ? 'admin' : 'user'
        }
      }
    })
    
    if (data?.user && !error) {
      setUserRole(userType)
    }
    
    return { data, error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUserRole(null)
  }

  const value = {
    user,
    userRole,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


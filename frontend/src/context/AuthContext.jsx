import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  async function refreshUser() {
    try {
      const response = await api.get('/auth/me')
      const currentUser = response.data.user
      setUser(currentUser)
      return currentUser
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null)
      } else {
        throw error
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    Promise.resolve().then(() => refreshUser()).catch(() => setUser(null))
  }, [])

  async function logout() {
    await api.post('/auth/logout')
    setUser(null)
  }

  const value = useMemo(() => ({
    user,
    isLoading,
    refreshUser,
    logout,
  }), [user, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}

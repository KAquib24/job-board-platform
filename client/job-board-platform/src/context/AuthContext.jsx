import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const isTokenExpired = (decoded) => {
    if (!decoded.exp) return false
    return decoded.exp * 1000 < Date.now()
  }

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      try {
        const decoded = jwtDecode(token)

        if (isTokenExpired(decoded)) {
          logout()
        } else {
          setUser({
            id: decoded.id,
            role: decoded.role,
          })
        }
      } catch (error) {
        logout()
      }
    }

    setLoading(false)
  }, [])

  const login = (token) => {
    localStorage.setItem("token", token)
    const decoded = jwtDecode(token)

    setUser({
      id: decoded.id,
      role: decoded.role,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

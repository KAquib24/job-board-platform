import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function PublicRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return null
  }

  if (isAuthenticated) {
    return user.role === "employer"
      ? <Navigate to="/employer/dashboard" replace />
      : <Navigate to="/candidate/dashboard" replace />
  }

  return children
}

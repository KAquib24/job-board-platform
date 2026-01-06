import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function ProtectedRoute({ children, role }) {
  const { user, loading, logout } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-500 mb-6"></div>
          <h3 className="text-lg font-semibold text-gray-700">Loading Dashboard</h3>
          <p className="text-gray-500 mt-2">Please wait...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* User Info & Logout Panel - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* User Info */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mr-4">
                <span className="text-white font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {user.name || user.email}
                </p>
                <p className="text-xs text-gray-500">
                  {user.role === 'employer' ? 'Employer Account' : 'Candidate Account'}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2.5 rounded-xl transition duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Content - Add padding to prevent overlap with fixed header */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        {children}
      </div>
    </div>
  )
}
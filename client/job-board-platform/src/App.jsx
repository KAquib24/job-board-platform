import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/public/Home"
import Jobs from "./pages/public/Jobs"
import JobDetail from "./pages/public/JobDetail"
import ApplyJob from "./pages/public/ApplyJob"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

import EmployerDashboard from "./pages/employer/Dashbaord"
import PostJob from "./pages/employer/PostJob"

import CandidateDashboard from "./pages/candidate/Dashboard"

import ProtectedRoute from "./components/common/ProtectedRoute"
import PublicRoute from "./components/common/PublicRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />

        {/* ===== AUTH ROUTES (PUBLIC ONLY) ===== */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* ===== CANDIDATE ROUTES ===== */}
        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoute role="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id/apply"
          element={
            <ProtectedRoute role="candidate">
              <ApplyJob />
            </ProtectedRoute>
          }
        />

        {/* ===== EMPLOYER ROUTES ===== */}
        <Route
          path="/employer/dashboard"
          element={
            <ProtectedRoute role="employer">
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/post-job"
          element={
            <ProtectedRoute role="employer">
              <PostJob />
            </ProtectedRoute>
          }
        />

        {/* ===== FALLBACK ===== */}
        <Route
          path="*"
          element={
            <p className="text-center mt-10 text-gray-600">
              Page not found
            </p>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

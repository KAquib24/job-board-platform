import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs/employer/me")
        setJobs(res.data)
      } catch (err) {
        setError("Failed to load jobs")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }
    
    try {
      await api.delete(`/jobs/${id}`)
      setJobs((prev) => prev.filter((job) => job._id !== id))
    } catch {
      alert("Failed to delete job")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-700">Loading Dashboard</h3>
            <p className="text-gray-500">Fetching your job listings...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Employer Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your job postings and track applications
              </p>
            </div>

            <Link
              to="/employer/post-job"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Post New Job
            </Link>
          </div>

          {/* Stats Summary */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{jobs.length}</div>
                <div className="text-sm text-gray-500">Total Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{jobs.length}</div>
                <div className="text-sm text-gray-500">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
                <div className="text-sm text-gray-500">Applications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
                <div className="text-sm text-gray-500">Views</div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-xl">
            <div className="flex items-center">
              <svg className="h-6 w-6 text-red-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-red-800">Error Loading Data</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Job Listings Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Your Job Postings
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({jobs.length} {jobs.length === 1 ? 'job' : 'jobs'})
              </span>
            </h2>
          </div>

          {/* Empty State */}
          {!error && jobs.length === 0 && (
            <div className="text-center py-16 px-6">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Jobs Posted Yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start posting jobs to find the perfect candidates for your team.
              </p>
              <Link
                to="/employer/post-job"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition duration-300"
              >
                Post Your First Job
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}

          {/* Job Listings */}
          {!error && jobs.length > 0 && (
            <div className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="p-6 hover:bg-gray-50 transition duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {job.title}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          job.type === 'full-time' ? 'bg-blue-100 text-blue-800' :
                          job.type === 'part-time' ? 'bg-green-100 text-green-800' :
                          job.type === 'internship' ? 'bg-purple-100 text-purple-800' :
                          job.type === 'contract' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {job.type?.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {job.company}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row sm:flex-col gap-2 sm:w-32">
                      <button
                        onClick={() => handleDelete(job._id, job.title)}
                        className="flex items-center justify-center border border-red-300 text-red-600 font-semibold py-2 px-4 rounded-lg hover:bg-red-50 transition duration-200"
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tips */}
        {!error && jobs.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tips for Better Hiring
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Review Applications Regularly</h4>
                <p className="text-sm text-gray-600">Check new applications daily to respond to top candidates quickly.</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Update Job Status</h4>
                <p className="text-sm text-gray-600">Mark jobs as filled when positions are taken to manage expectations.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../services/api"
import { useAuth } from "../../context/AuthContext"

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`)
        setJob(res.data)
      } catch (err) {
        setError("Failed to load job details")
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-6"></div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Loading Job Details</h3>
          <p className="text-gray-500">Fetching the perfect opportunity for you...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-xl">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-red-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-2xl font-bold text-red-800">Unable to Load Job</h3>
                <p className="text-red-700 mt-2">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <svg className="mx-auto h-24 w-24 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Job Not Found</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            The job you're looking for might have been removed or is no longer available.
          </p>
          <button
            onClick={() => navigate("/jobs")}
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            Browse Other Jobs
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 group"
        >
          <svg className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Jobs
        </button>

        {/* Job Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              {/* Job Type Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                  job.type === 'full-time' ? 'bg-blue-100 text-blue-800' :
                  job.type === 'part-time' ? 'bg-green-100 text-green-800' :
                  job.type === 'internship' ? 'bg-purple-100 text-purple-800' :
                  job.type === 'contract' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {job.type?.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              {/* Job Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {job.title}
              </h1>

              {/* Company Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-blue-700 font-bold text-xl">
                      {job.company?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {job.company}
                    </p>
                    <p className="text-gray-600">
                      {job.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Job Meta Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center text-gray-700">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Posted</p>
                    <p className="font-semibold text-gray-900">Recently</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="lg:w-48">
              <button
                onClick={() =>
                  isAuthenticated
                    ? navigate(`/jobs/${id}/apply`)
                    : navigate("/login")
                }
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-lg"
              >
                {isAuthenticated ? 'Apply Now' : 'Login to Apply'}
              </button>
            </div>
          </div>
        </div>

        {/* Job Details Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Job Description
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>
        </div>

        {/* Requirements */}
        {job.requirements && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
              Requirements
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.requirements}
              </p>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Apply?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Submit your application today and take the next step in your career journey.
          </p>
          <button
            onClick={() =>
              isAuthenticated
                ? navigate(`/jobs/${id}/apply`)
                : navigate("/login")
            }
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            {isAuthenticated ? 'Apply Now' : 'Login to Apply'}
          </button>
        </div>
      </div>
    </div>
  )
}
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("")

  const fetchJobs = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await api.get("/jobs", {
        params: {
          q: search || undefined,
          location: location || undefined,
          type: type || undefined,
        },
      })
      setJobs(res.data)
    } catch (err) {
      setError("Failed to load jobs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-lg text-gray-600">
            Discover opportunities that match your skills
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                placeholder="Search by title or company"
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Location Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                placeholder="Location"
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Job Type Select */}
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>

            {/* Search Button */}
            <button
              onClick={fetchJobs}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              Search Jobs
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-10">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Jobs
              {jobs.length > 0 && (
                <span className="ml-2 text-lg font-normal text-gray-500">
                  ({jobs.length})
                </span>
              )}
            </h2>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-500 mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Opportunities</h3>
              <p className="text-gray-500">Finding the best matches for you...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6 max-w-2xl mx-auto">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-red-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800">Unable to Load Jobs</h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && jobs.length === 0 && (
            <div className="text-center py-16">
              <svg className="mx-auto h-20 w-20 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Jobs Found</h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your search filters
              </p>
              <button
                onClick={() => {
                  setSearch("")
                  setLocation("")
                  setType("")
                  fetchJobs()
                }}
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Job Listings */}
          {!loading && !error && jobs.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Job Type Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        job.type === 'full-time' ? 'bg-blue-100 text-blue-800' :
                        job.type === 'part-time' ? 'bg-green-100 text-green-800' :
                        job.type === 'internship' ? 'bg-purple-100 text-purple-800' :
                        job.type === 'contract' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {job.type?.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        Recently posted
                      </span>
                    </div>

                    {/* Job Title & Company */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-700 font-bold">
                          {job.company?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium">
                        {job.company}
                      </p>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-600 mb-6">
                      <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{job.location}</span>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={`/jobs/${job._id}`}
                      className="block w-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold py-3 px-4 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition duration-200 text-center"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        {!loading && jobs.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Looking for more opportunities?
            </p>
            <Link
              to="/register"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              Create an account for personalized job alerts
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
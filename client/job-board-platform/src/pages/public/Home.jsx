import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const res = await api.get("/jobs/featured")
        setJobs(res.data)
      } catch (err) {
        setError("Failed to load featured jobs")
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedJobs()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Next <span className="text-blue-400">Opportunity</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover jobs from trusted companies and take the next step in your career.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              to="/jobs"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-lg"
            >
              Browse Jobs
            </Link>

            <Link
              to="/register"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition duration-300 transform hover:-translate-y-1"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Jobs
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked opportunities from top companies
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-500 mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Featured Jobs</h3>
              <p className="text-gray-500">Discovering the best opportunities for you...</p>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Featured Jobs Available</h3>
              <p className="text-gray-600 mb-8">
                Check back soon for new featured opportunities
              </p>
            </div>
          )}

          {/* Featured Jobs Grid */}
          {!loading && !error && jobs.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 overflow-hidden"
                >
                  <div className="p-8">
                    {/* Job Type Badge */}
                    <div className="flex justify-between items-start mb-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        job.type === 'full-time' ? 'bg-blue-100 text-blue-800' :
                        job.type === 'part-time' ? 'bg-green-100 text-green-800' :
                        job.type === 'internship' ? 'bg-purple-100 text-purple-800' :
                        job.type === 'contract' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {job.type?.toUpperCase()}
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

          {/* View All Jobs CTA */}
          {!loading && jobs.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/jobs"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg"
              >
                View All Jobs
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Your journey to the perfect career in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Create an Account
              </h3>
              <p className="text-gray-600">
                Register as a candidate or employer in minutes.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Apply or Post Jobs
              </h3>
              <p className="text-gray-600">
                Apply to jobs or post openings effortlessly.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Get Hired
              </h3>
              <p className="text-gray-600">
                Track applications and connect with the right people.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
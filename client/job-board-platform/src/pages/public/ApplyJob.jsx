import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../services/api"

export default function ApplyJob() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [coverLetter, setCoverLetter] = useState("")
  const [resume, setResume] = useState(null)
  const [resumeName, setResumeName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleResumeChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a PDF, DOC, or DOCX file")
        e.target.value = ""
        return
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        e.target.value = ""
        return
      }
      
      setResume(file)
      setResumeName(file.name)
      setError("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("coverLetter", coverLetter)
      if (resume) {
        formData.append("resume", resume)
      }

      // Use multipart/form-data for file upload
      await api.post(`/applications/${id}/apply`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      
      setSuccess(true)
      setTimeout(() => {
        navigate("/candidate/dashboard")
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        {success && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center animate-fadeIn">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Your application has been successfully submitted. You'll be redirected to your dashboard shortly.
            </p>
            <div className="flex justify-center">
              <div className="animate-pulse flex items-center text-green-600 font-medium">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                Redirecting...
              </div>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">Submit Your Application</h1>
                <p className="text-blue-100">
                  Complete your application to be considered for this position
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {/* Application Tips */}
            <div className="mb-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Application Tips</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Upload your resume in PDF, DOC, or DOCX format (max 5MB)</li>
                    <li>• Tailor your cover letter to this specific position</li>
                    <li>• Highlight relevant skills and experience</li>
                    <li>• Proofread before submitting</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-red-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-red-800">Application Error</h3>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Resume Upload Section */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Resume Upload *
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    (Required)
                  </span>
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition duration-200 bg-gray-50">
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleResumeChange}
                    className="hidden"
                    disabled={loading || success}
                    required
                  />
                  
                  {resume ? (
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="font-medium text-gray-900 mb-2">File selected:</p>
                      <p className="text-gray-600 text-sm mb-4">{resumeName}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setResume(null)
                          setResumeName("")
                          document.getElementById("resume").value = ""
                        }}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                        disabled={loading || success}
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <label
                        htmlFor="resume"
                        className="cursor-pointer font-medium text-blue-600 hover:text-blue-800"
                      >
                        Click to upload
                      </label>
                      <p className="text-gray-600 mb-2">or drag and drop</p>
                      <p className="text-sm text-gray-500">
                        PDF, DOC, DOCX up to 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Cover Letter Section */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Cover Letter
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    (Optional but recommended)
                  </span>
                </label>
                
                <div className="relative">
                  <textarea
                    placeholder="Introduce yourself and explain why you're the perfect fit for this position. Mention specific skills, experience, and achievements that align with the job requirements."
                    className="w-full px-6 py-5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none bg-gray-50"
                    rows={8}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    disabled={loading || success}
                  />
                  
                  {/* Character Counter */}
                  <div className="absolute bottom-4 right-4 text-sm text-gray-500">
                    {coverLetter.length}/2000 characters
                  </div>
                </div>
                
                <p className="mt-3 text-sm text-gray-500">
                  Recommended length: 150-300 words
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={loading || success}
                  className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Back
                </button>
                
                <button
                  type="submit"
                  disabled={loading || success || !resume}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : success ? (
                    "Application Submitted ✓"
                  ) : (
                    "Submit Application →"
                  )}
                </button>
              </div>
            </form>

            {/* Security Note */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Your application is secure and encrypted. We value your privacy.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
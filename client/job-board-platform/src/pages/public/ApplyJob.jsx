import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../services/api"

export default function ApplyJob() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [coverLetter, setCoverLetter] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await api.post(`/applications/${id}/apply`, {
        coverLetter,
      })
      navigate("/candidate/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-2xl font-semibold mb-6">
        Apply for Job
      </h1>

      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Cover Letter (optional)"
          className="w-full border p-3 rounded"
          rows={6}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  )
}

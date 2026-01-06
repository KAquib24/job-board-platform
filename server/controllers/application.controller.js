import Application from "../models/Application.js"
import { upload } from "../middleware/upload.middleware.js" // Add this import

export const applyJob = async (req, res) => {
  try {
    if (req.user.role !== "candidate") {
      return res.status(403).json({ message: "Candidate access required" })
    }

    const { coverLetter } = req.body
    const jobId = req.params.id

    const alreadyApplied = await Application.findOne({
      job: jobId,
      candidate: req.user.id,
    })

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" })
    }

    // Get resume file info if uploaded
    const resumeInfo = req.file ? {
      resumeUrl: `/uploads/${req.file.filename}`,
      resumeFileName: req.file.filename,
      resumeOriginalName: req.file.originalname
    } : {}

    const application = await Application.create({
      job: jobId,
      candidate: req.user.id,
      coverLetter,
      ...resumeInfo
    })

    res.status(201).json(application)
  } catch (error) {
    console.error("Apply job error:", error)
    res.status(500).json({ message: "Failed to apply for job" })
  }
}

// Update the route to handle file upload
export const applyJobWithResume = [
  upload.single('resume'),
  applyJob
]

export const getCandidateApplications = async (req, res) => {
  try {
    if (req.user.role !== "candidate") {
      return res.status(403).json({ message: "Candidate access required" })
    }

    const applications = await Application.find({
      candidate: req.user.id,
    })
      .populate("job", "title company location type")
      .sort({ createdAt: -1 })

    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" })
  }
}
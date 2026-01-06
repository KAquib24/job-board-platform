import Job from "../models/Job.js"

/**
 * GET /api/jobs
 * Public
 */
export const getJobs = async (req, res) => {
  try {
    const { q, location, type } = req.query
    const filter = {}

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } },
      ]
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" }
    }

    if (type) {
      filter.type = type
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 })
    res.json(jobs)
  } catch {
    res.status(500).json({ message: "Failed to fetch jobs" })
  }
}

/**
 * GET /api/jobs/:id
 * Public
 */
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    res.json(job)
  } catch {
    res.status(500).json({ message: "Failed to fetch job" })
  }
}

/**
 * GET /api/jobs/featured
 * Public
 */
export const getFeaturedJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(6)

    res.json(jobs)
  } catch {
    res.status(500).json({ message: "Failed to fetch featured jobs" })
  }
}

/**
 * POST /api/jobs
 * Employer only
 */
export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Employer access required" })
    }

    const job = await Job.create({
      ...req.body,
      createdBy: req.user.id,
    })

    res.status(201).json(job)
  } catch {
    res.status(500).json({ message: "Failed to create job" })
  }
}

/**
 * GET /api/jobs/employer/me
 * Employer only
 */
export const getEmployerJobs = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Employer access required" })
    }

    const jobs = await Job.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    })

    res.json(jobs)
  } catch {
    res.status(500).json({ message: "Failed to fetch employer jobs" })
  }
}

/**
 * DELETE /api/jobs/:id
 * Employer only
 */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" })
    }

    await job.deleteOne()
    res.json({ message: "Job deleted" })
  } catch {
    res.status(500).json({ message: "Failed to delete job" })
  }
}

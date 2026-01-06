import express from "express"
import {
  getJobs,
  getJobById,
  getFeaturedJobs,
  createJob,
  getEmployerJobs,
  deleteJob,
} from "../controllers/job.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

// Public
router.get("/", getJobs)
router.get("/featured", getFeaturedJobs)

// Employer (must come BEFORE :id)
router.get("/employer/me", protect, getEmployerJobs)

// Job detail (keep after specific routes)
router.get("/:id", getJobById)

// Employer actions
router.post("/", protect, createJob)
router.delete("/:id", protect, deleteJob)

export default router

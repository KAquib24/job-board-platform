import express from "express"
import {
  applyJobWithResume,  // Updated function
  getCandidateApplications,
} from "../controllers/application.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

// Use the new upload middleware with apply route
router.post("/:id/apply", protect, applyJobWithResume)
router.get("/me", protect, getCandidateApplications)

export default router
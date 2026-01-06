import express from "express"
import {
  applyJob,
  getCandidateApplications,
} from "../controllers/application.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/:id/apply", protect, applyJob)
router.get("/me", protect, getCandidateApplications)

export default router

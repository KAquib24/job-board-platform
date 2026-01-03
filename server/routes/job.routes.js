import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// Public
router.get("/", getJobs);
router.get("/:id", getJobById);

// Employer only
router.post("/", protect, authorizeRoles("employer"), createJob);
router.put("/:id", protect, authorizeRoles("employer"), updateJob);
router.delete("/:id", protect, authorizeRoles("employer"), deleteJob);

export default router;

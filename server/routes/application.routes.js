import express from "express";
import {
  applyForJob,
  getEmployerApplications,
  getCandidateApplications,
} from "../controllers/application.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Candidate applies
router.post(
  "/apply",
  protect,
  authorizeRoles("candidate"),
  upload.single("resume"),
  applyForJob
);

// Employer views applicants
router.get(
  "/employer",
  protect,
  authorizeRoles("employer"),
  getEmployerApplications
);

// Candidate views own applications
router.get(
  "/candidate",
  protect,
  authorizeRoles("candidate"),
  getCandidateApplications
);

export default router;

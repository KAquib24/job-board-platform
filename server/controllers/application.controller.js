import Application from "../models/Application.js";
import Job from "../models/Job.js";

// APPLY FOR JOB (Candidate only)
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      candidate: req.user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user._id,
      resume: req.file.path,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET APPLICATIONS FOR EMPLOYER
export const getEmployerApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job")
      .populate("candidate", "name email");

    const filtered = applications.filter(
      (app) => app.job.createdBy.toString() === req.user._id.toString()
    );

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET APPLICATIONS FOR CANDIDATE
export const getCandidateApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user._id,
    }).populate("job");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

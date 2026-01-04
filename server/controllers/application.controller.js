import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { sendEmail } from "../utils/mailer.js";
import User from "../models/User.js";

// APPLY FOR JOB (Candidate only)
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    // 1. Find job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 2. Check duplicate application
    const alreadyApplied = await Application.findOne({
      job: jobId,
      candidate: req.user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    // 3. Create application
    const application = await Application.create({
      job: jobId,
      candidate: req.user._id,
      resume: req.file?.path,
    });

    // =========================
    // 4. EMAIL TO CANDIDATE ✅
    // =========================
    await sendEmail({
      to: req.user.email,
      subject: "Job Application Submitted Successfully",
      html: `
        <h2>Application Received</h2>
        <p>Hello ${req.user.name},</p>
        <p>Your application for <strong>${job.title}</strong> has been successfully submitted.</p>
        <p>We will notify you if there are any updates.</p>
        <br />
        <p>Best regards,<br/>Job Board Team</p>
      `,
    });

    // =========================
    // 5. EMAIL TO EMPLOYER (OPTIONAL BUT IMPRESSIVE) ⭐
    // =========================
    const employer = await User.findById(job.createdBy);

    if (employer?.email) {
      await sendEmail({
        to: employer.email,
        subject: "New Job Application Received",
        html: `
          <h2>New Application</h2>
          <p>A candidate has applied for your job posting:</p>
          <p><strong>${job.title}</strong></p>
          <p>Login to your dashboard to review the application.</p>
        `,
      });
    }

    // 6. Response
    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });

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

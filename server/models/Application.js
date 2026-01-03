import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: String, // file path
      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "reviewed", "shortlisted", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);

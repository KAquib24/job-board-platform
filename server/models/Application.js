import mongoose from "mongoose"

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
    coverLetter: String,
    resumeUrl: String,
    resumeFileName: String,
    resumeOriginalName: String,
    status: {
      type: String,
      enum: ["applied", "reviewed", "rejected", "accepted"],
      default: "applied",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Application", applicationSchema)
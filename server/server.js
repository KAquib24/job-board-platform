import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import path from "path";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes); // Authentication
app.use("/api/jobs", jobRoutes); // Job 
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // Application 

app.get("/", (req, res) => {
  res.send("Job Board API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

import express from "express"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import jobRoutes from "./routes/job.routes.js"
import applicationRoutes from "./routes/application.routes.js"

import { errorHandler } from "./middleware/error.middleware.js"

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/applications", applicationRoutes)

// Error handler (must be last)
app.use(errorHandler)

export default app

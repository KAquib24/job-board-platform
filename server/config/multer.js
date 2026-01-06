import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const fileFilter = (_, file, cb) => {
  const allowedTypes = /pdf|doc|docx/
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )

  if (extname) {
    cb(null, true)
  } else {
    cb(new Error("Only resume files are allowed"))
  }
}

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter,
})

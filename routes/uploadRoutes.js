import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 30);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e5)}`;
    cb(null, `img-${cleanBase}-${uniqueSuffix}${ext}`);
  }
});

// File filter (Images only)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /\.(jpg|jpeg|png|webp|gif|svg)$/i;
  const isImageMime = file.mimetype && file.mimetype.startsWith("image/");
  if (allowedExtensions.test(file.originalname) || isImageMime) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ hỗ trợ file hình ảnh (.jpg, .jpeg, .png, .webp, .gif, .svg)!"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter
});

// POST /api/upload (Single image upload)
router.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Lỗi khi tải hình ảnh lên."
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng chọn hình ảnh để tải lên."
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({
      success: true,
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  });
});

// POST /api/upload/multiple (Multiple images upload)
router.post("/multiple", (req, res) => {
  upload.array("images", 10)(req, res, (err) => {
    if (err) {
      console.error("Multiple upload error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Lỗi khi tải nhiều hình ảnh."
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng chọn ít nhất 1 hình ảnh."
      });
    }

    const fileUrls = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size
    }));

    return res.status(200).json({
      success: true,
      count: fileUrls.length,
      files: fileUrls
    });
  });
});

export default router;


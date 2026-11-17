import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import UploadedImage from "../models/UploadedImage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure local uploads folder exists for temporary/local caching
const uploadsDir = path.join(__dirname, "../uploads");
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (e) {
  console.warn("Could not create local uploads directory:", e.message);
}

// Memory storage so we have access to buffer to save in MongoDB Atlas
const storage = multer.memoryStorage();

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
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter
});

// Helper to generate a safe unique filename
function generateUniqueFilename(originalName) {
  const ext = path.extname(originalName).toLowerCase() || ".jpg";
  const cleanBase = path
    .basename(originalName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .slice(0, 30) || "photo";
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e5)}`;
  return `img-${cleanBase}-${uniqueSuffix}${ext}`;
}

// Helper to save buffer to both MongoDB Atlas and local disk
async function persistImage(file) {
  const filename = generateUniqueFilename(file.originalname);
  const contentType = file.mimetype || "image/jpeg";

  // 1. Lưu vĩnh viễn vào MongoDB Atlas
  const savedDoc = await UploadedImage.findOneAndUpdate(
    { filename },
    {
      filename,
      originalName: file.originalname,
      contentType,
      data: file.buffer,
      size: file.size
    },
    { upsert: true, new: true }
  );

  // 2. Lưu vào local disk nếu khả dụng (cache nhanh)
  try {
    const localFilePath = path.join(uploadsDir, filename);
    fs.writeFileSync(localFilePath, file.buffer);
  } catch (diskErr) {
    // Trên môi trường read-only hoặc ephemeral không ghi được thì bỏ qua, MongoDB đã lưu an toàn
    console.warn("Local disk write skipped, MongoDB backup active:", diskErr.message);
  }

  return {
    filename,
    url: `/uploads/${filename}`,
    originalName: file.originalname,
    size: file.size,
    id: savedDoc._id
  };
}

// GET /api/upload/:filenameOrId (Direct access from database)
router.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    let imageDoc = null;

    // Check by filename
    imageDoc = await UploadedImage.findOne({ filename: identifier });

    // If not found and identifier is 24-hex ObjectId
    if (!imageDoc && /^[0-9a-fA-F]{24}$/.test(identifier)) {
      imageDoc = await UploadedImage.findById(identifier);
    }

    if (!imageDoc || !imageDoc.data) {
      return res.status(404).send("Image not found");
    }

    res.set("Content-Type", imageDoc.contentType || "image/jpeg");
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    return res.send(imageDoc.data);
  } catch (err) {
    console.error("Serve image error:", err);
    return res.status(404).send("Image not found");
  }
});

// POST /api/upload (Single image upload)
router.post("/", (req, res) => {
  upload.single("image")(req, res, async (err) => {
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

    try {
      const result = await persistImage(req.file);
      return res.status(200).json({
        success: true,
        message: "Tải ảnh thành công và đã lưu trữ vĩnh viễn vào MongoDB Atlas!",
        url: result.url,
        filename: result.filename,
        originalName: result.originalName,
        size: result.size
      });
    } catch (saveErr) {
      console.error("Persist image error:", saveErr);
      return res.status(500).json({
        success: false,
        message: "Lỗi lưu trữ hình ảnh vào cơ sở dữ liệu."
      });
    }
  });
});

// POST /api/upload/multiple (Multiple images upload)
router.post("/multiple", (req, res) => {
  upload.array("images", 15)(req, res, async (err) => {
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

    try {
      const fileUrls = [];
      for (const file of req.files) {
        const result = await persistImage(file);
        fileUrls.push(result);
      }

      return res.status(200).json({
        success: true,
        message: `Đã lưu vĩnh viễn ${fileUrls.length} ảnh vào MongoDB Atlas!`,
        count: fileUrls.length,
        files: fileUrls
      });
    } catch (saveErr) {
      console.error("Persist multiple images error:", saveErr);
      return res.status(500).json({
        success: false,
        message: "Lỗi lưu trữ nhiều ảnh vào cơ sở dữ liệu."
      });
    }
  });
});

export default router;

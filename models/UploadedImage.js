import mongoose from "mongoose";

const uploadedImageSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true, unique: true, index: true },
    originalName: { type: String, default: "" },
    contentType: { type: String, required: true, default: "image/jpeg" },
    data: { type: Buffer, required: true },
    size: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("UploadedImage", uploadedImageSchema);


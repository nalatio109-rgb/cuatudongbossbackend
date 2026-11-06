import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, default: () => new Date().toLocaleDateString("vi-VN") },
    img: { type: String, required: true },
    desc: { type: String, default: "" },
    content: { type: String, default: "" },
    order: { type: Number, default: 0 },
    phone: { type: String, default: "0904.678.323" },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);


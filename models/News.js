import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, default: "" },
    image: { type: String, required: true },
    date: { type: String, required: true },
    summary: { type: String, default: "" },
    content: { type: String, default: "" },
    author: { type: String, default: "BOSS Đà Nẵng" }
  },
  { timestamps: true }
);

export default mongoose.model("News", newsSchema);

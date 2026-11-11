import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên người đánh giá là bắt buộc"],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      default: ""
    },
    role: {
      type: String,
      trim: true,
      default: "Khách hàng đã trải nghiệm"
    },
    avatar: {
      type: String,
      default: "K"
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5
    },
    text: {
      type: String,
      required: [true, "Nội dung nhận xét là bắt buộc"],
      trim: true
    },
    color: {
      type: String,
      default: "#07522f"
    },
    mediaType: {
      type: String,
      enum: ["image", "video", null],
      default: null
    },
    mediaUrl: {
      type: String,
      default: ""
    },
    verified: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Review", reviewSchema);


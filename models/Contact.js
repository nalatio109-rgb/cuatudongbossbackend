import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    productCategory: { type: String, default: "" },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "contacted", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);

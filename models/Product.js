import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true },
    category: { type: String, required: true }, // cuacuon, phukien, cuakeo, cuatudong, nhomkinh
    description: { type: String, default: "" },
    details: { type: String, default: "" },
    specs: [{ type: String }],
    image: { type: String, required: true },
    badge: { type: String, default: "" },
    price: { type: String, default: "Liên hệ" },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

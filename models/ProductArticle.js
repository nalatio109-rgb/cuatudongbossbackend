import mongoose from "mongoose";

const productArticleSchema = new mongoose.Schema(
  {
    productId: { type: String, default: "" },
    productCode: { type: String, required: true, unique: true, index: true },
    productTitle: { type: String, required: true },
    category: { type: String, default: "cuakeo" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published"
    },
    content: { type: String, default: "" }, // Rich HTML content from WYSIWYG
    uploadedImages: [{ type: String }], // Array of uploaded image URLs
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      focusKeyword: { type: String, default: "" },
      secondaryKeywords: [{ type: String }],
      slug: { type: String, default: "" },
      imageAlt: { type: String, default: "" },
      canonicalUrl: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

export default mongoose.model("ProductArticle", productArticleSchema);


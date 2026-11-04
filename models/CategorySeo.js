import mongoose from "mongoose";

const categorySeoSchema = new mongoose.Schema(
  {
    category: { 
      type: String, 
      required: true, 
      unique: true, 
      enum: ["all", "cuacuon", "phukien", "cuakeo", "cuatudong"] 
    },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    h1: { type: String, default: "" },
    summary: { type: String, default: "" },
    content: { type: String, default: "" },
    targetKeywords: [{ type: String }],
    structureAndTech: {
      title: { type: String, default: "" },
      desc: { type: String, default: "" },
      points: [
        {
          heading: { type: String, default: "" },
          detail: { type: String, default: "" }
        }
      ]
    },
    benefitsTitle: { type: String, default: "" },
    benefits: [
      {
        title: { type: String, default: "" },
        desc: { type: String, default: "" }
      }
    ],
    applications: {
      title: { type: String, default: "" },
      items: [{ type: String }]
    },
    buyingGuide: {
      title: { type: String, default: "" },
      steps: [{ type: String }]
    },
    faqs: [
      {
        q: { type: String, default: "" },
        a: { type: String, default: "" }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("CategorySeo", categorySeoSchema);


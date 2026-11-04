import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import ProductArticle from "./models/ProductArticle.js";
import { DEFAULT_PRODUCT_ARTICLES } from "./data/defaultProductArticles.js";

dotenv.config();

const seedArticles = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB Atlas for ProductArticles seeding...");

    for (const art of DEFAULT_PRODUCT_ARTICLES) {
      await ProductArticle.findOneAndUpdate(
        { productCode: art.productCode },
        { $set: art },
        { upsert: true, new: true }
      );
      console.log(`Seeded article for: ${art.productCode} (${art.productTitle})`);
    }

    console.log("All default product articles seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedArticles();


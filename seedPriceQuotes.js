import mongoose from "mongoose";
import dotenv from "dotenv";
import PriceQuote from "./models/PriceQuote.js";
import { DEFAULT_PRICE_QUOTES } from "./data/defaultPriceQuotes.js";

dotenv.config();

const seed = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully!");

    console.log(`Upserting ${DEFAULT_PRICE_QUOTES.length} price quotes into MongoDB...`);
    for (const q of DEFAULT_PRICE_QUOTES) {
      await PriceQuote.findOneAndUpdate(
        { productCode: q.productCode },
        q,
        { upsert: true, new: true }
      );
      console.log(`✓ Upserted: ${q.productCode} - ${q.title}`);
    }

    console.log("All default price quotes seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seed();


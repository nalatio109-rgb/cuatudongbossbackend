import express from "express";
import {
  getAllPriceQuotes,
  getPriceQuoteByCode,
  savePriceQuote,
  deletePriceQuote,
  seedDefaults
} from "../controllers/priceQuoteController.js";

const router = express.Router();

router.get("/", getAllPriceQuotes);
router.get("/:code", getPriceQuoteByCode);
router.post("/", savePriceQuote);
router.post("/seed-defaults", seedDefaults);
router.delete("/:id", deletePriceQuote);

export default router;


import express from "express";
import {
  getAllCategorySeo,
  getCategorySeoByCategory,
  upsertCategorySeo
} from "../controllers/categorySeoController.js";

const router = express.Router();

router.get("/", getAllCategorySeo);
router.get("/:category", getCategorySeoByCategory);
router.put("/:category", upsertCategorySeo);
router.post("/", upsertCategorySeo);

export default router;


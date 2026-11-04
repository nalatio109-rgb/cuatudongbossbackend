import express from "express";
import {
  getAllArticles,
  getArticleByCode,
  upsertArticle,
  deleteArticle,
  seedDefaultArticles
} from "../controllers/productArticleController.js";

const router = express.Router();

router.get("/", getAllArticles);
router.post("/seed-defaults", seedDefaultArticles);
router.get("/:code", getArticleByCode);
router.post("/", upsertArticle);
router.delete("/:code", deleteArticle);

export default router;


import ProductArticle from "../models/ProductArticle.js";
import { DEFAULT_PRODUCT_ARTICLES } from "../data/defaultProductArticles.js";

// GET /api/product-articles
export const getAllArticles = async (req, res) => {
  try {
    let articles = await ProductArticle.find().sort({ updatedAt: -1 });

    // Auto-seed if empty
    if (!articles || articles.length === 0) {
      await ProductArticle.insertMany(DEFAULT_PRODUCT_ARTICLES);
      articles = await ProductArticle.find().sort({ updatedAt: -1 });
    }

    res.json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (err) {
    console.error("Error fetching product articles:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/product-articles/:code
export const getArticleByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const regex = new RegExp(`^${code}$`, "i");

    // 1. Find in MongoDB
    let article = await ProductArticle.findOne({
      $or: [
        { productCode: regex },
        { productId: code },
        { "seo.slug": regex }
      ]
    });

    // 2. Fallback in default seed data
    if (!article) {
      const foundDefault = DEFAULT_PRODUCT_ARTICLES.find(
        (a) =>
          a.productCode.toLowerCase() === code.toLowerCase() ||
          (a.productId && a.productId.toLowerCase() === code.toLowerCase()) ||
          (a.seo?.slug && a.seo.slug.toLowerCase() === code.toLowerCase())
      );
      if (foundDefault) {
        article = foundDefault;
      }
    }

    if (!article) {
      return res.status(404).json({
        success: false,
        message: `Chưa có bài viết cho mã sản phẩm: ${code}`
      });
    }

    res.json({
      success: true,
      data: article
    });
  } catch (err) {
    console.error("Error fetching product article by code:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/product-articles (Create or Update article)
export const upsertArticle = async (req, res) => {
  try {
    const {
      productId,
      productCode,
      productTitle,
      category,
      status,
      content,
      uploadedImages,
      seo
    } = req.body;

    if (!productCode) {
      return res.status(400).json({ success: false, message: "Mã sản phẩm (productCode) là bắt buộc." });
    }

    const regex = new RegExp(`^${productCode.trim()}$`, "i");

    const articleData = {
      productId: productId || "",
      productCode: productCode.trim().toUpperCase(),
      productTitle: productTitle || productCode,
      category: category || "cuakeo",
      status: status || "published",
      content: content || "",
      uploadedImages: Array.isArray(uploadedImages) ? uploadedImages : [],
      seo: {
        title: seo?.title || "",
        description: seo?.description || "",
        focusKeyword: seo?.focusKeyword || "",
        secondaryKeywords: Array.isArray(seo?.secondaryKeywords) ? seo?.secondaryKeywords : [],
        slug: seo?.slug || "",
        imageAlt: seo?.imageAlt || "",
        canonicalUrl: seo?.canonicalUrl || ""
      },
      updatedAt: new Date()
    };

    const updated = await ProductArticle.findOneAndUpdate(
      { productCode: regex },
      { $set: articleData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({
      success: true,
      message: `Đã ${status === "draft" ? "lưu bản nháp" : "xuất bản"} bài viết chi tiết sản phẩm thành công!`,
      data: updated
    });
  } catch (err) {
    console.error("Error upserting product article:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/product-articles/:code
export const deleteArticle = async (req, res) => {
  try {
    const { code } = req.params;
    const regex = new RegExp(`^${code}$`, "i");
    const deleted = await ProductArticle.findOneAndDelete({ productCode: regex });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Không tìm thấy bài viết để xóa." });
    }
    res.json({ success: true, message: "Đã xóa bài viết thành công." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/product-articles/seed-defaults
export const seedDefaultArticles = async (req, res) => {
  try {
    await ProductArticle.deleteMany({});
    const inserted = await ProductArticle.insertMany(DEFAULT_PRODUCT_ARTICLES);
    res.json({
      success: true,
      message: `Đã khôi phục thành công ${inserted.length} bài viết sản phẩm mẫu chuẩn!`,
      data: inserted
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


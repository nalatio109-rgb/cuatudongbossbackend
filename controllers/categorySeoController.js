import CategorySeo from "../models/CategorySeo.js";

// @desc Get all category SEO articles
// @route GET /api/category-seo
export const getAllCategorySeo = async (req, res) => {
  try {
    const list = await CategorySeo.find();
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get category SEO article by category slug
// @route GET /api/category-seo/:category
export const getCategorySeoByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const item = await CategorySeo.findOne({ category });
    if (!item) {
      return res.status(404).json({ success: false, message: "Category SEO not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Upsert (Create or Update) category SEO article
// @route PUT /api/category-seo/:category
export const upsertCategorySeo = async (req, res) => {
  try {
    const category = req.params.category || req.body.category;
    if (!category) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }

    const payload = { ...req.body, category };
    const updated = await CategorySeo.findOneAndUpdate(
      { category },
      payload,
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


import News from "../models/News.js";

// Helper to convert Vietnamese title to unaccented SEO slug
function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// GET /api/news
export const getNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    // Ensure every news item has a slug
    const normalized = newsList.map((item) => {
      const obj = item.toObject ? item.toObject() : item;
      if (!obj.slug) {
        obj.slug = slugify(obj.title);
      }
      return obj;
    });
    res.status(200).json({ success: true, count: normalized.length, data: normalized });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/news/:id (Tìm theo Slug hoặc MongoDB ObjectId)
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    let article = null;

    // 1. Tìm theo slug (không phân biệt hoa thường)
    article = await News.findOne({
      slug: { $regex: new RegExp(`^${id}$`, "i") }
    });

    // 2. Nếu không thấy và param là ObjectId 24 ký tự hợp lệ, tìm theo _id
    if (!article && id.match(/^[0-9a-fA-F]{24}$/)) {
      article = await News.findById(id);
    }

    // 3. Fallback: tìm theo tên đã slugify
    if (!article) {
      const allNews = await News.find();
      article = allNews.find((n) => {
        const itemSlug = n.slug || slugify(n.title);
        return itemSlug.toLowerCase() === id.toLowerCase();
      });
    }

    if (!article) {
      return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
    }

    const resObj = article.toObject ? article.toObject() : article;
    if (!resObj.slug) {
      resObj.slug = slugify(resObj.title);
    }

    res.status(200).json({ success: true, data: resObj });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/news
export const createNews = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.slug || payload.slug.trim() === "") {
      payload.slug = slugify(payload.title || "");
    }
    const article = await News.create(payload);
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/news/:id
export const updateNews = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.slug || payload.slug.trim() === "") {
      payload.slug = slugify(payload.title || "");
    }
    const article = await News.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });
    if (!article) {
      return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/news/:id
export const deleteNews = async (req, res) => {
  try {
    const article = await News.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
    }
    res.status(200).json({ success: true, message: "Đã xóa bài viết thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

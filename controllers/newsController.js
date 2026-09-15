import News from "../models/News.js";

// GET /api/news
export const getNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: newsList.length, data: newsList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/news/:id
export const getNewsById = async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/news
export const createNews = async (req, res) => {
  try {
    const article = await News.create(req.body);
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/news/:id
export const updateNews = async (req, res) => {
  try {
    const article = await News.findByIdAndUpdate(req.params.id, req.body, {
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

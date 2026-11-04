import PriceQuote from "../models/PriceQuote.js";
import { DEFAULT_PRICE_QUOTES } from "../data/defaultPriceQuotes.js";

// GET /api/price-quotes
export const getAllPriceQuotes = async (req, res) => {
  try {
    let quotes = await PriceQuote.find().sort({ updatedAt: -1 });

    // Auto-seed if empty
    if (!quotes || quotes.length === 0) {
      await PriceQuote.insertMany(DEFAULT_PRICE_QUOTES);
      quotes = await PriceQuote.find().sort({ updatedAt: -1 });
    }

    res.json({
      success: true,
      data: quotes
    });
  } catch (err) {
    console.error("Error fetching price quotes:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/price-quotes/:code
export const getPriceQuoteByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const regex = new RegExp(`^${code}$`, "i");

    // 1. Find by exact productCode
    let quote = await PriceQuote.findOne({ productCode: regex });

    // 2. Fallback: find if any item in the table has this code (e.g. searching "SR3" inside "CK-DE")
    if (!quote) {
      quote = await PriceQuote.findOne({ "items.code": regex });
    }

    // 3. Fallback: find by default data
    if (!quote) {
      const defaultItem = DEFAULT_PRICE_QUOTES.find(
        (q) =>
          q.productCode.toLowerCase() === code.toLowerCase() ||
          q.items.some((it) => it.code.toLowerCase() === code.toLowerCase())
      );
      if (defaultItem) {
        quote = defaultItem;
      }
    }

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: `Không tìm thấy bảng giá cho mã sản phẩm: ${code}`
      });
    }

    res.json({
      success: true,
      data: quote
    });
  } catch (err) {
    console.error("Error fetching single price quote:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/price-quotes (Create or Upsert)
export const savePriceQuote = async (req, res) => {
  try {
    const { productCode, productTitle, category, title, effectiveDate, items, addons, policies } = req.body;

    if (!productCode) {
      return res.status(400).json({ success: false, message: "Mã sản phẩm (productCode) là bắt buộc!" });
    }

    const updated = await PriceQuote.findOneAndUpdate(
      { productCode: new RegExp(`^${productCode.trim()}$`, "i") },
      {
        productCode: productCode.trim().toUpperCase(),
        productTitle: productTitle || "",
        category: category || "cuakeo",
        title: title || "Bảng giá cập nhật sản phẩm",
        effectiveDate: effectiveDate || "Áp dụng từ năm 2026",
        items: items || [],
        addons: addons || [],
        policies: policies || {}
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: `Đã lưu bảng giá cho sản phẩm ${productCode} thành công!`,
      data: updated
    });
  } catch (err) {
    console.error("Error saving price quote:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/price-quotes/:id
export const deletePriceQuote = async (req, res) => {
  try {
    const { id } = req.params;
    await PriceQuote.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Đã xóa bảng giá thành công!"
    });
  } catch (err) {
    console.error("Error deleting price quote:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/price-quotes/seed-defaults
export const seedDefaults = async (req, res) => {
  try {
    for (const q of DEFAULT_PRICE_QUOTES) {
      await PriceQuote.findOneAndUpdate(
        { productCode: q.productCode },
        q,
        { upsert: true, new: true }
      );
    }
    const allQuotes = await PriceQuote.find().sort({ updatedAt: -1 });
    res.json({
      success: true,
      message: "Đã khôi phục dữ liệu bảng giá mẫu thành công!",
      data: allQuotes
    });
  } catch (err) {
    console.error("Error seeding default price quotes:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


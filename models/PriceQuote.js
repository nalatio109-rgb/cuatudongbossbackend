import mongoose from "mongoose";

const priceQuoteItemSchema = new mongoose.Schema(
  {
    stt: { type: Number, default: 1 },
    code: { type: String, required: true }, // e.g. "SR3", "SR2", "SR1", "VIP"
    name: { type: String, default: "" }, // e.g. "Thân cửa kéo SR3"
    description: { type: String, default: "" }, // Multiline specs, thickness, material
    unit: { type: String, default: "m2" }, // "m2", "Bộ", "md"
    colors: { type: String, default: "Ghi sáng, vàng kem, cà phê, xanh" },
    priceOver8: { type: String, default: "" }, // "980,000"
    price6to8: { type: String, default: "" }, // "1,010,000"
    price4to6: { type: String, default: "" }, // "1,030,000"
    note: { type: String, default: "" }
  },
  { _id: false }
);

const priceQuoteAddonSchema = new mongoose.Schema(
  {
    category: { type: String, default: "" }, // e.g. "Ray Inox", "Trụ khóa"
    name: { type: String, required: true }, // e.g. "Ray Inox đặc 201 chìm"
    price: { type: String, required: true }, // e.g. "+ 280.000 đồng/md"
    unit: { type: String, default: "md" }
  },
  { _id: false }
);

const priceQuotePoliciesSchema = new mongoose.Schema(
  {
    included: {
      type: String,
      default: "Thân cửa theo quy cách, lá chắn, máng đúc, bi treo chịu lực, sơn tĩnh điện AkzoNobel CHLB Đức, công khảo sát đo đạc thực tế tại công trình."
    },
    excluded: {
      type: String,
      default: "Chi phí vận chuyển & nhân công lắp đặt hoàn thiện (thường dao động khoảng 10 – 20% giá trị cửa tùy địa hình và kết cấu công trình)."
    },
    conditionNote: {
      type: String,
      default: "Đơn giá áp dụng cho các kích thước cửa tiêu chuẩn. Với các công trình đặc thù, diện tích dưới 4m² hoặc yêu cầu sơn màu đặc biệt, xin vui lòng liên hệ kỹ thuật để có báo giá chuẩn xác."
    },
    warrantyNote: {
      type: String,
      default: "Thân cửa bảo hành chính hãng từ 5 đến 10 năm theo tiêu chuẩn nhà máy BossDoor. Hỗ trợ kỹ thuật 24/7 tận nơi tại Đà Nẵng."
    },
    commitmentNote: {
      type: String,
      default: "BossDoor Đà Nẵng cam kết luôn mang đến mức giá cạnh tranh, minh bạch 100%, không phát sinh phụ phí ngoài hợp đồng. Giúp khách hàng dễ dàng cân đối giữa chất lượng sản phẩm và ngân sách đầu tư."
    }
  },
  { _id: false }
);

const priceQuoteSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true, unique: true }, // e.g. "CK-DE", "SR3", "BEC.5810", "DL-75"
    productTitle: { type: String, default: "" },
    category: { type: String, default: "cuakeo" }, // cuakeo, cuacuon, phukien, cuatudong
    title: { 
      type: String, 
      default: "Bảng giá cập nhật cửa kéo công nghệ Đức 2026 tại Đà Nẵng" 
    },
    effectiveDate: { 
      type: String, 
      default: "Áp dụng từ năm 2026 cho đến khi có thông báo mới" 
    },
    items: [priceQuoteItemSchema],
    addons: [priceQuoteAddonSchema],
    policies: {
      type: priceQuotePoliciesSchema,
      default: () => ({})
    }
  },
  { timestamps: true }
);

export default mongoose.model("PriceQuote", priceQuoteSchema);


import Review from "../models/Review.js";

const DEFAULT_REVIEWS = [
  {
    name: "Anh Nguyễn Văn Hùng",
    email: "hung.nv@gmail.com",
    role: "",
    avatar: "H",
    rating: 5,
    text: "Lắp cửa cuốn cho garage nhà mình, nhân viên tư vấn rất nhiệt tình và chuyên nghiệp. Thi công nhanh gọn chỉ trong 1 buổi sáng. Cửa vận hành êm, đẹp hơn mình tưởng. Rất hài lòng!",
    color: "#07522f",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    verified: true,
  },
  {
    name: "Chị Trần Thị Lan",
    email: "lan.tran@gmail.com",
    role: "",
    avatar: "L",
    rating: 5,
    text: "Mình đã lắp cửa kéo inox cho shop thời trang. Chất lượng vượt kỳ vọng, inox sáng bóng, kéo rất nhẹ. Khách vào hay khen cửa đẹp. Boss Đà Nẵng làm việc uy tín, bảo hành chu đáo.",
    color: "#b45309",
    verified: true,
  },
  {
    name: "Anh Lê Minh Tú",
    email: "tu.le.kts@gmail.com",
    role: "",
    avatar: "T",
    rating: 5,
    text: "Tôi giới thiệu Boss Đà Nẵng cho nhiều dự án rồi. Họ có đủ loại cửa từ phổ thông đến cao cấp, báo giá minh bạch, không phát sinh. Đặc biệt đội thi công làm đúng bản vẽ kỹ thuật.",
    color: "#1d4ed8",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
    verified: true,
  },
  {
    name: "Chị Phạm Thu Hà",
    email: "thuha.pham@gmail.com",
    role: "",
    avatar: "H",
    rating: 5,
    text: "Lắp cửa trượt tự động cho công ty, cảm biến rất nhạy và êm ái. Nhân viên kỹ thuật hướng dẫn sử dụng tận tình. Sau 6 tháng dùng vẫn hoạt động tốt. Sẽ tiếp tục ủng hộ Boss!",
    color: "#7c3aed",
    verified: true,
  },
  {
    name: "Anh Đặng Quốc Bảo",
    email: "baodang.res@gmail.com",
    role: "",
    avatar: "B",
    rating: 5,
    text: "Boss tư vấn lắp barrier tự động cho bãi xe nhà hàng. Hệ thống chạy ổn định, dùng thẻ từ rất tiện. Giá cả cạnh tranh so với thị trường. Nhân viên phản hồi nhanh khi cần hỗ trợ.",
    color: "#0e7490",
    verified: true,
  },
];

// GET /api/reviews - Lấy toàn bộ danh sách đánh giá
export const getReviews = async (req, res) => {
  try {
    let reviews = await Review.find().sort({ createdAt: -1 });
    
    // Tự động khởi tạo dữ liệu mẫu nếu database chưa có đánh giá nào
    if (reviews.length === 0) {
      await Review.insertMany(DEFAULT_REVIEWS);
      reviews = await Review.find().sort({ createdAt: -1 });
    }

    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/reviews - Khách hàng gửi đánh giá mới
export const createReview = async (req, res) => {
  try {
    const { name, email, role, avatar, rating, text, color, mediaType, mediaUrl, verified } = req.body;
    
    if (!name || !text) {
      return res.status(400).json({
        success: false,
        message: "Tên người đánh giá và nội dung nhận xét là bắt buộc"
      });
    }

    const newReview = await Review.create({
      name,
      email: email || "",
      role: role || "",
      avatar: avatar || (name ? name[0].toUpperCase() : "K"),
      rating: Number(rating) || 5,
      text: text.trim(),
      color: color || "#07522f",
      mediaType: mediaType || null,
      mediaUrl: mediaUrl || "",
      verified: verified !== undefined ? verified : true
    });

    res.status(201).json({
      success: true,
      message: "Gửi đánh giá thành công! Cảm ơn bạn đã đóng góp trải nghiệm.",
      data: newReview
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/reviews/:id - Quản trị viên xóa đánh giá (QUY TẮC: CHỈ ĐƯỢC XÓA, KHÔNG ĐƯỢC SỬA)
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đánh giá cần xóa" });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Đã xóa đánh giá thành công khỏi hệ thống"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


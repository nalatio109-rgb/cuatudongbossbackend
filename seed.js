import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import Project from "./models/Project.js";
import News from "./models/News.js";

dotenv.config();

const sampleProducts = [
  // 1. CỬA CUỐN
  {
    category: "cuacuon",
    image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=800&q=80",
    title: "CỬA CUỐN KHE THOÁNG ĐỨC BOSSDOOR",
    code: "BD-900",
    description: "Thân cửa hợp kim nhôm 6063-T5 cao cấp, sơn tĩnh điện CHLB Đức bảo hành 10 năm.",
    details: "Dòng cửa cuốn cao cấp thế hệ mới BossDoor tích hợp công nghệ chống sao chép mã khoá, cảm biến tự dừng khi gặp vật cản và điều khiển qua Smartphone từ xa.",
    specs: ["Hợp kim nhôm 6063-T5 siêu bền", "Độ dày nan: 1.4 - 2.2 mm", "Cảm biến hồng ngoại an toàn", "Bảo hành mô-tơ 5 năm"],
    badge: "BÁN CHẠY",
    price: "1.450.000đ/m2"
  },
  {
    category: "cuacuon",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    title: "CỬA CUỐN ĐÀI LOAN GIÁ RẺ",
    code: "DL-75",
    description: "Thép mạ màu Đài Loan độ bền cao, giải pháp tối ưu chi phí cho nhà xưởng & cửa hàng.",
    details: "Cửa cuốn công nghệ Đài Loan chất liệu tôn mạ màu nhập khẩu, chống rỉ sét tốt, vận hành bằng lò xo trợ lực hoặc mô tơ điện kéo êm ái.",
    specs: ["Tôn mạ màu Đài Loan 0.6 - 1.2mm", "Chống ăn mòn thời tiết", "Kéo tay hoặc chạy mô tơ", "Bảo hành 2 năm"],
    badge: "TIẾT KIỆM",
    price: "420.000đ/m2"
  },
  {
    category: "cuacuon",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    title: "CỬA CUỐN TẤM LIỀN ÚC SIÊU ÊM",
    code: "BD-L70",
    description: "Đóng mở êm ái không tiếng ồn, hợp kim thép Colorbond Úc chống ăn mòn.",
    details: "Cửa cuốn tấm liền bằng thép hợp kim mạ nhôm kẽm Colorbond của Úc, tích hợp dây cao su polyguide giảm chấn giúp vận hành cực kỳ êm ái.",
    specs: ["Thép mạ kẽm Colorbond Úc", "Tích hợp chốt ly khai thoát hiểm", "Tốc độ đóng mở 15-20 cm/s", "Bảo hành 3 năm"],
    badge: "MỚI",
    price: "980.000đ/m2"
  },
  {
    category: "cuacuon",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    title: "CỬA CUỐN SONG NGANG - MẮC VÕNG INOX / SƠN TĨNH ĐIỆN",
    code: "SN-100",
    description: "Thông thoáng tối đa, góc quan sát rộng cho TTTM, ngân hàng, gara.",
    details: "Cửa cuốn song ngang mắc võng chất liệu Inox 304 hoặc sắt sơn tĩnh điện cao cấp, đảm bảo an toàn tuyệt đối mà vẫn giữ không gian thông thoáng.",
    specs: ["Inox 304 / Sắt sơn tĩnh điện", "Ống phi 19 - 22mm dày 1.0 - 1.2mm", "Tầm nhìn thông thoáng 90%", "Bảo hành 3 năm"],
    badge: "HOT",
    price: "1.200.000đ/m2"
  },
  {
    category: "cuacuon",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    title: "CỬA CUỐN CAO CẤP THẾ HỆ MỚI BOSSDOOR",
    code: "BD-LUX",
    description: "Dòng cửa cuốn siêu sang tích hợp AI, sơn tĩnh điện AkzoNobel CHLB Đức.",
    details: "Phiên bản đỉnh cao của BossDoor với thiết kế nan chèn cao su giảm chấn 2 chiều, sơn bột tĩnh điện AkzoNobel Đức gia nhiệt cao cấp.",
    specs: ["Hợp kim nhôm hàng không 6063-T6", "Sơn AkzoNobel Đức bảo hành 10 năm", "Kết nối Smarthome thông minh", "Bảo hành 10 năm"],
    badge: "LUXURY",
    price: "2.100.000đ/m2"
  },

  // 2. PHỤ KIỆN CỬA CUỐN
  {
    category: "phukien",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    title: "MÔ TƠ CỬA CUỐN NHẬP KHẨU ĐÀI LOAN / ĐỨC",
    code: "MT-500",
    description: "Động cơ dây đồng 100%, sức kéo mạnh mẽ 300kg - 1000kg, chống hành trình tràn.",
    details: "Mô tơ cửa cuốn chính hãng tích hợp rơ-le nhiệt tự ngắt khi quá tải, phanh đĩa kép an toàn và bộ tự dừng khi gặp chướng ngại vật.",
    specs: ["Lõi đồng 100% nguyên chất", "Sức kéo: 300kg - 1000kg", "Tích hợp đảo chiều an toàn", "Bảo hành 5 năm 1 đổi 1"],
    badge: "CHÍNH HÃNG",
    price: "3.500.000đ/bộ"
  },
  {
    category: "phukien",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80",
    title: "BÌNH LƯU ĐIỆN CỬA CUỐN (UPS DỰ PHÒNG)",
    code: "UPS-800",
    description: "Lưu điện dự phòng thông minh 48h - 72h khi xảy ra cúp điện lưới.",
    details: "Bộ lưu điện UPS chuyên dụng cho cửa cuốn sử dụng ắc quy khô tích điện công nghệ Gel, mạch sạc tự động bảo vệ bình không bị chai.",
    specs: ["Thời gian chờ: 48 - 72 giờ", "Công suất: 800W - 1500W", "Tự động chuyển nguồn khi cúp điện", "Bảo hành 2 năm"],
    badge: "NỔI BẬT",
    price: "2.800.000đ/bộ"
  },
  {
    category: "phukien",
    image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=800&q=80",
    title: "BỘ ĐIỀU KHIỂN CỬA CUỐN QUA ĐIỆN THOẠI (SMART WIFI)",
    code: "WF-APP",
    description: "Đóng mở cửa từ xa mọi lúc mọi nơi qua Smartphone 4G/Wi-Fi, cảnh báo đột nhập.",
    details: "Module điều khiển thông minh kết nối ứng dụng Tuya/Smart Life, phân quyền người dùng gia đình, lưu lịch sử đóng mở và camera giám sát real-time.",
    specs: ["Kết nối Wi-Fi & 4G toàn cầu", "Cảnh báo mở cửa về điện thoại", "Chia sẻ quyền quản lý gia đình", "Bảo hành 2 năm"],
    badge: "SMART",
    price: "1.200.000đ/bộ"
  },
  {
    category: "phukien",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    title: "TAY ĐIỀU KHIỂN & HỘP ĐIỀU KHIỂN CHỐNG DÒ MÃ",
    code: "RF-433",
    description: "Tay remote inox chống nước, công nghệ Rolling Code mã nhảy chống sao chép.",
    details: "Bộ hộp thu phát tín hiệu sóng RF 433MHz tần số mã nhảy tự đổi hàng tỉ mã sau mỗi lần bấm, ngăn chặn hoàn toàn thiết bị dò sóng.",
    specs: ["Mã nhảy Rolling Code an toàn", "Khoảng cách điều khiển: 50 - 100m", "Tay remote chống nước IP65", "Bảo hành 2 năm"],
    badge: "AN TOÀN",
    price: "650.000đ/bộ"
  },

  // 3. CỬA KÉO
  {
    category: "cuakeo",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    title: "CỬA KÉO ĐÀI LOAN CÓ LÁ / KHÔNG LÁ",
    code: "CK-DL",
    description: "Thân cửa thép mạ màu Đài Loan, nhíp keo hoa văn sang trọng, kéo nhẹ êm.",
    details: "Cửa kéo Đài Loan chất liệu tôn mạ màu nhập khẩu, nhíp ép thủy lực chắc chắn, bạc đạn bạc inox giúp đóng mở siêu nhẹ nhàng.",
    specs: ["Độ dày U: 0.6mm - 1.4mm", "Nhíp sơn tĩnh điện hoa văn", "Bạc đạn inox chống kẹt", "Bảo hành 2 năm"],
    badge: "BÁN CHẠY",
    price: "480.000đ/m2"
  },
  {
    category: "cuakeo",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    title: "CỬA KÉO CÔNG NGHỆ ĐỨC (CN ĐỨC SƠN TĨNH ĐIỆN)",
    code: "CK-DE",
    description: "Thanh U hợp kim nhôm sơn tĩnh điện CHLB Đức, kiểu dáng hiện đại bền đẹp 15 năm.",
    details: "Cửa kéo CN Đức cao cấp sản xuất từ hợp kim nhôm sơn tĩnh điện ngoài trời AkzoNobel, không han gỉ, vận hành êm nhẹ gấp 3 lần cửa sắt thông thường.",
    specs: ["Hợp kim nhôm Đức siêu nhẹ", "Sơn AkzoNobel bền màu 15 năm", "Nhíp lá nhôm đúc định hình", "Bảo hành 5 năm"],
    badge: "CAO CẤP",
    price: "1.100.000đ/m2"
  },
  {
    category: "cuakeo",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    title: "CỬA KÉO INOX 304 CAO CẤP",
    code: "CK-IX304",
    description: "100% Inox 304 sáng bóng không rỉ sét, chịu lực tối đa cho mặt phố & biệt thự.",
    details: "Dòng cửa kéo cao cấp bằng Inox 304 nguyên chất chống ăn mòn hóa chất và nước biển, cực kỳ thích hợp cho thời tiết ven biển Đà Nẵng.",
    specs: ["100% Inox 304 chuẩn", "Thanh U dày 1.0 - 1.5mm", "Không gỉ sét dưới mọi thời tiết", "Bảo hành 10 năm"],
    badge: "SIÊU BỀN",
    price: "1.850.000đ/m2"
  },

  // 4. CỔNG CỬA TỰ ĐỘNG
  {
    category: "cuatudong",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    title: "CỔNG TỰ ĐỘNG ÂM SÀN / TAY CO ITALIA",
    code: "IT-GHOST",
    description: "Mô-tơ âm sàn chống nước IP67, điều khiển Smartphone cho Biệt thự & Villa.",
    details: "Hệ thống cổng mở xoay âm sàn nhập khẩu Ý 100%, động cơ đúc nguyên khối chống ngập nước tiêu chuẩn IP67, chịu tải nặng tới 800kg/cánh.",
    specs: ["Tiêu chuẩn chống nước IP67 Ý", "Tải trọng: 800kg / cánh", "Góc mở: 110° - 180°", "Bảo hành 5 năm"],
    badge: "VIP",
    price: "32.000.000đ/bộ"
  },
  {
    category: "cuatudong",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=80",
    title: "CỬA TRƯỢT TỰ ĐỘNG KABA / NABCO NHẬT BẢN",
    code: "NAB-150",
    description: "Mắt thần cảm biến radar vi sóng siêu nhạy, vận hành êm ái cho TTTM, sảnh lớn.",
    details: "Cửa kính trượt tự động cao cấp nhập khẩu Nhật Bản / Thụy Sĩ. Động cơ DC không chổi than êm ái, hoạt động liên tục với tuổi thọ > 2.000.000 lần đóng mở.",
    specs: ["Động cơ DC Brushless 120W", "Tải trọng: 150kg x 2 cánh", "Cảm biến an toàn chống kẹp người", "Bảo hành 3 năm"],
    badge: "HOT",
    price: "18.500.000đ/bộ"
  },

  // 5. NHÔM KÍNH
  {
    category: "nhomkinh",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    title: "CỬA NHÔM XINGFA QUẢNG ĐÔNG TEM ĐỎ CHÍNH HÃNG",
    code: "XF-55",
    description: "Nhôm Xingfa nhập khẩu tem đỏ Quảng Đông, phụ kiện CMECH / Kinlong cao cấp.",
    details: "Hệ cửa nhôm kính cao cấp với bề mặt sơn tĩnh điện dạng kim xám/trắng/vàng kim, kính hộp 2 lớp hút chân không cách âm cách nhiệt lên tới 95%.",
    specs: ["Nhôm Xingfa Quảng Đông tem đỏ", "Độ dày thanh nhôm: 1.4 - 2.0 mm", "Kính hộp cách âm cách nhiệt", "Bảo hành 10 năm"],
    badge: "NỔI BẬT",
    price: "2.200.000đ/m2"
  }
];

const sampleProjects = [
  {
    title: "Cửa Trượt Siêu Thị Lotte Đà Nẵng",
    category: "Cửa Trượt Tự Động",
    location: "Sơn Trà, Đà Nẵng",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=80",
    description: "Lắp đặt toàn bộ hệ thống cửa kính trượt tự động Nabco Nhật Bản.",
    completedDate: "12/2023"
  },
  {
    title: "Cổng Tự Động Biệt Thự Euro Village",
    category: "Cổng Tự Động Âm Sàn",
    location: "Sơn Trà, Đà Nẵng",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    description: "Thi công cổng mở xoay 2 cánh tự động động cơ Italia cao cấp.",
    completedDate: "02/2024"
  },
  {
    title: "Cửa Xoay Khách Sạn 5 Sao Muống Thanh",
    category: "Cửa Xoay Tự Động",
    location: "Ngũ Hành Sơn, Đà Nẵng",
    image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=800&q=80",
    description: "Hệ thống cửa xoay sảnh chính hiện đại chuẩn sang trọng 5 sao.",
    completedDate: "04/2024"
  },
  {
    title: "Barie Tự Động Khu Công Nghiệp Hòa Khánh",
    category: "Barie Kiểm Soát",
    location: "Liên Chiểu, Đà Nẵng",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    description: "Lắp đặt 4 làn Barie thông minh tích hợp nhận diện biển số xe.",
    completedDate: "05/2024"
  }
];

const sampleNews = [
  {
    title: "Cách chọn cửa cuốn phù hợp cho ngôi nhà của bạn",
    slug: "cach-chon-cua-cuon-phu-hop",
    image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=600&q=80",
    date: "26/05/2024",
    summary: "Hướng dẫn chọn mua cửa cuốn khe thoáng, cửa cuốn tấm liền chuẩn kích thước và an toàn.",
    content: "Nội dung chi tiết hướng dẫn lựa chọn cửa cuốn khe thoáng..."
  },
  {
    title: "Ưu điểm của cửa tự động trong không gian hiện đại",
    slug: "uu-diem-cua-cua-tu-dong",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=600&q=80",
    date: "15/05/2024",
    summary: "Tại sao các văn phòng, TTTM và biệt thự hiện đại chọn giải pháp cửa trượt tự động?",
    content: "Cửa tự động mang lại sự tiện nghi vượt trội..."
  },
  {
    title: "Cửa khe thoáng - Giải pháp lấy sáng và lưu thông khí",
    slug: "cua-khe-thoang-giai-phap-lay-sang",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
    date: "10/05/2024",
    summary: "Khám phá dòng cửa cuốn khe thoáng BossDoor với công nghệ giảm chấn 2 chiều.",
    content: "Cửa khe thoáng giúp tối ưu không gian sống..."
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/boss_danang";
    await mongoose.connect(mongoUri);
    console.log("[Seed] Connected to MongoDB:", mongoUri);

    await Product.deleteMany({});
    await Project.deleteMany({});
    await News.deleteMany({});

    console.log("[Seed] Cleared existing products, projects, and news.");

    await Product.insertMany(sampleProducts);
    console.log(`[Seed] Seeded ${sampleProducts.length} products.`);

    await Project.insertMany(sampleProjects);
    console.log(`[Seed] Seeded ${sampleProjects.length} projects.`);

    await News.insertMany(sampleNews);
    console.log(`[Seed] Seeded ${sampleNews.length} news articles.`);

    console.log("[Seed] Data Seeding Completed Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("[Seed Error]", error.message);
    process.exit(1);
  }
};

seedData();

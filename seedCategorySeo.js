import mongoose from "mongoose";
import dotenv from "dotenv";
import CategorySeo from "./models/CategorySeo.js";

dotenv.config();

const defaultCategorySeoData = [
  {
    category: "cuacuon",
    metaTitle: "Cửa Cuốn Đà Nẵng - Báo Giá & Lắp Đặt Cửa Cuốn BossDoor Chính Hãng 2026",
    metaDescription: "Đại lý phân phối & thi công cửa cuốn BossDoor tại Đà Nẵng: cửa cuốn khe thoáng Đức, tấm liền Úc, cửa cuốn Đài Loan. Khảo sát miễn phí, mô tơ lõi đồng, bảo hành 10 năm.",
    h1: "Cửa Cuốn Đà Nẵng - Báo Giá & Thi Công Lắp Đặt Cửa Cuốn BossDoor Chính Hãng",
    summary:
      "Tại Đà Nẵng – thành phố ven biển với tốc độ đô thị hóa nhanh và đặc thù thời tiết mưa bão, việc lựa chọn một bộ cửa cuốn vững chắc, vận hành êm ái và chống ăn mòn là tiêu chí hàng đầu cho mọi ngôi nhà phố, biệt thự và cơ sở kinh doanh. Boss Đà Nẵng tự hào là đơn vị phân phối và thi công trực tiếp các dòng cửa cuốn BossDoor Tân Trường Sơn công nghệ Đức, cửa cuốn tấm liền Úc và cửa cuốn Đài Loan chính hãng, cam kết chất lượng chuẩn quốc tế, bảo hành thân cửa lên tới 10 năm và hỗ trợ kỹ thuật 24/7.",
    content: "Cửa cuốn BossDoor thế hệ mới là giải pháp bảo vệ an ninh hiện đại hàng đầu hiện nay. Nhờ ứng dụng công nghệ sơn tĩnh điện AkzoNobel CHLB Đức cùng phôi nhôm 6063-T5 tiêu chuẩn quốc tế, cửa cuốn đạt khả năng chống oxy hóa do hơi muối mặn ven biển Đà Nẵng vượt trội.\n\nHệ thống nan cửa chèn đệm cao su giảm chấn 2 chiều triệt tiêu đến 90% tiếng ồn khi vận hành. Tích hợp cảm biến tự dừng khi gặp vật cản và công nghệ chống sao chép mã khóa Rolling Code mang lại sự an tâm tuyệt đối cho gia đình.",
    targetKeywords: ["cửa cuốn Đà Nẵng", "cửa cuốn BossDoor", "cửa cuốn khe thoáng Đức", "cửa cuốn tấm liền Úc", "báo giá cửa cuốn Đà Nẵng", "lắp đặt cửa cuốn tại Đà Nẵng"],
    structureAndTech: {
      title: "Cấu Tạo Kỹ Thuật & Nguyên Lý Hoạt Động Cửa Cuốn BossDoor",
      desc: "Một bộ cửa cuốn đạt tiêu chuẩn an toàn cao cấp tại Boss Đà Nẵng được cấu thành đồng bộ từ các bộ phận cơ khí chính xác:",
      points: [
        {
          heading: "Thân cửa (Nan cửa)",
          detail: "Đúc từ hợp kim nhôm định hình 6063-T5 hoặc 6063-T6 hàng không siêu cứng, độ dày từ 1.2mm đến 2.2mm. Bề mặt sơn bột tĩnh điện ngoài trời AkzoNobel CHLB Đức, chống phai màu, chống trầy xước và kháng muối mặn ven biển Đà Nẵng trên 10 năm."
        },
        {
          heading: "Trục cuốn & Buly giảm chấn",
          detail: "Trục thép mạ kẽm phi 114mm hoặc 168mm chịu lực uốn tối đa, tích hợp hệ puly nhựa kỹ thuật bọc đệm cao su Polyguide giúp nan cửa cuộn tròn êm ái, triệt tiêu đến 90% tiếng ồn khi vận hành."
        },
        {
          heading: "Ray dẫn hướng & Gioăng cao su",
          detail: "Ray hợp kim nhôm dạng hộp có gân tăng cứng, lót nỉ chống mài mòn và gioăng cao su giảm chấn 2 chiều giúp cửa không bị va đập khi gió bão cấp 10 - 12 thổi trực diện."
        },
        {
          heading: "Hệ thống động cơ & Điều khiển an toàn",
          detail: "Mô tơ xích hoặc mô tơ ống lõi đồng 100%, tích hợp cảm biến hồng ngoại tự dừng/đảo chiều khi chạm vật cản, rơ-le nhiệt chống cháy nổ và hộp điều khiển mã nhảy Rolling Code chống sao chép tuyệt đối."
        }
      ]
    },
    benefitsTitle: "Ưu Điểm & Lợi Ích Vượt Trội Khi Chọn Mua Tại Boss Đà Nẵng",
    benefits: [
      {
        title: "An Toàn Chống Trộm Vượt Trội",
        desc: "Công nghệ chống kích bẩy khóa và hộp điều khiển tần số mã nhảy Rolling Code tự biến đổi hàng tỷ mã sóng sau mỗi lần bấm, loại bỏ 100% rủi ro bị máy dò sóng sao chép."
      },
      {
        title: "Vận Hành Siêu Êm & Bền Bỉ",
        desc: "Nan cửa ghép nối ăn khớp có đệm cao su giảm chấn 2 chiều độc quyền BossDoor, giảm rung lắc và tiếng ồn tối đa khi đóng mở vào sáng sớm hay đêm muộn."
      },
      {
        title: "Lấy Sáng & Thoáng Khí Linh Hoạt",
        desc: "Các ô khe thoáng thông minh dạng oval hoặc chữ nhật cho phép ánh sáng tự nhiên và gió trời đối lưu vào nhà ngay cả khi cửa đang khóa an toàn."
      },
      {
        title: "Chống Chịu Gió Bão Miền Trung",
        desc: "Nan nhôm hợp kim dày dặn kết hợp khóa ray bão chuyên dụng, chịu được sức gió bão giật lên đến cấp 12, đặc biệt phù hợp thời tiết ven biển Đà Nẵng."
      }
    ],
    applications: {
      title: "Ứng Dụng Thực Tế Tại Đà Nẵng",
      items: [
        "Nhà phố, nhà ống mặt tiền các trục đường sầm uất: Nguyễn Văn Linh, Điện Biên Phủ, Lê Duẩn, Nguyễn Lương Bằng...",
        "Gara ô tô gia đình, tầng hầm nhà phố liền kề, căn hộ cho thuê tại Cẩm Lệ, Thanh Khê, Liên Chiểu.",
        "Biệt thự cao cấp, Villa nghỉ dưỡng tại Sơn Trà, Ngũ Hành Sơn yêu cầu tính thẩm mỹ sang trọng và kết nối Smarthome.",
        "Mặt bằng kinh doanh, showroom, ngân hàng, ki-ốt chợ trung tâm, nhà kho nhà xưởng tại Khu công nghiệp Hòa Khánh."
      ]
    },
    buyingGuide: {
      title: "Kinh Nghiệm Chọn Mua Cửa Cuốn Chuẩn Xác & Tiết Kiệm Chi Phí",
      steps: [
        "Xác định kích thước thông thủy và vị trí lắp đặt: Cửa diện tích lớn (>15m2) nên dùng nan nhôm khe thoáng dày 1.4 - 2.2mm và mô tơ xích từ 500kg - 800kg để đảm bảo độ võng cho phép.",
        "Chọn dòng nan phù hợp nhu cầu: Nhà mặt phố cần thoáng mát nên chọn nan khe thoáng BossDoor; gara hoặc cửa hàng cần tốc độ đóng mở nhanh và êm nhẹ nên chọn cửa cuốn tấm liền Úc; nhà kho xưởng nên chọn cửa cuốn Đài Loan để tối ưu ngân sách.",
        "Đừng quên trang bị bình lưu điện UPS: Thời tiết mưa bão Đà Nẵng dễ cúp điện đột ngột. Bình lưu điện UPS chính hãng giúp bạn đóng mở cửa an toàn 48 - 72h ngay cả khi mất điện lưới.",
        "Lựa chọn đại lý chính hãng có bảo hành thực tế: Tuyệt đối tránh các cơ sở trôi nổi sử dụng nan nhôm pha tạp hoặc mô tơ cuốn nhôm dễ cháy hỏng sau vài tháng."
      ]
    },
    faqs: [
      {
        q: "Giá 1 bộ cửa cuốn tại Đà Nẵng hiện nay khoảng bao nhiêu tiền?",
        a: "Giá cửa cuốn phụ thuộc vào diện tích và loại nan: Dòng cửa cuốn Đài Loan giá từ 420.000đ - 750.000đ/m2; Dòng tấm liền công nghệ Úc từ 850.000đ - 1.150.000đ/m2; Dòng khe thoáng nhôm BossDoor công nghệ Đức cao cấp từ 1.350.000đ - 2.500.000đ/m2. Boss Đà Nẵng cung cấp dịch vụ khảo sát và lên báo giá chi tiết tận nơi hoàn toàn miễn phí."
      },
      {
        q: "Cửa cuốn BossDoor có bền trước môi trường muối biển và gió bão Đà Nẵng không?",
        a: "Hoàn toàn bền vững! Thân cửa BossDoor được sản xuất từ phôi nhôm Billet 6063 tiêu chuẩn xuất khẩu và bề mặt phủ sơn tĩnh điện gốc nhiệt AkzoNobel CHLB Đức. Lớp sơn này có khả năng chống tia UV, kháng oxy hóa muối biển và được bảo hành chính hãng không bong tróc bay màu lên tới 10 năm."
      },
      {
        q: "Mất điện thì cửa cuốn mở như thế nào?",
        a: "Nếu đã lắp bình lưu điện UPS, cửa vẫn đóng mở tự động bình thường bằng remote. Trong trường hợp không có lưu điện, cửa cuốn tấm liền có chốt ly hợp gạt nhẹ sang chế độ cơ để đẩy tay; còn cửa cuốn khe thoáng dùng xích kéo tay trợ lực của mô tơ để nâng cửa lên dễ dàng."
      },
      {
        q: "Thời gian khảo sát, sản xuất và thi công cửa cuốn mất bao lâu?",
        a: "Sau khi tiếp nhận yêu cầu, kỹ sư Boss Đà Nẵng có mặt khảo sát đo đạc trong 30 - 60 phút. Thời gian gia công sản xuất cửa cuốn chuẩn kích thước tại xưởng là 24 - 48 giờ. Thời gian lắp đặt hoàn thiện tại công trình chỉ mất từ 3 - 5 giờ làm việc."
      }
    ]
  },
  {
    category: "phukien",
    metaTitle: "Phụ Kiện Cửa Cuốn Đà Nẵng - Mô Tơ, Bình Lưu Điện UPS, Khóa Remote Chính Hãng",
    metaDescription: "Phân phối phụ kiện cửa cuốn chính hãng tại Đà Nẵng: mô tơ xích lõi đồng 300kg-1000kg, bình lưu điện UPS 48h-72h, bộ điều khiển qua điện thoại wifi, remote chống dò mã.",
    h1: "Phụ Kiện Cửa Cuốn Đà Nẵng - Mô Tơ, Bình Lưu Điện UPS, Khóa Thông Minh Chính Hãng",
    summary:
      "Một bộ cửa cuốn dù có thân nan vững chắc đến đâu cũng không thể vận hành an toàn và bền bỉ nếu thiếu đi hệ thống phụ kiện đồng bộ. Phụ kiện cửa cuốn chính là 'trái tim và bộ não' quyết định độ êm ái, sức kéo tải trọng và khả năng bảo vệ an ninh của ngôi nhà.",
    content: "Hệ thống phụ kiện đồng bộ gồm mô tơ xích tải trọng 300kg - 1000kg lõi đồng nguyên chất, bình lưu điện UPS công nghệ ắc quy Gel vi mạch tự sạc xả, cùng hộp điều khiển mã nhảy Rolling Code chống quét dò sóng.",
    targetKeywords: ["phụ kiện cửa cuốn Đà Nẵng", "mô tơ cửa cuốn Đà Nẵng", "bình lưu điện cửa cuốn UPS"],
    benefitsTitle: "Ưu Điểm Phụ Kiện Chính Hãng Tại Boss Đà Nẵng",
    benefits: [
      { title: "Bảo Mật An Ninh Tuyệt Đối", desc: "Khóa mã nhảy Rolling Code chống dò sóng." },
      { title: "Kéo Tải Mạnh Mẽ, Lõi Đồng 100%", desc: "Mô tơ vận hành êm ái, kéo tải khỏe." }
    ],
    faqs: [
      { q: "Làm thế nào để phân biệt mô tơ dây đồng thật?", a: "Mô tơ dây đồng chính hãng nặng từ 10 - 14kg, chạy êm và không nóng sau nhiều chu kỳ." }
    ]
  },
  {
    category: "cuakeo",
    metaTitle: "Cửa Kéo Đà Nẵng - Báo Giá Cửa Kéo Đài Loan, Inox 304, Cửa Kéo Công Nghệ Đức",
    metaDescription: "Sản xuất & lắp đặt cửa kéo tại Đà Nẵng: Cửa kéo Đài Loan có lá/không lá, cửa kéo Inox 304 không gỉ, cửa kéo CN Đức sơn AkzoNobel.",
    h1: "Cửa Kéo Đà Nẵng - Cửa Kéo Đài Loan, Inox 304 & Cửa Kéo Công Nghệ Đức Chính Hãng",
    summary:
      "Cửa kéo (cửa xếp) luôn là giải pháp bảo vệ an toàn truyền thống nhưng vô cùng kinh tế, bền bỉ và tiện lợi cho các công trình nhà phố, ki-ốt kinh doanh, nhà xưởng và nhà trọ tại Đà Nẵng.",
    content: "Cửa kéo Đà Nẵng gia công chuẩn vi tính từ thanh U dày 0.6mm - 1.4mm, nhíp hoa văn dập nổi tán đinh thủy lực đặc, cùng bạc đạn inox lăn êm trên ray trượt, kéo nhẹ nhàng êm ái.",
    targetKeywords: ["cửa kéo Đà Nẵng", "cửa kéo Đài Loan", "cửa kéo Inox 304"],
    benefitsTitle: "Ưu Điểm Cửa Kéo Tại Boss Đà Nẵng",
    benefits: [
      { title: "Đóng Mở Siêu Nhẹ Tay", desc: "Bạc đạn cao cấp giúp kéo cửa êm ái." },
      { title: "Chống Rỉ Sét Khí Hậu Biển", desc: "Inox 304 và sơn tĩnh điện AkzoNobel bền bỉ." }
    ]
  },
  {
    category: "cuatudong",
    metaTitle: "Cổng Tự Động & Cửa Kính Tự Động Đà Nẵng - Nhập Khẩu Italia, Nhật Bản Chính Hãng",
    metaDescription: "Thi công cổng tự động âm sàn, tay đòn Italia (Ý) và cửa kính trượt tự động Nabco Nhật Bản tại Đà Nẵng.",
    h1: "Cổng Tự Động & Cửa Kính Tự Động Đà Nẵng - Giải Pháp Kiến Trúc Thông Minh",
    summary:
      "Hệ thống cổng tự động đóng mở bằng remote/smartphone và cửa kính trượt cảm biến mắt thần là tiêu chuẩn tiện nghi hàng đầu cho các biệt thự, villa nghỉ dưỡng, khách sạn và trụ sở công ty.",
    content: "Hệ thống tự động hóa thông minh gồm mô tơ âm sàn chống ngập nước IP67 Italia, mô tơ tay đòn thủy lực, cùng mắt thần cảm biến radar vi sóng cửa kính trượt Nabco Nhật Bản.",
    targetKeywords: ["cổng tự động Đà Nẵng", "cửa kính tự động Đà Nẵng", "cổng âm sàn Italia"],
    benefitsTitle: "Đẳng Cấp Tiện Nghi & An Toàn",
    benefits: [
      { title: "Tiện Nghi Đỉnh Cao", desc: "Mở cổng từ xa khoảng cách 30 - 50m bằng remote hoặc Smartphone." },
      { title: "Chống Nước Ngập IP67", desc: "Mô tơ âm sàn đúc kín tiêu chuẩn IP67 an toàn mùa mưa bão." }
    ]
  },
  {
    category: "all",
    metaTitle: "Boss Đà Nẵng - Tổng Kho Cửa Cuốn, Cửa Kéo, Cổng Tự Động Chính Hãng 2026",
    metaDescription: "Boss Đà Nẵng - Chuyên tư vấn, sản xuất & thi công trọn gói: Cửa cuốn BossDoor công nghệ Đức, cửa kéo Inox/Đài Loan, cổng tự động Italia, cửa kính tự động.",
    h1: "Tổng Kho Cửa Cuốn, Cửa Kéo & Cổng Tự Động Boss Đà Nẵng - Báo Giá Trọn Gói 2026",
    summary:
      "Công ty Boss Đà Nẵng là tổng kho phân phối và nhà thầu thi công giải pháp cửa tổng thể hàng đầu tại Đà Nẵng và khu vực miền Trung. Trải qua hơn 10 năm phát triển, chúng tôi tự hào cung cấp danh mục sản phẩm hoàn chỉnh.",
    content: "Boss Đà Nẵng cung cấp giải pháp cửa tổng thể đạt chuẩn chất lượng quốc tế với dịch vụ khảo sát đo đạc miễn phí tận nơi, báo giá gốc tại xưởng và bảo hành chính hãng từ 2 đến 10 năm.",
    targetKeywords: ["cửa cuốn Đà Nẵng", "Boss Đà Nẵng", "cửa kéo Đà Nẵng", "cổng tự động Đà Nẵng"]
  }
];

const seedSeo = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/boss_danang";
    await mongoose.connect(mongoUri);
    console.log("[CategorySeo Seed] Connected to MongoDB");

    for (const item of defaultCategorySeoData) {
      await CategorySeo.findOneAndUpdate(
        { category: item.category },
        item,
        { upsert: true, new: true }
      );
    }
    console.log(`[CategorySeo Seed] Successfully upserted ${defaultCategorySeoData.length} category SEO configs`);
    process.exit(0);
  } catch (err) {
    console.error("[CategorySeo Seed Error]", err.message);
    process.exit(1);
  }
};

seedSeo();


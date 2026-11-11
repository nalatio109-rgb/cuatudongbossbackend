import Contact from "../models/Contact.js";

// POST /api/contacts (Gửi yêu cầu tư vấn / báo giá)
export const submitContact = async (req, res) => {
  try {
    const { 
      fullName, 
      phone, 
      productCategory, 
      productName, 
      productCode, 
      dimensions, 
      quantity, 
      address, 
      message 
    } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        message: "Họ tên và Số điện thoại là thông tin bắt buộc"
      });
    }

    const newContact = await Contact.create({
      fullName,
      phone,
      productCategory: productCategory || "Chưa chọn",
      productName: productName || "",
      productCode: productCode || "",
      dimensions: dimensions || "",
      quantity: quantity || "1",
      address: address || "",
      message: message || ""
    });

    res.status(201).json({
      success: true,
      message: "Gửi yêu cầu báo giá thành công! Kỹ sư BOSS sẽ liên hệ tư vấn và gửi bảng giá chi tiết cho bạn sớm nhất.",
      data: newContact
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/contacts (Lấy danh sách các yêu cầu tư vấn - cho admin)
export const getContacts = async (req, res) => {
  try {
    // Tách bạch hoàn toàn: yêu cầu báo giá chỉ chứa liên hệ tư vấn sản phẩm/dịch vụ, loại bỏ các bản ghi đánh giá
    const contacts = await Contact.find({
      productCategory: { $not: /đánh giá/i }
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/contacts/:id (Cập nhật trạng thái xử lý yêu cầu)
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ success: false, message: "Không tìm thấy yêu cầu liên hệ" });
    }
    res.status(200).json({ success: true, data: updatedContact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/contacts/:id
export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ success: false, message: "Không tìm thấy yêu cầu liên hệ" });
    }
    res.status(200).json({ success: true, message: "Đã xóa yêu cầu thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

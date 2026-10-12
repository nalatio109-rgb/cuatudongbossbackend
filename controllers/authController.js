import crypto from "crypto";
import User from "../models/User.js";

const SECRET_KEY = process.env.JWT_SECRET || "boss_danang_super_secret_key_2026";

export const hashPassword = (password) => {
  return crypto.createHmac("sha256", SECRET_KEY).update(password).digest("hex");
};

// Generate simple secure session token
export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    time: Date.now()
  };
  const str = Buffer.from(JSON.stringify(payload)).toString("base64");
  const signature = crypto.createHmac("sha256", SECRET_KEY).update(str).digest("hex");
  return `${str}.${signature}`;
};

// Auto ensure the default admin account exists
export const initAdminAccount = async () => {
  try {
    const adminEmail = "admin@boss.vn";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        fullName: "Quản Trị Viên BOSS",
        email: adminEmail,
        password: hashPassword("admin123"),
        phone: "0904678323",
        role: "admin"
      });
      console.log(`[Auth] Default admin account initialized: admin@boss.vn / admin123`);
    } else {
      // Ensure password and role are correctly set
      existingAdmin.role = "admin";
      existingAdmin.password = hashPassword("admin123");
      await existingAdmin.save();
    }
  } catch (err) {
    console.error("[Auth] Error initializing admin account:", err.message);
  }
};

// @desc    Register a new account
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ họ tên, email và mật khẩu"
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email này đã được đăng ký tài khoản. Vui lòng đăng nhập!"
      });
    }

    // Role assignment: ONLY admin@boss.vn can be admin, all others are regular users
    const role = cleanEmail === "admin@boss.vn" ? "admin" : "user";

    const newUser = await User.create({
      fullName: fullName.trim(),
      email: cleanEmail,
      password: hashPassword(password),
      phone: phone ? phone.trim() : "",
      role
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: "Đăng ký tài khoản thành công!",
      data: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        token
      }
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ khi đăng ký tài khoản: " + error.message
    });
  }
};

// @desc    Login
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ email và mật khẩu"
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Special check: if admin account doesn't exist yet, initialize it
    if (cleanEmail === "admin@boss.vn") {
      await initAdminAccount();
    }

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Tài khoản email không tồn tại trong hệ thống"
      });
    }

    // Compare password
    const hashed = hashPassword(password);
    if (user.password !== hashed) {
      return res.status(401).json({
        success: false,
        message: "Mật khẩu không chính xác"
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công!",
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ khi đăng nhập: " + error.message
    });
  }
};

// @desc    Get Current User Profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Chưa xác thực đăng nhập" });
    }

    const token = authHeader.split(" ")[1];
    const [b64, signature] = token.split(".");
    const expectedSig = crypto.createHmac("sha256", SECRET_KEY).update(b64).digest("hex");

    if (signature !== expectedSig) {
      return res.status(401).json({ success: false, message: "Token không hợp lệ" });
    }

    const payload = JSON.parse(Buffer.from(b64, "base64").toString());
    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "Không tìm thấy thông tin tài khoản" });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi kiểm tra phiên đăng nhập"
    });
  }
};

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categorySeoRoutes from "./routes/categorySeoRoutes.js";
import priceQuoteRoutes from "./routes/priceQuoteRoutes.js";
import productArticleRoutes from "./routes/productArticleRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { initAdminAccount } from "./controllers/authController.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB & Initialize Default Admin Account
connectDB().then(() => {
  initAdminAccount();
});

// Middleware
const allowedOrigins = [
  "https://cuatudongbossfrontend.vercel.app",
  "http://localhost:3000", 
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve static uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/category-seo", categorySeoRoutes);
app.use("/api/price-quotes", priceQuoteRoutes);
app.use("/api/product-articles", productArticleRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/reviews", reviewRoutes);

// Sitemap & Robots for SEO
app.get("/sitemap.xml", (req, res) => {
  const sitemapPath = path.join(__dirname, "../frontend/public/sitemap.xml");
  res.header("Content-Type", "application/xml");
  res.sendFile(sitemapPath);
});

app.get("/robots.txt", (req, res) => {
  const robotsPath = path.join(__dirname, "../frontend/public/robots.txt");
  res.header("Content-Type", "text/plain");
  res.sendFile(robotsPath);
});

// Root route & Health check
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to BOSS Da Nang Backend API",
    status: "Online",
    endpoints: {
      products: "/api/products",
      projects: "/api/projects",
      contacts: "/api/contacts",
      news: "/api/news",
      categorySeo: "/api/category-seo",
      priceQuotes: "/api/price-quotes",
      productArticles: "/api/product-articles",
      services: "/api/services",
      reviews: "/api/reviews",
      upload: "/api/upload"
    }
  });
});

// 404 Handler for API routes
app.all("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Không tìm thấy endpoint API: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler (Always return JSON, never HTML)
app.use((err, req, res, next) => {
  console.error("Express Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Lỗi máy chủ nội bộ."
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 BOSS Backend Server is running on port: ${PORT}`);
  console.log(`👉 API Base URL: http://localhost:${PORT}`);
  console.log(`==================================================`);
});

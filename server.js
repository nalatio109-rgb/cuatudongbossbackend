import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

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
app.use(express.json());

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/news", newsRoutes);

// Root route & Health check
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to BOSS Da Nang Backend API",
    status: "Online",
    endpoints: {
      products: "/api/products",
      projects: "/api/projects",
      contacts: "/api/contacts",
      news: "/api/news"
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 BOSS Backend Server is running on port: ${PORT}`);
  console.log(`👉 API Base URL: http://localhost:${PORT}`);
  console.log(`==================================================`);
});

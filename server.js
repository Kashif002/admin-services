import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; // Import authentication routes
import adminRoutes from "./routes/adminRoutes.js"; // Import admin routes

dotenv.config();
const app = express();

// Database Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

// Middleware
app.use(cors({
  origin: "*", 
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);  // Authentication routes
app.use("/api/admin", adminRoutes); // Include admin routes

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  connect();
  console.log(`Server Running on Port ${PORT}`);
});

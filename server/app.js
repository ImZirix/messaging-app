// Dependencies
import "dotenv/config";
import express from "express";
import cors from "cors";

// Initialize express application
const app = express();

// Routes imports
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err.message);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3000}`
  );
  console.log(`CORS origin allowed: ${process.env.CORS_ORIGIN}`);
});

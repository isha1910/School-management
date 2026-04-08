const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config({ path: "./config/.env" });

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// ─── MIDDLEWARE ───
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// ─── API ROUTES ───
app.use("/api/auth", require("./routes/auth"));
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/users", require("./routes/user"));
app.use("/api/admissions", require("./routes/admissions"));
app.use("/api/classes", require("./routes/classes"));
app.use("/api/subjects", require("./routes/subjects"));
app.use("/api/assignments", require("./routes/assignments"));
app.use("/api/teacher", require("./routes/teacherPortal"));
app.use("/api/announcements", require("./routes/announcements"));

// ─── HEALTH CHECK ───
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "School Management API is running.",
    version: "1.0.0",
  });
});

// ─── 404 HANDLER ───
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
});

// ─── ERROR HANDLER ───
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// ─── START SERVER ───
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
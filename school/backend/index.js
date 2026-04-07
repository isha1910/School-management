const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/.env" });

const app = express();
const morgan = require("morgan");
const cors = require("cors");

// ✅ DB CONNECTION
connectDB();

// ✅ MIDDLEWARE
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// 🔹 EXISTING ROUTES
app.use("/api/contact", require("./routes/contact"));
app.use("/api/event", require("./routes/event"));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/notice", require("./routes/notice"));
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/auth", require("./routes/auth"));

// 🔹 STUDENT
app.use("/api/student", require("./routes/student"));

// 🔹 ATTENDANCE
app.use("/api/attendance", require("./routes/attendance"));

// 🔹 ASSIGNMENTS (NEW CLEAN ROUTE ✅)
app.use("/api/assignments", require("./routes/upload"));


// ✅ STATIC FOLDER (IMPORTANT)
app.use("/uploads", express.static("uploads"));

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Server Running...");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server is running on http://localhost:${PORT}`);
});
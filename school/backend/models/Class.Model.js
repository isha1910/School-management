const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Class name is required"], trim: true, unique: true },
    grade: { type: String, default: "", trim: true },
    section: { type: String, default: "", trim: true },
    classTeacherUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);


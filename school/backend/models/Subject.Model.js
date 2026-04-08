const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Subject name is required"], trim: true, unique: true },
    code: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);


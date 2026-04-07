const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {   // ✅ IMPORTANT (same use everywhere)
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
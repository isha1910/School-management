const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    body: { type: String, required: [true, "Body is required"], trim: true },
    audience: { type: String, enum: ["all", "students", "teachers"], default: "all", index: true },
    createdByUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    pinned: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);


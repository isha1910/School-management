const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now   // ✅ auto date (no error)
  }

},
{
  timestamps: true
}
);

module.exports = mongoose.model("Notice", noticeSchema);
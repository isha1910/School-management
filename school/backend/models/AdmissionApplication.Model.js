const mongoose = require("mongoose");

const admissionApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, "Full name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: [true, "Password is required"] },
    phone: { type: String, required: [true, "Phone is required"], trim: true },

    dob: { type: Date, default: null },
    address: { type: String, default: "", trim: true },

    guardianName: { type: String, default: "", trim: true },
    guardianPhone: { type: String, default: "", trim: true },
    previousSchool: { type: String, default: "", trim: true },

    applyingForClassId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", default: null },

    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
    reviewedByUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    reviewedAt: { type: Date, default: null },
    notes: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

admissionApplicationSchema.index({ email: 1, status: 1 });

module.exports = mongoose.model("AdmissionApplication", admissionApplicationSchema);


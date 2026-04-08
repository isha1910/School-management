const mongoose = require("mongoose");

const teachingAssignmentSchema = new mongoose.Schema(
  {
    teacherUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true, index: true },
    subjectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  },
  { timestamps: true }
);

teachingAssignmentSchema.index({ teacherUserId: 1, classId: 1 }, { unique: true });

module.exports = mongoose.model("TeachingAssignment", teachingAssignmentSchema);


const TeachingAssignment = require("../models/TeachingAssignment.Model");
const User = require("../models/User.Model");

exports.listAssignments = async (req, res) => {
  try {
    const assignments = await TeachingAssignment.find()
      .sort({ createdAt: -1 })
      .populate("teacherUserId", "name email role")
      .populate("classId", "name grade section")
      .populate("subjectIds", "name code");

    return res.status(200).json({ success: true, count: assignments.length, data: assignments });
  } catch (error) {
    console.error("List Assignments Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.upsertAssignment = async (req, res) => {
  try {
    const { teacherUserId, classId, subjectIds } = req.body;
    if (!teacherUserId || !classId) {
      return res.status(400).json({ success: false, message: "teacherUserId and classId are required." });
    }

    const teacher = await User.findById(teacherUserId).select("_id role");
    if (!teacher || teacher.role !== "teacher") {
      return res.status(400).json({ success: false, message: "teacherUserId must be a teacher user." });
    }

    const updated = await TeachingAssignment.findOneAndUpdate(
      { teacherUserId, classId },
      { teacherUserId, classId, subjectIds: Array.isArray(subjectIds) ? subjectIds : [] },
      { upsert: true, new: true, runValidators: true }
    )
      .populate("teacherUserId", "name email role")
      .populate("classId", "name grade section")
      .populate("subjectIds", "name code");

    return res.status(200).json({ success: true, message: "Assignment saved.", data: updated });
  } catch (error) {
    console.error("Upsert Assignment Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TeachingAssignment.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Assignment not found." });
    return res.status(200).json({ success: true, message: "Assignment deleted." });
  } catch (error) {
    console.error("Delete Assignment Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


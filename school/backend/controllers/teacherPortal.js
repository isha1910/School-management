const TeachingAssignment = require("../models/TeachingAssignment.Model");
const User = require("../models/User.Model");

exports.getMyAssignments = async (req, res) => {
  try {
    const teacherUserId = req.user.userId;
    const assignments = await TeachingAssignment.find({ teacherUserId })
      .sort({ createdAt: -1 })
      .populate("classId", "name grade section")
      .populate("subjectIds", "name code");

    return res.status(200).json({ success: true, count: assignments.length, data: assignments });
  } catch (error) {
    console.error("Teacher MyAssignments Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getStudentsForClass = async (req, res) => {
  try {
    const teacherUserId = req.user.userId;
    const { classId } = req.params;

    const hasAssignment = await TeachingAssignment.exists({ teacherUserId, classId });
    if (!hasAssignment) {
      return res.status(403).json({ success: false, message: "Access denied for this class." });
    }

    const students = await User.find({ role: "student", classId }).select("-password").sort({ name: 1 });
    return res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    console.error("Teacher ClassStudents Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


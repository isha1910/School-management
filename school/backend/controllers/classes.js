const ClassModel = require("../models/Class.Model");
const User = require("../models/User.Model");

exports.listClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: classes.length, data: classes });
  } catch (error) {
    console.error("List Classes Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.createClass = async (req, res) => {
  try {
    const { name, grade, section, classTeacherUserId } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Class name is required." });
    }

    if (classTeacherUserId) {
      const teacher = await User.findById(classTeacherUserId).select("_id role");
      if (!teacher || teacher.role !== "teacher") {
        return res.status(400).json({ success: false, message: "classTeacherUserId must be a teacher user." });
      }
    }

    const created = await ClassModel.create({
      name,
      grade: grade || "",
      section: section || "",
      classTeacherUserId: classTeacherUserId || null,
    });

    return res.status(201).json({ success: true, message: "Class created.", data: created });
  } catch (error) {
    console.error("Create Class Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, grade, section, classTeacherUserId } = req.body;

    if (classTeacherUserId) {
      const teacher = await User.findById(classTeacherUserId).select("_id role");
      if (!teacher || teacher.role !== "teacher") {
        return res.status(400).json({ success: false, message: "classTeacherUserId must be a teacher user." });
      }
    }

    const updated = await ClassModel.findByIdAndUpdate(
      id,
      { ...(name !== undefined ? { name } : {}), ...(grade !== undefined ? { grade } : {}), ...(section !== undefined ? { section } : {}), ...(classTeacherUserId !== undefined ? { classTeacherUserId } : {}) },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: "Class not found." });
    return res.status(200).json({ success: true, message: "Class updated.", data: updated });
  } catch (error) {
    console.error("Update Class Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const studentsCount = await User.countDocuments({ role: "student", classId: id });
    if (studentsCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete class while students are assigned. Reassign students first.",
      });
    }

    const deleted = await ClassModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Class not found." });
    return res.status(200).json({ success: true, message: "Class deleted." });
  } catch (error) {
    console.error("Delete Class Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


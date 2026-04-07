const Teacher = require("../models/Teacher.Model");

// ─── CREATE TEACHER ───
exports.createTeacher = async (req, res) => {
  try {
    const { name, subject, experience, email, phone } = req.body;

    if (!name || !subject || experience === undefined || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (name, subject, experience, email, phone).",
      });
    }

    // Check duplicate email
    const existing = await Teacher.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A teacher with this email already exists.",
      });
    }

    const teacher = await Teacher.create({
      name,
      subject,
      experience,
      email,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "Teacher created successfully.",
      data: teacher,
    });
  } catch (error) {
    console.error("Create Teacher Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ─── GET ALL TEACHERS ───
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    console.error("Get Teachers Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ─── GET SINGLE TEACHER ───
exports.getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    console.error("Get Teacher Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ─── UPDATE TEACHER ───
exports.updateTeacher = async (req, res) => {
  try {
    const { name, subject, experience, email, phone } = req.body;

    if (!name && !subject && experience === undefined && !email && !phone) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update.",
      });
    }

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully.",
      data: teacher,
    });
  } catch (error) {
    console.error("Update Teacher Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ─── DELETE TEACHER ───
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Teacher Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
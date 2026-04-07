const Teacher = require("../models/Teacher.Model");

// CREATE
exports.createTeacher = async (req, res) => {
  try {
    const { name, subject, designation, bio, image } = req.body;

    if (!name || !subject || !designation || !bio || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const teacher = await Teacher.create({
      name,
      subject,
      designation,
      bio,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Teacher Created Successfully",
      data: teacher,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET ALL
exports.getAllTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: teachers,
    });

  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET SINGLE
exports.getSingleTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    res.status(200).json({ success: true, data: teacher });

  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// UPDATE
exports.updateTeacher = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided",
      });
    }

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher Updated Successfully",
      data: teacher,
    });

  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// DELETE
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher Deleted Successfully",
    });

  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
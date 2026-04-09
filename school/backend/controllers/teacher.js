const bcrypt = require("bcryptjs");
const Teacher = require("../models/Teacher.Model");
const User = require("../models/User.Model");
const TeachingAssignment = require("../models/TeachingAssignment.Model");

// ─── CREATE TEACHER ───
exports.createTeacher = async (req, res) => {
  try {
    const { name, subject, experience, email, phone, password } = req.body;

    if (!name || !subject || experience === undefined || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (name, subject, experience, email, phone, password).",
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // Check duplicate email in both collections
    const [existingTeacher, existingUser] = await Promise.all([
      Teacher.findOne({ email }),
      User.findOne({ email }),
    ]);
    if (existingTeacher || existingUser) {
      return res.status(400).json({
        success: false,
        message: "This email is already in use.",
      });
    }

    const teacher = await Teacher.create({
      name,
      subject,
      experience,
      email,
      phone,
    });

    try {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.create({
        name,
        email,
        password: hashedPassword,
        role: "teacher",
        teacherProfileId: teacher._id,
      });
    } catch (e) {
      // Keep data consistent: if user creation fails, rollback teacher
      await Teacher.findByIdAndDelete(teacher._id).catch(() => {});
      throw e;
    }

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

    // If email is being changed, ensure it doesn't collide with another user/teacher
    if (email) {
      const teacherId = req.params.id;
      const [teacherEmailOwner, userEmailOwner] = await Promise.all([
        Teacher.findOne({ email }).select("_id"),
        User.findOne({ email }).select("_id teacherProfileId"),
      ]);

      if (teacherEmailOwner && String(teacherEmailOwner._id) !== String(teacherId)) {
        return res.status(400).json({ success: false, message: "This email is already in use." });
      }

      // If some other user owns this email (not the linked teacher user), block it.
      if (userEmailOwner && String(userEmailOwner.teacherProfileId || "") !== String(teacherId)) {
        return res.status(400).json({ success: false, message: "This email is already in use." });
      }
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

    // Keep the linked user in sync (best effort)
    const userUpdate = {};
    if (name) userUpdate.name = name;
    if (email) userUpdate.email = email;
    if (Object.keys(userUpdate).length) {
      await User.findOneAndUpdate(
        { teacherProfileId: teacher._id },
        { $set: userUpdate },
        { new: false }
      );
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
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    const linkedUser = await User.findOne({ teacherProfileId: teacher._id }).select("_id");

    if (linkedUser) {
      const hasAssignments = await TeachingAssignment.exists({ teacherUserId: linkedUser._id });
      if (hasAssignments) {
        return res.status(409).json({
          success: false,
          message: "Cannot delete teacher: teaching assignments exist for this teacher user.",
        });
      }
    }

    if (linkedUser) {
      await User.findByIdAndDelete(linkedUser._id);
    }
    await Teacher.findByIdAndDelete(teacher._id);

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

// ─── RESET TEACHER PASSWORD (admin) ───
exports.resetTeacherPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required." });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
    }

    const teacherId = req.params.id;
    const teacher = await Teacher.findById(teacherId).select("_id");
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found." });
    }

    const user = await User.findOne({ teacherProfileId: teacher._id });
    if (!user) {
      return res.status(404).json({ success: false, message: "Teacher user account not found." });
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    return res.status(200).json({ success: true, message: "Teacher password reset successfully." });
  } catch (error) {
    console.error("Reset Teacher Password Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};
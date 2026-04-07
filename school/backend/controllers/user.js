const User = require("../models/User.Model");
const bcrypt = require("bcryptjs");

// ─── GET ALL USERS (admin) ───
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Get Users Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ─── GET SINGLE USER (admin) ───
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get User Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ─── UPDATE USER (admin) ───
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (password) {
      const salt = await bcrypt.genSalt(12);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Update User Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ─── DELETE USER (admin) ───
exports.deleteUser = async (req, res) => {
  try {
    // Prevent deleting self
    if (req.params.id === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account.",
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Delete User Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ─── GET DASHBOARD STATS (admin) ───
exports.getDashboardStats = async (req, res) => {
  try {
    const Teacher = require("../models/Teacher.Model");

    const [totalUsers, totalTeachers, adminCount, teacherCount, studentCount] = await Promise.all([
      User.countDocuments(),
      Teacher.countDocuments(),
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "teacher" }),
      User.countDocuments({ role: "student" }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalTeachers,
        adminCount,
        teacherCount,
        studentCount,
      },
    });
  } catch (error) {
    console.error("Stats Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

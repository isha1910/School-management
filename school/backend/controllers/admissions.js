const bcrypt = require("bcryptjs");
const AdmissionApplication = require("../models/AdmissionApplication.Model");
const User = require("../models/User.Model");

// Public: submit an admission application
exports.applyAdmission = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      dob,
      address,
      guardianName,
      guardianPhone,
      previousSchool,
      applyingForClassId,
    } = req.body;

    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, password, and phone are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered. Please login.",
      });
    }

    const existingPending = await AdmissionApplication.findOne({ email, status: "pending" });
    if (existingPending) {
      return res.status(400).json({
        success: false,
        message: "An admission application is already pending for this email.",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const application = await AdmissionApplication.create({
      fullName,
      email,
      passwordHash,
      phone,
      dob: dob ? new Date(dob) : null,
      address: address || "",
      guardianName: guardianName || "",
      guardianPhone: guardianPhone || "",
      previousSchool: previousSchool || "",
      applyingForClassId: applyingForClassId || null,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted. Please wait for admin approval.",
      data: {
        id: application._id,
        status: application.status,
        createdAt: application.createdAt,
      },
    });
  } catch (error) {
    console.error("Admission Apply Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// Admin: list applications
exports.listAdmissions = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && ["pending", "approved", "rejected"].includes(status)) {
      filter.status = status;
    }

    const applications = await AdmissionApplication.find(filter)
      .sort({ createdAt: -1 })
      .select("-passwordHash");

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Admissions List Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Admin: approve application -> create user
exports.approveAdmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { classId } = req.body;

    const application = await AdmissionApplication.findById(id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    if (application.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Cannot approve an application with status '${application.status}'.`,
      });
    }

    const existingUser = await User.findOne({ email: application.email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "A user already exists for this email." });
    }

    const user = await User.create({
      name: application.fullName,
      email: application.email,
      password: application.passwordHash,
      role: "student",
      classId: classId || application.applyingForClassId || null,
    });

    application.status = "approved";
    application.reviewedByUserId = req.user.userId;
    application.reviewedAt = new Date();
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application approved. Student account created.",
      data: {
        applicationId: application._id,
        userId: user._id,
      },
    });
  } catch (error) {
    console.error("Admissions Approve Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Admin: reject application
exports.rejectAdmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const application = await AdmissionApplication.findById(id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    if (application.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Cannot reject an application with status '${application.status}'.`,
      });
    }

    application.status = "rejected";
    application.notes = notes || "";
    application.reviewedByUserId = req.user.userId;
    application.reviewedAt = new Date();
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application rejected.",
      data: { id: application._id, status: application.status },
    });
  } catch (error) {
    console.error("Admissions Reject Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


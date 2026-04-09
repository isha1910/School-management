const express = require("express");
const router = express.Router();
const {
  createTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  resetTeacherPassword,
} = require("../controllers/teacher");
const { authenticateJWT, adminOnly } = require("../middleware/auth.middleware");

// Public — anyone can view teachers
router.get("/", getAllTeachers);
router.get("/:id", getTeacher);

// Protected — admin only
router.post("/", authenticateJWT, adminOnly, createTeacher);
router.put("/:id", authenticateJWT, adminOnly, updateTeacher);
router.delete("/:id", authenticateJWT, adminOnly, deleteTeacher);
router.post("/:id/reset-password", authenticateJWT, adminOnly, resetTeacherPassword);

module.exports = router;
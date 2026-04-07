const express = require("express");
const router = express.Router();

const {
  createTeacher,
  getAllTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacher");

const authenticateJWT = require("../middleware/auth.middleware");

// PUBLIC
router.get("/", getAllTeacher);
router.get("/:id", getSingleTeacher);

// PROTECTED
router.post("/", authenticateJWT, createTeacher);
router.put("/:id", authenticateJWT, updateTeacher);
router.delete("/:id", authenticateJWT, deleteTeacher);

module.exports = router;
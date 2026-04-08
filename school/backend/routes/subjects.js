const express = require("express");
const router = express.Router();

const { listSubjects, createSubject, updateSubject, deleteSubject } = require("../controllers/subjects");
const { authenticateJWT, adminOnly } = require("../middleware/auth.middleware");

// Public read
router.get("/", listSubjects);

// Admin manage
router.post("/", authenticateJWT, adminOnly, createSubject);
router.put("/:id", authenticateJWT, adminOnly, updateSubject);
router.delete("/:id", authenticateJWT, adminOnly, deleteSubject);

module.exports = router;


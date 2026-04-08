const express = require("express");
const router = express.Router();

const { listClasses, createClass, updateClass, deleteClass } = require("../controllers/classes");
const { authenticateJWT, adminOnly } = require("../middleware/auth.middleware");

// Public read (for admission form dropdowns, etc.)
router.get("/", listClasses);

// Admin manage
router.post("/", authenticateJWT, adminOnly, createClass);
router.put("/:id", authenticateJWT, adminOnly, updateClass);
router.delete("/:id", authenticateJWT, adminOnly, deleteClass);

module.exports = router;


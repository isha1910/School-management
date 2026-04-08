const express = require("express");
const router = express.Router();

const {
  listAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcements");

const { authenticateJWT, adminOnly } = require("../middleware/auth.middleware");

// Public read
router.get("/", listAnnouncements);

// Admin manage
router.post("/", authenticateJWT, adminOnly, createAnnouncement);
router.put("/:id", authenticateJWT, adminOnly, updateAnnouncement);
router.delete("/:id", authenticateJWT, adminOnly, deleteAnnouncement);

module.exports = router;


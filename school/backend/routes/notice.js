const express = require("express");
const router = express.Router();

const {
  createNotice,
  getAllNotice,
  updateNotice,
  deleteNotice,
} = require("../controllers/notice");

const authenticateJWT = require("../middleware/auth.middleware");

// PUBLIC
router.get("/", getAllNotice);

// PROTECTED
router.post("/", authenticateJWT, createNotice);
router.put("/:id", authenticateJWT, updateNotice);
router.delete("/:id", authenticateJWT, deleteNotice);

module.exports = router;
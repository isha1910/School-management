const express = require("express");
const router = express.Router();

const {
  createGallery,
  getAllGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/gallery");

const authenticateJWT = require("../middleware/auth.middleware");

// PUBLIC
router.get("/", getAllGallery);

// PROTECTED
router.post("/", authenticateJWT, createGallery);
router.put("/:id", authenticateJWT, updateGallery);
router.delete("/:id", authenticateJWT, deleteGallery);

module.exports = router;
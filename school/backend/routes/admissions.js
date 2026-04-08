const express = require("express");
const router = express.Router();

const {
  applyAdmission,
  listAdmissions,
  approveAdmission,
  rejectAdmission,
} = require("../controllers/admissions");

const { authenticateJWT, adminOnly } = require("../middleware/auth.middleware");

// Public
router.post("/apply", applyAdmission);

// Admin
router.get("/", authenticateJWT, adminOnly, listAdmissions);
router.post("/:id/approve", authenticateJWT, adminOnly, approveAdmission);
router.post("/:id/reject", authenticateJWT, adminOnly, rejectAdmission);

module.exports = router;


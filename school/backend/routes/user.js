const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getDashboardStats,
} = require("../controllers/user");
const { authenticateJWT, adminOnly } = require("../middleware/auth.middleware");

// All routes require admin access
router.use(authenticateJWT, adminOnly);

router.get("/stats", getDashboardStats);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

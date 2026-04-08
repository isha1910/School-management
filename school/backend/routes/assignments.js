const express = require("express");
const router = express.Router();

const { listAssignments, upsertAssignment, deleteAssignment } = require("../controllers/assignments");
const { authenticateJWT, adminOnly } = require("../middleware/auth.middleware");

router.use(authenticateJWT, adminOnly);

router.get("/", listAssignments);
router.post("/", upsertAssignment);
router.delete("/:id", deleteAssignment);

module.exports = router;


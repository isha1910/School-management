const express = require("express");
const router = express.Router();

const { authenticateJWT, allowRoles } = require("../middleware/auth.middleware");
const { getMyAssignments, getStudentsForClass } = require("../controllers/teacherPortal");

router.use(authenticateJWT, allowRoles("teacher"));

router.get("/me/assignments", getMyAssignments);
router.get("/me/classes/:classId/students", getStudentsForClass);

module.exports = router;


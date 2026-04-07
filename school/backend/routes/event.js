const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");

const authenticateJWT = require("../middleware/auth.middleware");

// PUBLIC
router.get("/", getAllEvents);

// PROTECTED
router.post("/", authenticateJWT, createEvent);
router.put("/:id", authenticateJWT, updateEvent);
router.delete("/:id", authenticateJWT, deleteEvent);

module.exports = router;
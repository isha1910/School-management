const express = require("express");
const router = express.Router();

// ✅ GET ALL CONTACTS
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Contact API Working",
    data: []
  });
});

// ✅ ADD CONTACT
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  res.json({
    success: true,
    message: "Contact Saved Successfully",
    data: { name, email, message }
  });
});
// ✅ DELETE CONTACT
router.delete("/:id", (req, res) => {
  res.json({
    success: true,
    message: "Deleted Successfully"
  });
});
module.exports = router;
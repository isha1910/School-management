const Notice = require("../models/Notice.Model");

// CREATE
exports.createNotice = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const notice = await Notice.create({ title, description, category });

    res.status(201).json({
      success: true,
      message: "Notice Created",
      data: notice,
    });

  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET
exports.getAllNotice = async (req, res) => {
  try {
    const data = await Notice.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, data });

  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// UPDATE
exports.updateNotice = async (req, res) => {
  try {
    await Notice.findByIdAndUpdate(req.params.id, req.body);

    res.json({ success: true, message: "Notice Updated" });

  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// DELETE
exports.deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Notice Deleted" });

  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
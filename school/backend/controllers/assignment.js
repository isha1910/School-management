const Assignment = require('../models/Assignment.Model');
const fs = require('fs');

// ✅ Upload Assignment
exports.uploadFile = async (req, res) => {
  try {
    const file = new Assignment({
      filename: req.file.originalname,
      filepath: req.file.filename
    });

    await file.save();
    res.json({ msg: "File uploaded", file });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Files
exports.getFiles = async (req, res) => {
  try {
    const files = await Assignment.find().sort({ uploadDate: -1 });
    res.json(files);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete File
exports.deleteFile = async (req, res) => {
  try {
    const file = await Assignment.findById(req.params.id);

    // file delete from folder
    fs.unlinkSync('uploads/' + file.filepath);

    await Assignment.findByIdAndDelete(req.params.id);

    res.json({ msg: "Deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
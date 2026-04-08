const Subject = require("../models/Subject.Model");

exports.listSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: subjects.length, data: subjects });
  } catch (error) {
    console.error("List Subjects Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.createSubject = async (req, res) => {
  try {
    const { name, code } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Subject name is required." });
    const created = await Subject.create({ name, code: code || "" });
    return res.status(201).json({ success: true, message: "Subject created.", data: created });
  } catch (error) {
    console.error("Create Subject Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code } = req.body;
    const updated = await Subject.findByIdAndUpdate(
      id,
      { ...(name !== undefined ? { name } : {}), ...(code !== undefined ? { code } : {}) },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: "Subject not found." });
    return res.status(200).json({ success: true, message: "Subject updated.", data: updated });
  } catch (error) {
    console.error("Update Subject Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Subject.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Subject not found." });
    return res.status(200).json({ success: true, message: "Subject deleted." });
  } catch (error) {
    console.error("Delete Subject Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


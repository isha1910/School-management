const Announcement = require("../models/Announcement.Model");

exports.listAnnouncements = async (req, res) => {
  try {
    const { audience } = req.query;
    const filter = {};
    if (audience && ["all", "students", "teachers"].includes(audience)) filter.audience = audience;

    const items = await Announcement.find(filter).sort({ pinned: -1, createdAt: -1 });
    return res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    console.error("List Announcements Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, body, audience, pinned } = req.body;
    if (!title || !body) return res.status(400).json({ success: false, message: "Title and body are required." });

    const created = await Announcement.create({
      title,
      body,
      audience: ["all", "students", "teachers"].includes(audience) ? audience : "all",
      pinned: !!pinned,
      createdByUserId: req.user?.userId || null,
    });

    return res.status(201).json({ success: true, message: "Announcement created.", data: created });
  } catch (error) {
    console.error("Create Announcement Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, audience, pinned } = req.body;

    const updated = await Announcement.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined ? { title } : {}),
        ...(body !== undefined ? { body } : {}),
        ...(audience !== undefined
          ? { audience: ["all", "students", "teachers"].includes(audience) ? audience : "all" }
          : {}),
        ...(pinned !== undefined ? { pinned: !!pinned } : {}),
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: "Announcement not found." });
    return res.status(200).json({ success: true, message: "Announcement updated.", data: updated });
  } catch (error) {
    console.error("Update Announcement Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Announcement.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Announcement not found." });
    return res.status(200).json({ success: true, message: "Announcement deleted." });
  } catch (error) {
    console.error("Delete Announcement Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


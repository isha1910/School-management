const Gallery = require("../models/Gallery.Model");

// CREATE
exports.createGallery = async (req, res) => {
  try {
    const { title, date, images } = req.body;

    if (!title || !date || !images) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const imageArray = Array.isArray(images)
      ? images
      : images.split(",").map(i => i.trim());

    const gallery = await Gallery.create({
      title,
      date,
      images: imageArray,
    });

    res.status(201).json({
      success: true,
      message: "Gallery Created",
      data: gallery,
    });

  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET
exports.getAllGallery = async (req, res) => {
  try {
    const data = await Gallery.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, data });

  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// UPDATE
exports.updateGallery = async (req, res) => {
  try {
    const { title, date, images } = req.body;

    const imageArray = Array.isArray(images)
      ? images
      : images.split(",").map(i => i.trim());

    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      { title, date, images: imageArray },
      { new: true }
    );

    res.json({
      success: true,
      message: "Gallery Updated",
      data: gallery,
    });

  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// DELETE
exports.deleteGallery = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Gallery Deleted" });

  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const Event = require("../models/Event.Model");

// CREATE
exports.createEvent = async (req, res) => {
  try {
    const { title, date, time, location, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({
        status: "N",
        message: "Title and Date are required",
      });
    }

    const event = await Event.create({
      title,
      date,
      time,
      location,
      description,
    });

    res.status(201).json({
      status: "Y",
      message: "Event Added Successfully",
      data: event,
    });

  } catch {
    res.status(500).json({ status: "N", message: "Internal Server Error" });
  }
};

// GET
exports.getAllEvents = async (req, res) => {
  try {
    const data = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({ status: "Y", data });

  } catch {
    res.status(500).json({ status: "N", message: "Internal Server Error" });
  }
};

// UPDATE
exports.updateEvent = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "N",
        message: "No data provided",
      });
    }

    await Event.findByIdAndUpdate(req.params.id, req.body);

    res.json({ status: "Y", message: "Event Updated" });

  } catch {
    res.status(500).json({ status: "N", message: "Internal Server Error" });
  }
};

// DELETE
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.json({ status: "Y", message: "Event Deleted" });

  } catch {
    res.status(500).json({ status: "N", message: "Internal Server Error" });
  }
};
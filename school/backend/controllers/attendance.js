const Attendance = require('../models/Attendance.Model');

exports.markAttendance = async (req, res) => {
  const data = new Attendance(req.body);
  await data.save();
  res.json({ msg: "Saved" });
};
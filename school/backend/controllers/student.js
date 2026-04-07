const Student = require('../models/Student.Model');

exports.getStudents = async (req, res) => {
  const data = await Student.find();
  res.json(data);
};

exports.addStudent = async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
};

exports.updateStudent = async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ msg: "Updated" });
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};
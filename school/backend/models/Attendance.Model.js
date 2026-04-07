const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  date:String,
  students:Array
});

module.exports = mongoose.model("Attendance",schema);
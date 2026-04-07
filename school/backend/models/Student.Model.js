const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name:String,
  email:String,
  class:String
});

module.exports = mongoose.model("Student",schema);
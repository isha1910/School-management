const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name:String,
  section:String
});

module.exports = mongoose.model("Class",schema);
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  file:String
});

module.exports = mongoose.model("Assignment",schema);
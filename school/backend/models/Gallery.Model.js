const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
{
  title:{
    type:String,
    required:true
  },

  images:{
    type:[String],   // ✅ array
    required:true
  },

  date:{
    type:Date,
    required:true
  }

},
{
  timestamps:true
}
);

module.exports = mongoose.model("Gallery",gallerySchema);
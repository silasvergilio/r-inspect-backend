const mongoose = require("mongoose");

const Inspector = mongoose.Schema({
  
  name:{
    type: String,
    required: true,
    unique: true
  },
});

const inspectorModel = mongoose.model("Inspectors", Inspector);
module.exports = inspectorModel;

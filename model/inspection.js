const mongoose = require("mongoose");

const Inspection = mongoose.Schema({
  inspectorId: {
    type: String,
    required: false,
  },
  teamNumber:{
    type: String,
    required: true,
    unique: true
  },
  teamName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  sheet:{
    type: Object,
    required: false
  }

});

const inspectionModel = mongoose.model("Inspection", Inspection);
module.exports = inspectionModel
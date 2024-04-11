const mongoose = require("mongoose");

const Team = mongoose.Schema({
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
    required: true
  }

});

const inspectionModel = mongoose.model("Teams", teamSchema);
module.exports = Team;
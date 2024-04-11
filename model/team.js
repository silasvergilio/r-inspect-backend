const mongoose = require("mongoose");

const Team = mongoose.Schema({
  teamNumber:{
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});

const teamModel = mongoose.model("Teams", Team);
module.exports = teamModel;
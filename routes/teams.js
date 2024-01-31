var express = require("express");
var router = express.Router();

const axios = require("axios");

const auth = Buffer.from(
  "silasvergiliobrazil:9c6795b5-e647-4a8e-b39b-be3d0c06729e"
).toString("base64");
const instance = axios.create({
  baseURL: "https://frc-api.firstinspires.org/v3.0/",
  timeout: 1000,
  headers: {
    Authorization: `Basic ${auth}`,
  },
});

router.get("/", function (req, res, next) {
  instance
    .get("2024/teams", {
      params: {
        eventCode: "BRBR",
      },
    })
    .then(function (response) {
      var teams = [];
      response.data.teams.forEach((element) => {
        teams.push({
          teamNumber: element.teamNumber,
          name: element.nameShort,
          state: element.stateProv,
        });
      });

      res.status(200).json(teams);
    })
    .catch(function (error) {
      res.status(500);
    })
    .finally(function () {});
});

module.exports = router;

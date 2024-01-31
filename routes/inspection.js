var express = require("express");
var router = express.Router();
var inspectorModel = require("../model/inspector");
var inspectionModel = require("../model/inspection");

router.post("/", async function (req, res, next) {
  let body = req.body;
  console.log(req.body);
  const newInspection = inspectionModel(body);

  try {
    await newInspection.save();
    res.status(204).json({
      message: "Inspeção criada com sucesso",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Erro ao criar a inspeção",
      status: 500,
    });
  }
});

router.get("/", async (req, res, next) => {
  try {
    var inspections = await inspectionModel.find({});

    res.status(200).json(inspections);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Erro ao buscar Inspeções",
      status: 500,
    });
  }
});

router.patch("/", async (req, res, next) => {
  let body = req.body;
  const filter = { teamNumber: body.teamNumber };
  const update = { sheet: body.sheet, status: body.status };

  try {
    let sheetDoc = await inspection.findOneAndUpdate(filter, update);

    res.status(201).json(sheetDoc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Erro ao atualizar a Inspeção",
      status: 500,
    });
  }
});

module.exports = router;

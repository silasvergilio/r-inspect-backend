var express = require("express");
var router = express.Router();
var inspectorModel = require("../model/inspector");
var inspectionModel = require("../model/inspection");


router.post("/", async function (req, res, next) {
  // Create Inspection
  // #swagger.tags = ['Inspection']
  // #swagger.description = 'Creates a new inspection with the provided details.'
  // #swagger.parameters['body'] = {
  //   in: 'body',
  //   description: 'Inspection details',
  //   required: true,
  //   schema: { $ref: "#/definitions/Inspection" }
  // }
  // #swagger.responses[204] = { description: 'Inspection created successfully.' }
  // #swagger.responses[500] = { description: 'Error occurred while creating the inspection.' }

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
  // Get Inspections
  // #swagger.tags = ['Inspection']
  // #swagger.description = 'Retrieves a list of all inspections.'
  // #swagger.responses[200] = {
  //   description: 'List of inspections.',
  //   schema: { $ref: "#/definitions/InspectionArray" }
  // }
  // #swagger.responses[500] = { description: 'Error occurred while retrieving inspections.' }

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
  // Update Inspection
  // #swagger.tags = ['Inspection']
  // #swagger.description = 'Updates an existing inspection based on the team number.'
  // #swagger.parameters['body'] = {
  //   in: 'body',
  //   description: 'Update details with teamNumber, sheet, and status',
  //   required: true,
  //   schema: { $ref: "#/definitions/InspectionUpdate" }
  // }
  // #swagger.responses[201] = { description: 'Inspection updated successfully.' }
  // #swagger.responses[500] = { description: 'Error occurred while updating the inspection.' }

  let body = req.body;
  const filter = { teamNumber: body.teamNumber };
  const update = { sheet: body.sheet, status: body.status };

  try {
    let sheetDoc = await inspectionModel.findOneAndUpdate(filter, update);

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

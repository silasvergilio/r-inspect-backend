var express = require("express");
var router = express.Router();
var inspectionModel = require("../model/inspection");

const authorize = require('../middlewares/roleBasedAccessControl');

router.get("/", authorize(['inspector', 'inspector_coordinator']), async (req, res, next) => {
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

router.get("/simplified", async (req, res, next) => {
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

    const simplifiedInspections = inspections.map((inspection) => { 
      return {
        inspectorId: inspection.inspectorId,
        teamNumber: inspection.teamNumber,
        teamName: inspection.teamName,
        status: inspection.status,
        sheet: null} 
    });

    res.status(200).json(simplifiedInspections);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Erro ao buscar Inspeções",
      status: 500,
    });
  }
});

router.get("/:teamNumber", authorize(['inspector', 'inspector_coordinator']), async (req, res, next) => {
  // Get Inspection
  // #swagger.tags = ['Inspection']
  // #swagger.description = 'Retrieves an inspection based on the team number.'
  // #swagger.parameters['teamNumber'] = { description: 'Team number', required: true }
  // #swagger.responses[200] = { description: 'Inspection found.', schema: { $ref: "#/definitions/Inspection" } }
  // #swagger.responses[404] = { description: 'Inspection not found.' }
  // #swagger.responses[500] = { description: 'Error occurred while retrieving the inspection.' }

  try {
    var inspection = await inspectionModel.findOne({ teamNumber: req.params.teamNumber });

    if (!inspection) {
      return res.status(404).json({
        message: "Inspection not found.",
        status: 404
      });
    }

    res.status(200).json(inspection);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occurred while retrieving the inspection.",
      status: 500
    });
  }
});

router.post("/", authorize(['inspector_coordinator']), async (req, res, next) => {
  // Create Inspection
  // #swagger.tags = ['Inspection']
  // #swagger.description = 'Creates a new inspection.'
  // #swagger.parameters['body'] = {
  //   in: 'body',
  //   description: 'Inspection details with teamNumber, sheet, and status',
  //   required: true,
  //   schema: { $ref: "#/definitions/InspectionCreate" }
  // }
  // #swagger.responses[201] = { description: 'Inspection created successfully.' }
  // #swagger.responses[500] = { description: 'Error occurred while creating the inspection.' }

  // Input validation
  const { inspectorId, teamNumber, teamName, status, sheet } = req.body;

  if (!teamNumber || !status) {
    return res.status(400).json({
      message: "Missing required fields: inspectorId, teamNumber, teamName, status, sheet.",
      status: 400
    });
  }

  const newInspection = new inspectionModel({ inspectorId, teamNumber, teamName, status, sheet });

  try {
    const savedInspection = await newInspection.save();
    res.status(201).json({
      message: "Inspection created successfully.",
      data: savedInspection,
      status: 201
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation error: " + err.message,
        status: 400
      });
    }
    res.status(500).json({
      message: "An error occurred while creating the inspection.",
      status: 500
    });
  }
});

router.patch("/", authorize(['inspector', 'inspector_coordinator']), async (req, res, next) => {
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

  // Input validation
  const { inspectorId, teamNumber, teamName, status, sheet } = req.body;
  
  if (!teamNumber || !status) {
    return res.status(400).json({
      message: "Missing required fields: inspectorId, teamNumber, teamName, status, sheet.",
      status: 400
    });
  }

  const update = { inspectorId, teamNumber, teamName, status, sheet };

  try {
    // Option { new: true } ensures that the document returned is the updated document.
    const updatedDoc = await inspectionModel.findOneAndUpdate({ teamNumber }, update, { new: true });

    if (!updatedDoc) {
      return res.status(404).json({
        message: "Inspection not found with the provided teamNumber.",
        status: 404
      });
    }

    res.status(200).json({
      message: "Inspection updated successfully.",
      data: updatedDoc,
      status: 200
    });
  } catch (err) {
    // Log the error and respond with a generic server error message
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation error: " + err.message,
        status: 400
      });
    }
    res.status(500).json({
      message: "An error occurred while updating the inspection.",
      status: 500
    });
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
var inspectorModel = require("../model/inspector");

const authorize = require('../middlewares/roleBasedAccessControl');

router.post("/", authorize(['inspector_coordinator']), async function (req, res, next) {
  // POST /inspector
  // Adds a new inspector to the database
  // #swagger.tags = ['Inspector']
  // #swagger.summary = 'Add a new inspector to the database'
  // #swagger.description = 'Endpoint to add a new inspector to the database.'
  // #swagger.parameters['inspector'] = {
  //     in: 'body',
  //     description: 'Inspector data',
  //     required: true,
  //     type: 'object',
  //     schema: { $ref: "#/definitions/Inspector" }
  // }
  // #swagger.responses[204] = { description: 'Inspector created successfully.' }
  // #swagger.responses[500] = { description: 'Error occurred while creating the inspector.' }
  let body = req.body;
  console.log(req.body);
  const newInspector = inspectorModel(body);

  try {
    await newInspector.save();
    res.status(204).json({
      message: "Inspetor Criado com sucesso",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Erro ao criar o inspetor",
      status: 500,
    });
  }
});

router.get("/", authorize(['inspector', 'inspector_coordinator']), async function (req, res, next) {
  // GET /inspector
  // Retrieves a list of all inspectors from the database
  // #swagger.tags = ['Inspector']
  // #swagger.summary = 'Retrieve all inspectors'
  // #swagger.description = 'Endpoint to retrieve a list of all inspectors from the database.'
  // #swagger.responses[200] = {
  //     description: 'An array of inspectors.',
  //     schema: { $ref: "#/definitions/InspectorsArray" } // Assumes you define an array of inspectors in your Swagger definitions
  // }
  // #swagger.responses[500] = { description: 'Error occurred while fetching inspectors.' }
  try {
    var inspectorsResponse = [];
    var inspectors = await inspectorModel.find({});
    inspectors.forEach((element) => {
      inspectorsResponse.push({
        name: element.name,
      });
    });

    res.status(200).json(inspectorsResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Erro ao buscar inspetores",
      status: 500,
    });
  }
});

router.delete("/:name", authorize(['inspector_coordinator']), async function (req, res, next) {
  // DELETE /inspector/{name}
  // Deletes an inspector from the database
  // #swagger.tags = ['Inspector']
  // #swagger.summary = 'Delete an inspector'
  // #swagger.description = 'Endpoint to delete an inspector from the database.'
  // #swagger.parameters['name'] = { description: 'Name of the inspector to delete.' }
  // #swagger.responses[200] = { description: 'Inspector deleted successfully.' }
  // #swagger.responses[500] = { description: 'Error occurred while deleting the inspector.' }
  let name = req.params.name;
  try {
    await inspectorModel.deleteOne({ name: name });
    res.status(200).json({
      message: "Inspetor deletado com sucesso",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Erro ao deletar o inspetor",
      status: 500,
    });
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
var inspectorModel = require("../model/inspector");

router.post("/", async function (req, res, next) {
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

router.get("/", async function (req, res, next) {
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


module.exports = router;

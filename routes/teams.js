var express = require("express");
const TeamsService = require("../services/teamsService");
var router = express.Router();

const teamsService = new TeamsService();

router.get("/", async (req, res) => {
    // #swagger.tags = ['Teams']
    // #swagger.description = 'Endpoint to retrieve a list of all teams.'
    // #swagger.responses[200] = {
    //     description: 'Successful operation: Returns a list of teams.',
    //     schema: { $ref: "#/definitions/TeamsArray" } // You need to define TeamsArray in your Swagger definitions
    // }
    // #swagger.responses[500] = { description: 'Server error: An error occurred while fetching teams.' }
    try {
        const teams = await teamsService.getTeams();
        res.status(200).json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching teams.");
    }
});

module.exports = router;

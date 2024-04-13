var express = require("express");
const TeamsService = require("../services/teamsService");
var router = express.Router();

const teamsService = new TeamsService();

const authorize = require('../middlewares/roleBasedAccessControl');

router.get("/", async (req, res) => {
    // #swagger.tags = ['Teams']
    // #swagger.description = 'Endpoint to retrieve a list of all teams.'
    // #swagger.responses[200] = {
    //     description: 'Successful operation: Returns a list of teams.',
    //     schema: { $ref: "#/definitions/TeamsArray" } // You need to define TeamsArray in your Swagger definitions
    // }
    // #swagger.responses[500] = { description: 'Server error: An error occurred while fetching teams.' }
    try {
        const teams = await teamsService.getTeams(); //
        res.status(200).json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching teams.");
    }
});

router.get("/:teamNumber", authorize(['inspector', 'inspector_coordinator']), async (req, res, next) => {
    // Get Team
    // #swagger.tags = ['Team Individually']
    // #swagger.description = 'Retrieves a team based on the team number.'
    // #swagger.parameters['teamNumber'] = { description: 'Team number', required: true }
    // #swagger.responses[200] = { description: 'Team found.', schema: { $ref: "#/definitions/Inspection" } }
    // #swagger.responses[404] = { description: 'Team not found.' }
    // #swagger.responses[500] = { description: 'Error occurred while retrieving the team.' }

    try {
        var team = await teamsService.getTeam(req.params.teamNumber);

        if (!team) {
            return res.status(404).json({
                message: "Team not found.",
                status: 404
            });
        }

        res.status(200).json(team);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "An error occurred while retrieving the team.",
            status: 500
        });
    }
});

module.exports = router;

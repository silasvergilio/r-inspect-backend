var express = require("express");
const TeamsService = require("../services/teamsService");
var router = express.Router();
var inspectionModel = require("../model/inspection"); // Assuming you have an inspection model similar to the one from your example

const teamsService = new TeamsService();

const adminSecretKey = process.env.ADMIN_SECRET_KEY || "";


router.get("/CreateCleanSheetsForTeams", async (req, res) => {
    // #swagger.tags = ['admin']
    // #swagger.description = 'Endpoint to create clean sheets for all teams. Requires admin secret key for authorization.'
    // #swagger.parameters['admin-secret-key'] = {
    //     in: 'header',
    //     description: 'Admin secret key for authentication',
    //     type: 'string',
    //     required: true
    // }
    // #swagger.responses[201] = { description: 'Clean sheets for all teams created successfully.' }
    // #swagger.responses[400] = { description: 'Inspections table must be empty before running this operation or no teams found to create clean sheets for.' }
    // #swagger.responses[403] = { description: 'Unauthorized access.' }
    // #swagger.responses[500] = { description: 'Failed to create clean sheets for teams.' }
    try {
        const payloadAdminSecretKey = req.headers['admin-secret-key'];

        if (!payloadAdminSecretKey || adminSecretKey !== payloadAdminSecretKey) {
            return res.status(403).send("Unauthorized access.");
        }

        const existingInspectionsCount = await inspectionModel.countDocuments();

        if (existingInspectionsCount > 0) {
            return res.status(400).send("Inspections table must be empty before running this operation.");
        }

        const teams = await teamsService.getTeams();

        const inspectionsToCreate = teams.map(team => ({
            teamNumber: team.teamNumber,
            teamName: team.name,
            status: "Not Started",
            sheet: undefined
        }));

        if (inspectionsToCreate.length > 0) {
            await inspectionModel.insertMany(inspectionsToCreate);
            res.status(201).send("Clean sheets for all teams created successfully");
        } else {
            res.status(400).send("No teams found to create clean sheets for");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Failed to create clean sheets for teams");
    }
});

module.exports = router;

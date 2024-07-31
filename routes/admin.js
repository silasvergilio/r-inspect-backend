var express = require("express");
const TeamsService = require("../services/teamsService");
var router = express.Router();
var inspectionModel = require("../model/inspection"); // Assuming you have an inspection model similar to the one from your example
const bcrypt = require('bcryptjs');
var userModel = require('../model/user');
var inspectorModel = require("../model/inspector");

const teamsService = new TeamsService();

const adminSecretKey = process.env.ADMIN_SECRET_KEY || "";

const authorize = require('../middlewares/roleBasedAccessControl');

router.post("/BulkCreateTeams", authorize(['inspector_coordinator']), async (req, res) => {
    // #swagger.tags = ['admin']
    // #swagger.description = 'Endpoint to create teams. Requires admin secret key for authorization.'
    // #swagger.parameters['admin-secret-key'] = {
    //     in: 'header',
    //     description: 'Admin secret key for authentication',
    //     type: 'string',
    //     required: true
    // }
    // #swagger.responses[201] = { description: 'Teams created successfully.' }
    // #swagger.responses[400] = { description: 'Teams already exist.' }
    // #swagger.responses[403] = { description: 'Unauthorized access.' }
    // #swagger.responses[500] = { description: 'Failed to create teams.' }
    try {
        const payloadAdminSecretKey = req.headers['admin-secret-key'];

        if (!payloadAdminSecretKey || adminSecretKey !== payloadAdminSecretKey) {
            return res.status(403).send("Unauthorized access.");
        }

        // Add teams manually in the following format
        const teams = [
                {
                    teamNumber: 1156,
                    name: "Under Control",
                    state: "Rio Grande do Sul"
                },
                {
                    teamNumber: 1860,
                    name: "Alphabots",
                    state: "Sao Paulo"
                },
                {
                    teamNumber: 5800,
                    name: "Magic Island Robotics",
                    state: "Santa Catarina"
                },
                {
                    teamNumber: 6902,
                    name: "STRIKE",
                    state: "Parana"
                },
                {
                    teamNumber: 7033,
                    name: "Roosters",
                    state: "Parana"
                },
                {
                    teamNumber: 8882,
                    name: "Infinity BR",
                    state: "Goias"
                },
                {
                    teamNumber: 9050,
                    name: "Tucanus",
                    state: "Rio de Janeiro"
                },
                {
                    teamNumber: 9110,
                    name: "Atomiic",
                    state: "Minas Gerais"
                },
                {
                    teamNumber: 9168,
                    name: "AGROBOT",
                    state: "Mato Grosso"
                },
                {
                    teamNumber: 9169,
                    name: "AGROTECH",
                    state: "Mato Grosso"
                },
                {
                    teamNumber: 9195,
                    name: "Team ProdiXy",
                    state: "Amazonas"
                },
                {
                    teamNumber: 9218,
                    name: "Alpha Technology",
                    state: "Jacarepagua"
                },
                {
                    teamNumber: 9219,
                    name: "Nine Tails",
                    state: "Rio de Janeiro"
                },
                {
                    teamNumber: 9602,
                    name: "CANINTECH",
                    state: "Mato Grosso"
                },
                {
                    teamNumber: 9603,
                    name: "MTECH",
                    state: "Mato Grosso"
                },
                {
                    teamNumber: 9604,
                    name: "TUIUTECH",
                    state: "Mato Grosso"
                },
                {
                    teamNumber: 9990,
                    name: "Off Season Demo Team 9990",
                    state: "Manchester"
                },
                {
                    teamNumber: 9991,
                    name: "Off Season Demo Team 9991",
                    state: "Manchester"
                },
                {
                    teamNumber: 9992,
                    name: "Off Season Demo Team 9992",
                    state: "Manchester"
                },
                {
                    teamNumber: 9993,
                    name: "Off Season Demo Team 9993",
                    state: "Manchester"
                },
                {
                    teamNumber: 9994,
                    name: "Off Season Demo Team 9994",
                    state: "Manchester"
                },
                {
                    teamNumber: 9995,
                    name: "Off Season Demo Team 9995",
                    state: "Manchester"
                },
                {
                    teamNumber: 9996,
                    name: "Off Season Demo Team 9996",
                    state: "Manchester"
                }
        ]

        // Save the teams to the database
        await teamsService.saveTeams(teams);

        res.status(201).send("Teams created successfully");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Failed to create teams");
    }
});

router.delete("/DeleteAllTeams", authorize(['inspector_coordinator']), async (req, res) => {
    // #swagger.tags = ['admin']
    // #swagger.description = 'Endpoint to delete all teams. Requires admin secret key for authorization.'
    // #swagger.parameters['admin-secret-key'] = {
    //     in: 'header',
    //     description: 'Admin secret key for authentication',
    //     type: 'string',
    //     required: true
    // }
    // #swagger.responses[200] = { description: 'All teams deleted successfully.' }
    // #swagger.responses[400] = { description: 'Teams table is already empty.' }
    // #swagger.responses[403] = { description: 'Unauthorized access.' }
    // #swagger.responses[500] = { description: 'Failed to delete all teams.' }
    try {
        const payloadAdminSecretKey = req.headers['admin-secret-key'];

        if (!payloadAdminSecretKey || adminSecretKey !== payloadAdminSecretKey) {
            return res.status(403).send("Unauthorized access.");
        }
        await teamsService.deleteAllTeams();
        res.status(200).send("All teams deleted successfully");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Failed to delete all teams");
    }
});

router.get("/CreateCleanSheetsForTeams", authorize(['inspector_coordinator']), async (req, res) => {
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

router.delete("/DeleteAllInspections", authorize(['inspector_coordinator']), async (req, res) => {
    // #swagger.tags = ['admin']
    // #swagger.description = 'Endpoint to delete all inspections. Requires admin secret key for authorization.'
    // #swagger.parameters['admin-secret-key'] = {
    //     in: 'header',
    //     description: 'Admin secret key for authentication',
    //     type: 'string',
    //     required: true
    // }
    // #swagger.responses[200] = { description: 'All inspections deleted successfully.' }
    // #swagger.responses[400] = { description: 'Inspections table is already empty.' }
    // #swagger.responses[403] = { description: 'Unauthorized access.' }
    // #swagger.responses[500] = { description: 'Failed to delete all inspections.' }
    try {
        const payloadAdminSecretKey = req.headers['admin-secret-key'];

        if (!payloadAdminSecretKey || adminSecretKey !== payloadAdminSecretKey) {
            return res.status(403).send("Unauthorized access.");
        }

        const existingInspectionsCount = await inspectionModel.countDocuments();

        if (existingInspectionsCount === 0) {
            return res.status(400).send("Inspections table is already empty.");
        }

        await inspectionModel.deleteMany();
        res.status(200).send("All inspections deleted successfully");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Failed to delete all inspections");
    }
});

router.post('/user', authorize(['inspector_coordinator']), async (req, res) => {
    // Create a User Route
    // #swagger.tags = ['admin']
    // #swagger.description = 'Endpoint to register a new user.'
    // #swagger.parameters['user'] = {
    //     in: 'body',
    //     description: 'User registration data',
    //     required: true,
    //     schema: { $ref: "#/definitions/UserSignUp" }
    // }
    // #swagger.responses[201] = {
    //     description: 'User created successfully.',
    //     schema: { $ref: "#/definitions/User" }
    // }
    // #swagger.responses[500] = { description: 'Error occurred while creating user.' }

    try {
        const { username, password, role } = req.body;

        // TODO: Add validation for username, password, and role here

        if (['inspector', 'inspector_coordinator'].includes(role) === false) {
            return res.status(400).json({ message: 'Invalid role' });
        }


        // Create a new user instance and save it to the database
        const user = new userModel({
            username,
            password: password,
            role // Assuming your user model has a 'role' field
        });

        await user.save();

        inspectorModel({ name: user.username }).save();

        user.password = undefined;

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

router.patch('/user', authorize(['inspector_coordinator']), async (req, res) => {
    // Update a User Route
    // #swagger.tags = ['admin']
    // #swagger.description = 'Endpoint
    // to update an existing user.'
    // #swagger.parameters['user'] = {
    //     in: 'body',
    //     description: 'User update data',
    //     required: true,
    //     schema: { $ref: "#/definitions/UserUpdate" }
    // }
    // #swagger.responses[200] = {
    //     description: 'User updated successfully.',
    //     schema: { $ref: "#/definitions/User" }
    // }
    // #swagger.responses[400] = { description: 'Invalid role.' }
    // #swagger.responses[404] = { description: 'User not found.' }
    // #swagger.responses[500] = { description: 'Error occurred while updating user.' }

    try {
        const { username, password, role } = req.body;

        // Additional validation and authorization checks here

        const updateData = {};
        if (role) {
            if (['inspector', 'inspector_coordinator'].includes(role) === false) {
                return res.status(400).json({ message: 'Invalid role' });
            }
            updateData.role = role;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // Attempt to update the user directly
        const updatedUser = await userModel.findOneAndUpdate({ username: username }, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        updatedUser.password = undefined;

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});


module.exports = router;

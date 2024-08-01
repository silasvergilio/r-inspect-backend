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
                    teamNumber: 8,
                    name: "Paly Robotics",
                    state: "California"
                },
                {
                    teamNumber: 201,
                    name: "The FEDS",
                    state: "Michigan"
                },
                {
                    teamNumber: 325,
                    name: "Respawn Robotics",
                    state: "Ohio"
                },
                {
                    teamNumber: 494,
                    name: "Martians",
                    state: "Michigan"
                },
                {
                    teamNumber: 525,
                    name: "Swartdogs",
                    state: "Iowa"
                },
                {
                    teamNumber: 589,
                    name: "Falkon Robotics",
                    state: "California"
                },
                {
                    teamNumber: 801,
                    name: "Horsepower",
                    state: "Florida"
                },
                {
                    teamNumber: 973,
                    name: "Greybots",
                    state: "California"
                },
                {
                    teamNumber: 1414,
                    name: "IHOT",
                    state: "Georgia"
                },
                {
                    teamNumber: 1477,
                    name: "Texas Torque",
                    state: "Texas"
                },
                {
                    teamNumber: 1683,
                    name: "Techno Titans",
                    state: "Georgia"
                },
                {
                    teamNumber: 1684,
                    name: "The Chimeras ",
                    state: "Michigan"
                },
                {
                    teamNumber: 1701,
                    name: "RoboCubs",
                    state: "Michigan"
                },
                {
                    teamNumber: 1706,
                    name: "Ratchet Rockers",
                    state: "Missouri"
                },
                {
                    teamNumber: 1747,
                    name: "Harrison Boiler Robotics",
                    state: "Indiana"
                },
                {
                    teamNumber: 1756,
                    name: "Argos",
                    state: "Illinois"
                },
                {
                    teamNumber: 1768,
                    name: "Nashoba Robotics",
                    state: "Massachusetts"
                },
                {
                    teamNumber: 1787,
                    name: "The Flying Circuits",
                    state: "Ohio"
                },
                {
                    teamNumber: 1796,
                    name: "RoboTigers",
                    state: "New York"
                },
                {
                    teamNumber: 1816,
                    name: "\"The Green Machine\"",
                    state: "Minnesota"
                },
                {
                    teamNumber: 1899,
                    name: "Saints Robotics",
                    state: "Washington"
                },
                {
                    teamNumber: 2035,
                    name: "Rockin' Bots",
                    state: "California"
                },
                {
                    teamNumber: 2375,
                    name: "Dragon Robotics",
                    state: "Arizona"
                },
                {
                    teamNumber: 2429,
                    name: "La Cañada Engineering Club",
                    state: "California"
                },
                {
                    teamNumber: 2438,
                    name: "'Iobotics",
                    state: "Hawaii"
                },
                {
                    teamNumber: 2582,
                    name: "PantherBots",
                    state: "Texas"
                },
                {
                    teamNumber: 2642,
                    name: "Pitt Pirates",
                    state: "North Carolina"
                },
                {
                    teamNumber: 2659,
                    name: "RoboWarriors",
                    state: "California"
                },
                {
                    teamNumber: 2851,
                    name: "Crevolution",
                    state: "Michigan"
                },
                {
                    teamNumber: 2875,
                    name: "CyberHawks",
                    state: "New York"
                },
                {
                    teamNumber: 2877,
                    name: "LigerBots",
                    state: "Massachusetts"
                },
                {
                    teamNumber: 2959,
                    name: "Robotarians",
                    state: "Michigan"
                },
                {
                    teamNumber: 3061,
                    name: "Huskie Robotics",
                    state: "Illinois"
                },
                {
                    teamNumber: 3132,
                    name: "Thunder Down Under",
                    state: "New South Wales"
                },
                {
                    teamNumber: 3136,
                    name: "O.R.C.A.",
                    state: "Virginia"
                },
                {
                    teamNumber: 3193,
                    name: "Falco Tech",
                    state: "Ohio"
                },
                {
                    teamNumber: 3637,
                    name: "The Daleks",
                    state: "New Jersey"
                },
                {
                    teamNumber: 3647,
                    name: "Millennium Falcons",
                    state: "California"
                },
                {
                    teamNumber: 4020,
                    name: "Cyber Tribe",
                    state: "Tennessee"
                },
                {
                    teamNumber: 4112,
                    name: "EagleBots",
                    state: "Georgia"
                },
                {
                    teamNumber: 4118,
                    name: "Roaring Riptide",
                    state: "Florida"
                },
                {
                    teamNumber: 4145,
                    name: "WorBots ",
                    state: "Ohio"
                },
                {
                    teamNumber: 4188,
                    name: "Columbus Space Program",
                    state: "Georgia"
                },
                {
                    teamNumber: 4342,
                    name: "Demon Robotics",
                    state: "Pennsylvania"
                },
                {
                    teamNumber: 4381,
                    name: "Twisted Devils",
                    state: "Michigan"
                },
                {
                    teamNumber: 4391,
                    name: "BraveBots",
                    state: "Michigan"
                },
                {
                    teamNumber: 4405,
                    name: "The Atoms Family",
                    state: "Michigan"
                },
                {
                    teamNumber: 4450,
                    name: "Olympia Robotics Federation",
                    state: "Washington"
                },
                {
                    teamNumber: 4451,
                    name: "ROBOTZ Garage",
                    state: "South Carolina"
                },
                {
                    teamNumber: 4611,
                    name: "OZone",
                    state: "Ohio"
                },
                {
                    teamNumber: 4766,
                    name: "Team SCREAM Jr.",
                    state: "Missouri"
                },
                {
                    teamNumber: 4944,
                    name: "The Hi Fives",
                    state: "Colorado"
                },
                {
                    teamNumber: 4952,
                    name: "Les Carnicas",
                    state: "Québec"
                },
                {
                    teamNumber: 5010,
                    name: "Tiger Dynasty",
                    state: "Indiana"
                },
                {
                    teamNumber: 5126,
                    name: "Electromagnetic Panthers (EMP)",
                    state: "Missouri"
                },
                {
                    teamNumber: 5406,
                    name: "Celt-X",
                    state: "Ontario"
                },
                {
                    teamNumber: 5436,
                    name: "Cyber Cats",
                    state: "Michigan"
                },
                {
                    teamNumber: 5584,
                    name: "ICRobotics",
                    state: "Victoria"
                },
                {
                    teamNumber: 5587,
                    name: "Titan Robotics",
                    state: "Virginia"
                },
                {
                    teamNumber: 5665,
                    name: "SPARC",
                    state: "Istanbul"
                },
                {
                    teamNumber: 5813,
                    name: "Morpheus",
                    state: "New Hampshire"
                },
                {
                    teamNumber: 6017,
                    name: "PrepaTec - Cyberius",
                    state: "Nuevo León"
                },
                {
                    teamNumber: 7021,
                    name: "TC Robotics",
                    state: "Wisconsin"
                },
                {
                    teamNumber: 7312,
                    name: "T3",
                    state: "Texas"
                },
                {
                    teamNumber: 7419,
                    name: "T.E.C.H. Support",
                    state: "California"
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

router.post("/CreateCleanSheetsForTeams", authorize(['inspector_coordinator']), async (req, res) => {
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

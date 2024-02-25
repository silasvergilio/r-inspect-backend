var express = require("express");
const TeamsService = require("../services/teamsService");
var router = express.Router();
var inspectionModel = require("../model/inspection"); // Assuming you have an inspection model similar to the one from your example
const bcrypt = require('bcryptjs');
var userModel = require('../model/user');

const teamsService = new TeamsService();

const adminSecretKey = process.env.ADMIN_SECRET_KEY || "";


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

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance and save it to the database
        const user = new userModel({
            username,
            password: hashedPassword,
            role // Assuming your user model has a 'role' field
        });

        await user.save();

        // Send back a response
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
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

        res.status(200).json({
            message: 'User updated successfully',
            user: {
                username: updatedUser.username,
                role: updatedUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});


module.exports = router;

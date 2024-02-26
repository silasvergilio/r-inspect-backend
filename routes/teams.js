var express = require("express");
const TeamsService = require("../services/teamsService");
var router = express.Router();

const teamsService = new TeamsService();

router.get("/", async (req, res) => {
    try {
        const teams = await teamsService.getTeams();
        res.status(200).json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching teams.");
    }
});

module.exports = router;

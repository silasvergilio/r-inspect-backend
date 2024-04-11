const axios = require("axios");

class TeamsService {
    constructor() {
        this.firstApi = axios.create({
            baseURL: process.env.FIRST_API_BASE_URL || "",
            timeout: parseInt(process.env.FIRST_API_TIMEOUT) || 1000,
            headers: { Authorization: `Basic ${Buffer.from(process.env.FIRST_API_AUTH_TOKEN || "").toString("base64")}` },
        });
    }

    async getTeams() {

        /* const eventCode = "BRBR";

        try {
            const response = await this.firstApi.get("2024/teams", {
                params: { eventCode },
            });

            return response.data.teams.map(element => ({
                teamNumber: element.teamNumber,
                name: element.nameShort,
                state: element.stateProv,
            }));
        } catch (error) {
            console.error(error.message);
            throw new Error('Failed to fetch teams');
        }
    }
}

module.exports = TeamsService; */


router.get("/:teamNumber", authorize(['inspector', 'inspector_coordinator']), async (req, res, next) => {
    // Get Team
    // #swagger.tags = ['Team Individually']
    // #swagger.description = 'Retrieves a team based on the team number.'
    // #swagger.parameters['teamNumber'] = { description: 'Team number', required: true }
    // #swagger.responses[200] = { description: 'Team found.', schema: { $ref: "#/definitions/Inspection" } }
    // #swagger.responses[404] = { description: 'Team not found.' }
    // #swagger.responses[500] = { description: 'Error occurred while retrieving the team.' }
  
    try {
      var team = await teamModel.findOne({ teamNumber: req.params.teamNumber });
  
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

        router.get("/teams", async (req, res) => {
            // #swagger.tags = ['teams']
            // #swagger.description = 'Endpoint to retrieve a list of all teams.'
            // #swagger.responses[200] = {
            //     description: 'Successful operation: Returns a list of teams.',
            //     schema: { $ref: "#/definitions/UsersArray" }
            // }
            // #swagger.responses[500] = { description: 'Server error: An error occurred while fetching teams.' }
            try {
                const teams = await teamModel.find({});
                res.status(200).json(teams);
            } catch (error) {
                console.error(error);
                res.status(500).send("An error occurred while fetching teams.");
            }
        });

    }
}
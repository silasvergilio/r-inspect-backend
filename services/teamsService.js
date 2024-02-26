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
        const eventCode = "BRBR";

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

module.exports = TeamsService;

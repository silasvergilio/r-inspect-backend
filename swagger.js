const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "r-inspect API Documentation",
    description: "API Documentation for the r-inspect API",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    rInspectApiKey: {
      type: "apiKey",
      in: "header",
      name: "x-api-key",
      description: 'Constant api key "r-inspect" is required to access the API endpoints.'
    },
    bearerAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: 'Admin secret key is required to access the admin endpoints.'
    },
    adminSecretKey: {
        type: "apiKey",
        in: "header",
        name: "admin-secret-key",
        description: 'Admin secret key is required to access the admin endpoints.'
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);

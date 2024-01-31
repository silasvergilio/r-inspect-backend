const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/teams.js", "./routes/inspection.js"];

swaggerAutogen(outputFile, endpointsFiles);

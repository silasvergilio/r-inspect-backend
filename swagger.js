const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js", 
                        "./routes/teams.js", 
                        "./routes/inspection.js",
                        "./routes/inspector.js",
                        "./routes/users.js",
                    ];

swaggerAutogen(outputFile, endpointsFiles);

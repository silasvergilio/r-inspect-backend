var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors');

require('dotenv').config();

const conn = require("./db/conn");


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var teamsRouter = require("./routes/teams");
var inspectorRouter = require("./routes/inspector");
var inspectionRouter = require("./routes/inspection");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

var app = express();
conn();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const validateApiKey = require('./middlewares/validateApiKey').default;
app.use(validateApiKey);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/teams", teamsRouter);
app.use("/inspector", inspectorRouter);
app.use("/inspection", inspectionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Listening on http://localhost:8080");
});

module.exports = app;

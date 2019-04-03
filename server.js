var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  Task = require("./api/models/todoListModel"), //created model loading here
  bodyParser = require("body-parser"),
  cors = require("cors");
const expressSwagger = require("express-swagger-generator")(app);
const swaggerDefinition = require("./swagger.json");

let options = {
  swaggerDefinition,
  basedir: __dirname, //app absolute path
  files: ["./api/routes/**/*.js"] //Path to the API handle folder
};
expressSwagger(options);

// mongoose instance connection url connection
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/Tododb";
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, {
  useMongoClient: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var routes = require("./api/routes/todoListRoutes"); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("todo list RESTful API server started on: " + port);

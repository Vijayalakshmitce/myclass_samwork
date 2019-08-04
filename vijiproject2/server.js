var express = require("express");


var app = express();
var PORT = process.env.PORT || 8085;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Static directory
//app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

var db = require("./models");


require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync({
  force: true
}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
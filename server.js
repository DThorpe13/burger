//dependencies
var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

//serve static content
app.use(express.static("public"));

//Parse application body 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use(routes);

//Start server so that it can listen
app.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
});
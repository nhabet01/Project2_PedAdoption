var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var bcrypt = require('bcrypt');
var path = require('path')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// app.use(methodOverride('_method'))//nh: duplicate below
    // Requiring our models for syncing
var db = require("./models");

// Middleware
app.use("/static/", express.static(path.join(__dirname, "/public/")));
// app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

//Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Router 

// Routes =============================================================
const HTMLRouter = require("./routes/html-routes.js")
const APIRoutes = require("./routes/api-routes.js")//nh: shouldn't this be required first?

app.use('/', HTMLRouter)
    // app.use('/', APIRoutes)
    // Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
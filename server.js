var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var bcrypt = require('bcrypt');
var path = require('path')

// Sets up the Express App
// =============================================================
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
//allow sessions
app.use(session({
    secret: 'app',
    cookie: { maxAge: 6 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 },
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
var PORT = process.env.PORT || 8080;


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

// const APIRoutes = require("./routes/apiRoutes.js");
const HTMLRouter = require("./routes/html-routes.js");

// require("./routes/apiRoutes.js")(app);
// app.use('/', APIRoutes)
app.use('/', HTMLRouter);

    // Syncing our sequelize models and then starting our express app

db.sequelize.sync({ force: false }).then(function(data, error) {

    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
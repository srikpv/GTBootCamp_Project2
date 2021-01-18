const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const port = process.env.PORT || 3000;


const app = express();


//Static Content
app.use(express.static("./app/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'hbs');
app.engine("hbs", exphbs({ 
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/app/views/layouts",
    partialsDir: __dirname + "/app/views/partials"
}));


//Routes
require("./app/controllers/routes/api-routes.js")(app);
require("./app/controllers/routes/html-routes.js")(app);

app.set('port', port);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
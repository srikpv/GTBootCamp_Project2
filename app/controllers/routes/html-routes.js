///var Burger = require("../../models/burger.js");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", (request, response) => {
    var data = {};
    response.render("home", {title : "Dream 11"})
  });

};
const { Player, User, Team, TeamPlayer, Game } = require("../../models/AllModels.js");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", (request, response) => {

    var data = {};
      Team.query().then( function (data) {
      var hbsObject = {
        teams: data,
        title: "Dream 11"
      };
//      console.log("team",hbsObject);
      response.render("home", hbsObject);

//      response.render("home", {title : "Dream 11"})
      
    });

  });
}
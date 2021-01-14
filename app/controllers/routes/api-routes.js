//var Burger = require("../../models/burger.js");

// Routes
// =============================================================
module.exports = function(app) {

  // Search for Specific Character (or all characters) then provides JSON
  // app.get("/api/all", function(req, res) {

  //   // If the user provides a specific character in the URL...
    
  //     // Then display the JSON for ONLY that character.
  //     // (Note how we're using the ORM here to run our searches)
  //     Burger.findAll((data) => {
  //       res.json(data);
  //     });
  //   });

  // app.put("/api/:id", function (req, res) {
  //   let id = req.params.id;

  //   Burger.devour_burger(id);
  //   res.sendStatus(200);
  // });

  // // If a user sends data to add a new character...
  // app.post("/api/add", function(req, res) {

  //   // Take the request...
  //   var name = req.body.name;

  //   // Then send it to the ORM to "save" into the DB.
  //   Burger.add_burger(name);
  //   res.sendStatus(200);
  // });
};
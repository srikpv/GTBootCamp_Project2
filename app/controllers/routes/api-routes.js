const { Player, User, Team, TeamPlayer, Game } = require("../../models/AllModels.js");

const { Model } = require("objection");
const { raw } = require("objection");
const database = require("../../db/knex.js");

Model.knex(database);

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/all/players", (request, response) => {
      Player.query().then(players => response.json({ players }));
    });

  app.post("/api/new/user", async (request, response) => {
    const user = await User.query().insert({
      username: request.body.username,
      password: request.body.password
    });
    response.json({ user_id: user.id});
  });

  app.post("/api/new/team", async (request, response) => {
    const json = { team: request.body.team };
    const team = await Team.query()
      .allowGraph("[players]")
      .insertGraph(json.team);
    response.json({ team_id: team.id});
  });

  app.get("/api/team/:id", async (request, response) => {
    const team = await Team.query().findById(request.params.id).withGraphJoined('[players.player, games]');
    response.json({ team: team});
  });

  app.put("/api/new/game", async (request, response) => {
    const home_team_id = request.body.home_team_id;
    const opp_team_id = request.body.opp_team_id;

    const home_team = await TeamPlayer.query()
      .select('id')
      .where("team_id", "=", home_team_id);

    await home_team.forEach(async (player) => {
      await TeamPlayer.query()
      .findById(player.id)
      .patch({ score: Math.floor(Math.random() * Math.floor(10)) });
    });

    const home_score = await TeamPlayer.query()
      .select(raw('coalesce(sum(??), 0)', 'score').as('totalScore'))
      .where("team_id", "=", home_team_id);

    
    const opp_team = await TeamPlayer.query()
      .select('id')
      .where("team_id", "=", opp_team_id);

    await opp_team.forEach(async (player) => {
      await TeamPlayer.query()
      .findById(player.id)
      .patch({ score: Math.floor(Math.random() * Math.floor(10)) });
    });

    const opp_score = await TeamPlayer.query()
      .select(raw('coalesce(sum(??), 0)', 'score').as('totalScore'))
      .where("team_id", "=", opp_team_id);
    
    const game = await Game.query().insert({
      home_team_id: home_team_id,
      opp_team_id: opp_team_id,
      win_team_id: ((home_score.totalScore >= opp_score.totalScore) ? home_team_id : opp_team_id)
      });
    
      response.json({ game: game});
  });

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
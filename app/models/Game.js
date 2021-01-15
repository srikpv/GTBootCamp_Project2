'use strict';

const { Model } = require('objection');

class Game extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'game';
  }

  static get jsonSchema() {
    return {
      type: "object",
      required : ["home_team_id", "opp_team_id", "win_team_id"],

      properties: {
        id : {type: "integer"},
        home_team_id : {type: "integer"},
        opp_team_id : {type: "integer"},
        win_team_id : {type: "integer"}
      }
    }
  }
  
  static get relationMappings() {
    const TeamPlayer = require("./TeamPlayer.js");

    return {
      home_team_players: {
        relation: Model.HasManyRelation,
        modelClass: TeamPlayer,
        join: {
          from: "team_player.team_id",
          to: "game.home_team_id"
        },
      },
      opp_team_players: {
        relation: Model.HasManyRelation,
        modelClass: TeamPlayer,
        join: {
          from: "team_player.team_id",
          to: "game.opp_team_id"
        },
      }
    }
  }
}

module.exports = Game;
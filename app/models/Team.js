'use strict';

const { Model } = require('objection');

class Team extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'team';
  }

  static get jsonSchema() {
    return {
      type: "object",
      required : ["user_id", "name"],

      properties: {
        id : {type: "integer"},
        user_id : {type: "integer"},
        name : {type : "string", minLength: 1, maxLength: 255 },
        active : {type: "boolean"},
        wins : {type: "integer"},
      }
    }
  }

  static get relationMappings() {
    const User = require("./User.js");
    const TeamPlayer = require("./TeamPlayer.js");
    const Game = require("./Game.js");

    return {
      owner : {
        relation: Model.BelongsToOneRelation,
        modelClass : User,
        join: {
          from: "team.user_id",
          to: "user.id"
        }
      },
      players : {
        relation: Model.HasManyRelation,
        modelClass: TeamPlayer,
        join: {
          from: "team.id",
          to: "team_player.team_id"
        }
      },
      games: {
        relation: Model.HasManyRelation,
        modelClass: Game,
        join: {
          from: "team.id",
          to: "game.home_team_id"
        }
      }
    };
  }
}

module.exports = Team;
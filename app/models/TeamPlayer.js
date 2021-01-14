'use strict';

const { Model } = require('objection');

class TeamPlayer extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'team_player';
  }

  static get jsonSchema() {
    return {
      type: "object",
      required : ["team_id", "player_id"],

      properties: {
        id : {type: "integer"},
        team_id : {type: "integer"},
        player_id : {type: "integer"},
        score : {type: "integer"}
      }
    }
  }

  static get relationMappings() {
    const Player = require("./Player.js");

    return {
      player: {
        relation: Model.BelongsToOneRelation,
        modelClass: Player,
        join: {
          from: "team_player.player_id",
          to: "player.id"
        },
      }
    }
  }
}


module.exports = TeamPlayer;
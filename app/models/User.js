'use strict';

const { Model } = require('objection');

class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'user';
  }

  static get jsonSchema() {
    return {
      type: "object",
      required : ["username", "password"],

      properties: {
        id : {type: "integer"},
        username : {type : "string", minLength: 1, maxLength: 255 },
        password : {type : "string", minLength: 1, maxLength: 50 }
      }
    }
  }

  static get relationMappings() {
    const Team = require("./Team.js");

    return {
      teams: {
        relation: Model.HasManyRelation,
        modelClass: Team,
        join: {
          from: "user.id",
          to: "team.user_id"
        },
      }
    }
  }
}

module.exports = User;
'use strict';

const { Model } = require('objection');

class Player extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'player';
  }


  static get jsonSchema() {
    return {
      type: "object",
      required : ["name", "country", "dob"],

      properties: {
        id : {type: "integer"},
        name : {type : "string", minLength: 1, maxLength: 255 },
        country : {type : "string", minLength: 1, maxLength: 50 },
        dob : {type : "string", minLength: 8, maxLength: 10 }
      }
    }
  }

  static get modifiers() {
    return {
      searchByNameCountry(query, name) {
        query.where((query) => {
          for (const namePart of name.trim().split(/\s+/)) {
              for (const column of ["name", "country"]) {
                query.orWhereRaw("lower(??) like ?", [column, namePart.toLowerCase() + "%"])
              }
          }
        })
      }
    }
  }
}

module.exports = Player;
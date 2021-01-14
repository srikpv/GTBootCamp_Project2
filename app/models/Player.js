'use strict';

const { Model } = require('objection');

class Player extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'player';
  }
}

module.exports = {
  Player,
};
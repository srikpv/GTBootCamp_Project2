'use strict';

exports.up = async (knex) => {
  return knex.schema.createTable('player', (table) => {
    table.increments("id").primary();
    table.string('name').notNullable();
    table.string('country').notNullable();
    table.string('dob').notNullable();
  })
  .createTable("user", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("password").notNullable();
  })
  .createTable("team", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("user").onDelete('SET NULL').index();
    table.string("name").notNullable();
    table.boolean("active").notNullable().defaultTo(true);
    table.integer("wins").notNullable().defaultTo(0);
  })
  .createTable("team_player", (table) => {
    table.increments("id").primary();
    table.integer("team_id").unsigned().references("id").inTable("team").onDelete('SET NULL').index();
    table.integer("player_id").unsigned().references("id").inTable("player").onDelete('SET NULL').index();
    table.integer("score").notNullable().defaultTo(0);
  })
  .createTable("game", (table) => {
    table.increments("id").primary();
    table.integer("home_team_id").unsigned().references("id").inTable("team").onDelete('SET NULL').index();
    table.integer("opp_team_id").unsigned().references("id").inTable("team").onDelete('SET NULL').index();
    table.integer("win_team_id").unsigned().references("id").inTable("team").onDelete('SET NULL').index();
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTableIfExists('game')
  .dropTableIfExists('team_player')
  .dropTableIfExists('team')
  .dropTableIfExists('user')
  .dropTableIfExists('player');
};
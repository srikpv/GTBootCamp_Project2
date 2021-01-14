'use strict';

exports.up = async (knex) => {
  await knex.schema.createTable('player', (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('country').notNullable();
    table.string('dob').notNullable();
  });

  await knex.schema.createTable('person', (table) => {
    table.increments('id').primary();
    table.string('firstName');
    table.string('lastName');
  });

  return true;
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('player');
  await knex.schema.dropTableIfExists('person');
  return true;
};
const csv = require('csv-parser');
const fs = require('fs');
const path = require("path");

let players = [];
let players_subset = [];

fs.createReadStream(path.resolve(__dirname, 'Players.csv'))
    .pipe(csv())
    .on('data', (data) => players.push(data))
    .on('end', async () => {
        players = players.filter(player => new Date(player.dob) > new Date("01/01/1990"));
        players.forEach((player) => {
            players_subset.push({name: player.name, country: player.country, dob: player.dob});
        });
    });

exports.seed = async (knex, Promise) => {
    // Deletes ALL existing entries
    
    await sleep(3000);
    await knex('player').del();       
    await knex('player').insert(players_subset);
    return true;
  };

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   
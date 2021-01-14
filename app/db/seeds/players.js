const csv = require('csv-parser');
const fs = require('fs');
const path = require("path");

let players = [];
let players_subset = [];

var fileRead = _ => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, './Players.csv') )
    .pipe(csv())
    .on('data', (data) => players.push(data))
    .on('end', () => {
        players = players.filter(player => new Date(player.dob) > new Date("01/01/1990"));
        players.forEach((player, index) => {
          players_subset.push({id: index+1, name: player.name, country: player.country, dob: player.dob});
        });
       return resolve(players_subset);
    })
    .on("error", (err) => reject(err));
  });
}

exports.seed = (knex) => {
  // Deletes ALL existing entries
  var promise = fileRead();
  return promise
  .then((data) => {
    return knex('player').del()
    .then(function () {
      // Inserts seed entries
      return knex('player').insert(data);
    });
  });
};

 
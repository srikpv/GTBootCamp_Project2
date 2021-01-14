const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : process.env.HOST,
      database: process.env.DATABASE,
      user:     process.env.USER_NAME,
      password: process.env.PASS_WORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/migrations"
    },
    seeds: {
      directory: __dirname + "/seeds"
    }
  },

  production: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/migrations"
    },
    seeds: {
      directory: __dirname + "/seeds"
    }
  }

};
